import React, { useState, useEffect, useRef } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useGetProductByIdQuery } from "../../redux/features/products/productsApi";
import Swal from "sweetalert2";
import "../../Styles/StylesSingleProduct.css";

// ✅ Main component
const SingleProduct = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError, refetch } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [quantity, setQuantity] = useState(1); // selected quantity
  const [selectedColor, setSelectedColor] = useState(null); // selected color
  const [selectedImage, setSelectedImage] = useState(null); // main image shown
  const [showContent, setShowContent] = useState(false); // fade-in effect
  const imageRef = useRef(null); // ref for zoom

  // ✅ Set default color and image when product loads
  useEffect(() => {
    if (product?.colors?.length > 0) {
      const firstColor = product.colors[0];
      setSelectedColor(firstColor);
      setSelectedImage(firstColor?.images?.[0] || product?.coverImage);
    }
  }, [product]);

  // ✅ Handle quantity changes
  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    const maxStock = selectedColor?.stock ?? 0;
    setQuantity(value > maxStock ? maxStock : value);
  };

  // ✅ Handle color selection
  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setSelectedImage(color?.images?.[0] || product?.coverImage);
    setQuantity(1);
  };

  // ✅ Handle image selection (thumbnails)
  const handleSelectImage = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  // ✅ Add product to cart with validation
const handleAddToCart = () => {
  const colorName = selectedColor?.colorName?.en;
  const colorStock = selectedColor?.stock ?? 0;

  const itemInCart = cartItems.find(
    (item) =>
      item._id === product._id &&
      item.color?.colorName?.en === colorName
  );

  const quantityInCart = itemInCart?.quantity || 0;

  if (quantityInCart + quantity > colorStock) {
    Swal.fire({
      icon: "warning",
      title: "Stock épuisé",
      text: "Impossible d’ajouter plus. Quantité maximale atteinte.",
      confirmButtonColor: "#1c3b58",
    });
    return;
  }

  dispatch(
    addToCart({
      _id: product._id,
      title: product.title,
      mainCategory: product.mainCategory,
      subCategory: product.subCategory,
      brand: product.brand,
      coverImage: product.coverImage,
      newPrice: product.newPrice,
      color: selectedColor,
      quantity,
    })
  );
}; // ✅ ← ADD THIS LINE to properly close the function



  // ✅ Zoom on image hover
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const handleMouseMove = (e) => {
      const rect = image.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      image.style.transformOrigin = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
      image.style.transform = "scale(2)";
    };

    const handleMouseLeave = () => {
      image.style.transform = "scale(1)";
      image.style.transformOrigin = "center center";
    };

    image.addEventListener("mousemove", handleMouseMove);
    image.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      image.removeEventListener("mousemove", handleMouseMove);
      image.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [selectedImage]);

  // ✅ Show product content after small delay
  useEffect(() => {
    if (isLoading) {
      setShowContent(false);
    } else {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // ✅ Calculate discount %
  const discountPercent =
    product?.oldPrice && product?.newPrice
      ? Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)
      : 0;

  // ✅ Show loader if still fetching
  if (isLoading || !product || !product.title) {
    return <div className="loader-container"><div className="spinner"></div></div>;
  }

  return (
    <div className="single-product-container">
      {/* 🏷️ Product Title */}
      <h1 className="product-title-lina">
        {product?.title || "Produit non disponible"}
      </h1>

      <div className="product-content">
        {/* 🔵 LEFT SIDE: Images + Color Options */}
        <div>
          <div className="product-image-box">
            {/* 🔖 Discount Badge */}
            {product?.oldPrice && product?.newPrice && (
              <div className="badge promotion-badge">-{discountPercent}%</div>
            )}

            {/* ✨ Trending Badge */}
            {product?.trending && (
              <div className="badge trending-badge">
                <HiOutlineSparkles className="badge-icon" />
                Tendance
              </div>
            )}

            {/* 📦 Stock Badge */}
            <div
              className={`badge stock-badge ${
                selectedColor?.stock > 0 ? "in-stock" : "out-of-stock"
              }`}
              style={{ top: "46px", right: "10px" }}
            >
              {selectedColor?.stock > 0
                ? `Stock: ${selectedColor?.stock}`
                : "Rupture de stock"}
            </div>

            {/* 🖼️ Main Product Image with zoom effect */}
            <img
              src={getImgUrl(selectedImage ?? product?.coverImage)}
              alt={product?.title}
              className="product-main-image"
              ref={imageRef}
            />

            {/* 🖼️ Additional Image Thumbnails */}
            {selectedColor?.images?.length > 1 && (
              <div className="thumbnail-gallery">
                {selectedColor.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={getImgUrl(img)}
                    alt={`Preview ${idx + 1}`}
                    className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                    onClick={() => handleSelectImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 🎨 Color Options */}
          <div className="product-colors">
            <label>Couleurs disponibles:</label>
            <div className="color-options">
              {product?.colors?.map((color, index) => {
                const stock = color?.stock ?? 0;
                const name = color?.colorName?.en || "Inconnue";
                const isSelected =
                  selectedColor?.colorName?.en === color?.colorName?.en;

                return (
                  <div key={index} className="color-option">
                    <img
                      src={getImgUrl(color?.images?.[0])}
                      alt={name}
                      className={`color-image ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSelectColor(color)}
                    />
                    <div
                      className={`color-stock ${stock > 0 ? "in-stock" : "out-of-stock"}`}
                    >
                      {stock > 0 ? stock : "Rupture de stock"}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ✅ Selected Color Label */}
            <p className="selected-color">
              Couleur sélectionnée:{" "}
              <strong>{selectedColor?.colorName?.en || "Inconnue"}</strong>
            </p>
          </div>
        </div>

        {/* 🟢 RIGHT SIDE: Product Info + Actions */}
        <div className="product-details">
          {/* 📄 Description */}
          <p className="product-description">{product?.description || ""}</p>

          {/* 📋 Meta Details */}
          <div className="product-meta">
            <p><strong>Marque:</strong> {product?.brand || "Inconnue"}</p>
            <p><strong>Catégorie principale:</strong> {product?.mainCategory || "Inconnue"}</p>
            <p><strong>Sous-catégorie:</strong> {product?.subCategory || "Inconnue"}</p>
            <p>
              <strong>Publié:</strong>{" "}
              {product?.createdAt
                ? new Date(product.createdAt).toLocaleDateString()
                : "Inconnue"}
            </p>
          </div>

          {/* 💰 Price Section */}
          <div className="product-price">
            <span className="new">
              {product?.newPrice?.toFixed(2) ?? "0.00"} TND
            </span>
            {product?.oldPrice && (
              <span className="old">
                {Math.round(product?.oldPrice)} TND
              </span>
            )}
          </div>

          {/* 📦 Stock Information */}
          <div className="product-stock-info">
            <strong>Stock:</strong>{" "}
            {selectedColor?.stock > 0 ? selectedColor.stock : "Rupture de stock"}
          </div>

          {/* 🔢 Quantity Selector */}
          <div className="product-quantity">
            <label>Quantité:</label>
            <input
              type="number"
              min="1"
              max={selectedColor?.stock ?? 0}
              value={quantity}
              onChange={handleQuantityChange}
              disabled={(selectedColor?.stock ?? 0) === 0}
            />
          </div>

          {/* 🛒 Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={(selectedColor?.stock ?? 0) === 0}
            className={`add-to-cart-btn ${
              selectedColor?.stock > 0 ? "enabled" : "disabled"
            }`}
          >
            <FiShoppingCart className="icon" />
            {selectedColor?.stock > 0
              ? "Ajouter au panier"
              : "Rupture de stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
