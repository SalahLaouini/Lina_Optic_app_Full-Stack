// 📦 Import React and necessary libraries
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddProductMutation } from "../../../redux/features/products/productsApi";
import Swal from "sweetalert2";
import axios from "axios";
import getBaseUrl from "../../../utils/baseURL";
import "../../../Styles/StylesAddProduct.css";

// 🌐 Import predefined category filters
import { CATEGORY_OPTIONS } from "../../../utils/categoryFilters";

const AddProduct = () => {
  // 📥 Initialize form management hook
  const { register, handleSubmit, reset } = useForm();

  // 🖼️ Cover image state and preview
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverPreviewURL, setCoverPreviewURL] = useState("");

  // 🎨 State to manage color blocks (each with name, images[], previews[], stock)
  const [colorInputs, setColorInputs] = useState([]);

  // 🚀 RTK Query mutation hook to add product
  const [addProduct, { isLoading }] = useAddProductMutation();

  // 🧭 Category selection states
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  // 📂 Predefined sub-category options
  const subCategoryOptions = [
    { value: "Optique", label: "Lunettes de vue" },
    { value: "Solaire", label: "Lunettes de soleil" },
    { value: "Lentilles", label: "Lentilles de contact" },
  ];

  // 🖼️ Frame type selector options
  const frameTypeOptions = [
    "Plein cadre",
    "Demi-cadre (semi-cerclé)",
    "Sans cadre (invisible)",
    "Cadre en plastique",
    "Cadre en métal",
    "Cadre rond",
    "Cadre carré",
    "Cadre rectangulaire",
    "Cadre papillon",
    "Cadre aviateur",
    "Cadre ovale",
  ];

  // 📷 Cover image selection
  const handleCoverImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setCoverImageFile(file);
      setCoverPreviewURL(URL.createObjectURL(file));
    } else {
      setCoverImageFile(null);
      setCoverPreviewURL("");
    }
  };

  // 🎨 Generic field update for a color block
  const handleColorInputChange = (index, field, value) => {
    setColorInputs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  // ➕ Add a new empty color block (ARRAYS by default)
  const addColorInput = () => {
    setColorInputs((prev) => [
      ...prev,
      { colorName: "", stock: 0, imageFiles: [], previewURLs: [] },
    ]);
  };

  // ❌ Remove a specific color block
  const deleteColorInput = (index) => {
    setColorInputs((prev) => prev.filter((_, i) => i !== index));
  };

  // ➕ Add a new image slot to a color
  const addImageSlot = (colorIndex) => {
    setColorInputs((prev) => {
      const next = [...prev];
      const color = { ...next[colorIndex] };
      color.imageFiles = [...(color.imageFiles || []), null];
      color.previewURLs = [...(color.previewURLs || []), ""];
      next[colorIndex] = color;
      return next;
    });
  };

  // 🔁 Update a specific image slot
  const updateImageAt = (colorIndex, imageIndex, file) => {
    if (!file || !file.type?.startsWith("image/")) return;
    setColorInputs((prev) => {
      const next = [...prev];
      const color = { ...next[colorIndex] };
      const files = [...(color.imageFiles || [])];
      const previews = [...(color.previewURLs || [])];
      files[imageIndex] = file;
      previews[imageIndex] = URL.createObjectURL(file);
      color.imageFiles = files;
      color.previewURLs = previews;
      next[colorIndex] = color;
      return next;
    });
  };

  // 🗑️ Remove a specific image slot
  const removeImageAt = (colorIndex, imageIndex) => {
    setColorInputs((prev) => {
      const next = [...prev];
      const color = { ...next[colorIndex] };
      const files = [...(color.imageFiles || [])];
      const previews = [...(color.previewURLs || [])];
      files.splice(imageIndex, 1);
      previews.splice(imageIndex, 1);
      color.imageFiles = files;
      color.previewURLs = previews;
      next[colorIndex] = color;
      return next;
    });
  };

  // ☁️ Upload a single image (cover & color images)
  const uploadImage = async (file) => {
    if (!file || !(file instanceof File) || !file.type.startsWith("image/")) return "";
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(`${getBaseUrl()}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.image;
    } catch (error) {
      console.error("❌ Image upload failed:", error);
      return "";
    }
  };

  // 📤 Submit
  const onSubmit = async (data) => {
    // ✅ Validate category selection before submitting
    if (!mainCategory || !subCategory) {
      Swal.fire("Erreur", "Veuillez sélectionner une catégorie et une sous-catégorie.", "error");
      return;
    }

    // 🖼️ Upload cover image (optional)
    let coverImage = "";
    if (coverImageFile instanceof File && coverImageFile.type.startsWith("image/")) {
      coverImage = await uploadImage(coverImageFile);
    }

    // 🎨 Upload each color's images
    const colors = await Promise.all(
      colorInputs.map(async (input) => {
        const { colorName, imageFiles, stock } = input || {};
        if (!colorName || stock == null) return null;

        const uploadedImages = [];
        if (Array.isArray(imageFiles)) {
          for (const file of imageFiles) {
            if (file && file.type.startsWith("image/")) {
              const url = await uploadImage(file);
              if (url) uploadedImages.push(url);
            }
          }
        }

        return {
          colorName: { en: colorName, fr: colorName, ar: colorName },
          images: uploadedImages,           // 👈 multiple images sent to backend
          stock: Number(stock) || 0,
        };
      })
    );

    // 🧼 Remove nulls
    const filteredColors = colors.filter(Boolean);

    // 📦 Final product payload
    const newProductData = {
      ...data,
      mainCategory,
      subCategory,
      frameType: data.frameType || "",
      coverImage,
      colors: filteredColors,
      brand: data.brand || "",
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      stockQuantity: filteredColors[0]?.stock || 0,
      trending: !!data.trending,
    };

    try {
      await addProduct(newProductData).unwrap();
      Swal.fire("Succès!", "Produit ajouté avec succès!", "success");
      reset();
      setCoverImageFile(null);
      setCoverPreviewURL("");
      setColorInputs([]);
    } catch (error) {
      console.error("❌ Error adding product:", error?.data || error);
      Swal.fire("Erreur!", "Échec de l'ajout du produit.", "error");
    }
  };

  // 🧾 Render the form UI
  return (
    <div className="add-product-container">
      <h2 className="add-product-title">Ajouter un nouveau produit</h2>

      {/* 📝 Product Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
        {/* 🏷️ Product Title */}
        <label>Nom du produit</label>
        <input {...register("title")} placeholder="Nom du produit" required />

        {/* 🧾 Product Description */}
        <label>Description du produit</label>
        <textarea {...register("description")} placeholder="Description" required />

        {/* 📁 Main Category Selector */}
        <label>Catégorie principale</label>
        <select
          value={mainCategory}
          onChange={(e) => setMainCategory(e.target.value)}
          required
        >
          <option value="">Sélectionner</option>
          <option value="Hommes">Hommes</option>
          <option value="Femmes">Femmes</option>
          <option value="Enfants">Enfants</option>
        </select>

        {/* 📂 Subcategory */}
        {mainCategory && (
          <>
            <label>Sous-catégorie</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              required
            >
              <option value="">Sous-catégorie</option>
              {subCategoryOptions.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </>
        )}

        {/* 🖼️ Frame Type Selector */}
        <label>Type de cadre</label>
        <select {...register("frameType")}>
          <option value="">Type de cadre</option>
          {frameTypeOptions.map((type, idx) => (
            <option key={idx} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* 🏷️ Brand Field */}
        <label>Marque</label>
        <input {...register("brand")} placeholder="Marque du produit" required />

        {/* 💰 Old & New Prices */}
        <div className="price-grid">
          <input {...register("oldPrice")} type="number" placeholder="Prix initial" required />
          <input {...register("newPrice")} type="number" placeholder="Prix actuel" required />
        </div>

        {/* 📈 Trending Checkbox */}
        <div className="checkbox-wrapper">
          <input type="checkbox" {...register("trending")} />
          Marquer comme tendance
        </div>

        {/* 🖼️ Cover Image Upload */}
        <label>Image principale</label>
        <input type="file" accept="image/*" onChange={handleCoverImageChange} required />
        {coverPreviewURL && (
          <img src={coverPreviewURL} alt="Aperçu" className="cover-preview" />
        )}

        {/* 🎨 Product Colors Section */}
        <label>Couleurs du produit</label>
        {colorInputs.map((input, index) => (
          <div key={index} className="color-block">
            {/* 🎨 Color Name & Stock */}
            <input
              type="text"
              placeholder="Nom de la couleur"
              value={input.colorName}
              onChange={(e) => handleColorInputChange(index, "colorName", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantité en stock"
              value={input.stock}
              onChange={(e) => handleColorInputChange(index, "stock", Number(e.target.value))}
              required
            />

            {/* 🖼️ Previews */}
            <div className="image-preview-row">
              {(input.previewURLs || []).map((url, i) =>
                url ? (
                  <div key={i} className="image-preview-group">
                    <img src={url} alt={`Aperçu ${i + 1}`} className="color-preview" />
                    <button
                      type="button"
                      className="btn-remove-img"
                      onClick={() => removeImageAt(index, i)}
                    >
                      Supprimer
                    </button>
                  </div>
                ) : null
              )}
            </div>

            {/* 📤 Inputs for each slot */}
            <div className="image-inputs-row">
              {(input.imageFiles || []).map((_, i) => (
                <div key={i} className="image-input-item">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => updateImageAt(index, i, e.target.files?.[0])}
                  />
                </div>
              ))}
            </div>

            {/* ➕ Add image slot */}
            <button
              type="button"
              onClick={() => addImageSlot(index)}
              className="btn-add-more-img"
            >
              + Ajouter une image
            </button>

            {/* ❌ Delete this color */}
            <button
              type="button"
              onClick={() => deleteColorInput(index)}
              className="btn-delete-color"
            >
              Supprimer
            </button>
          </div>
        ))}

        {/* ➕ Add a new empty color block */}
        <button type="button" onClick={addColorInput} className="btn-add-color">
          Ajouter une couleur
        </button>

        {/* ✅ Submit form button */}
        <button type="submit" className="btn-submit">
          {isLoading ? "Ajout en cours..." : "Ajouter le produit"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
