import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/features/wishlist/wishlistSlice";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// 🎨 Icons
import { FiShoppingCart, FiEye, FiHeart } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";

// 🖼️ Styles
import "../../Styles/StylesProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // 🔄 Local states
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 🛒 Redux state for cart and wishlist
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  // 🎨 Selected color logic
  const selectedColor =
    product.colors?.[selectedColorIndex] || {
      images: [product.coverImage || "/assets/default-image.png"],
      stock: product.stockQuantity || 0,
    };

  const mainImage =
    selectedColor?.images?.[0] || product.coverImage || "/assets/default-image.png";
  const hoverImage = selectedColor?.images?.[1] || mainImage;

  // 🔖 Calculate discount
  const discountPercent =
    product.oldPrice && product.newPrice
      ? Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)
      : 0;

  // 🛒 Add to cart handler
  const handleAddToCart = () => {
    const quantityInCart =
      cartItems.find(
        (item) =>
          item._id === product._id &&
          item.color?.colorName?.en === selectedColor?.colorName?.en
      )?.quantity || 0;

    if (quantityInCart >= selectedColor.stock) {
      Swal.fire({
        icon: "warning",
        title: "Stock limité",
        text: "Vous avez atteint la quantité maximale en stock pour cette couleur.",
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
       color: {
         ...selectedColor,
         image: selectedColor?.images?.[0] || product.coverImage,
       },
       quantity,
     })
   );
   
   }; 

  // 💖 Wishlist toggle
  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id));
      Swal.fire({
        icon: "info",
        title: "Retiré des favoris",
        text: `${product.title} a été retiré de votre liste.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      dispatch(addToWishlist(product));
      Swal.fire({
        icon: "success",
        title: "Ajouté aux favoris",
        text: `${product.title} a été ajouté à votre liste.`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // 📦 Calculate total stock (across all colors)
  const totalStock = product.colors?.reduce(
    (sum, color) => sum + (color?.stock || 0),
    0
  );


  return (
    <div className="product-card-optic">
      {/* 🖱️ Clickable image box with product link */}
      <a
        href={`/products/${product._id}`}
        className="image-box"
        style={{ position: "relative" }}
      >
        {/* 🔖 Discount badge */}
        {discountPercent > 0 && (
          <div
            style={{
              position: "absolute",
              top: "6px",
              left: "6px",
              backgroundColor: "#dc2626",
              color: "#fff",
              fontSize: "0.75rem",
              padding: "2px 6px",
              borderRadius: "4px",
              fontWeight: "bold",
              zIndex: 1,
            }}
          >
            -{discountPercent}%
          </div>
        )}

        {/* ✨ Trending badge */}
        {product?.trending && (
          <div
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              backgroundColor: "#005fa3",
              color: "#fff",
              fontSize: "0.72rem",
              padding: "2px 6px",
              borderRadius: "4px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              zIndex: 1,
            }}
          >
            <HiOutlineSparkles style={{ fontSize: "0.9rem" }} />
            Tendance
          </div>
        )}

        {/* 🧮 Stock badge */}
        <div
          style={{
            position: "absolute",
            top: product?.trending ? "32px" : "6px",
            right: "6px",
            backgroundColor: selectedColor?.stock > 0 ? "#28a745" : "#dc3545",
            color: "#fff",
            fontSize: "0.68rem",
            padding: "2px 6px",
            borderRadius: "4px",
            fontWeight: "normal",
            zIndex: 1,
          }}
        >
          {selectedColor?.stock > 0
            ? `Stock: ${selectedColor.stock}`
            : "Rupture de stock"}
        </div>

        {/* 🖼️ Product image with hover effect */}
        <img
          src={getImgUrl(isHovered ? hoverImage : mainImage)}
          alt={product?.title}
          className="product-img"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </a>

      {/* 📝 Product info section */}
      <div className="product-details-box">
        <h3 className="product-title-optic">
          {product?.title || "Produit inconnu"}
        </h3>
        <p className="product-sub-info">
          {product?.subCategory || "Sous-catégorie inconnue"},{" "}
          {product?.mainCategory || "Catégorie inconnue"}
        </p>
        <p className="product-brand">{product?.brand || "Marque inconnue"}</p>

        {/* 💰 Prices */}
        <div className="product-price-optic">
          {product.oldPrice && (
            <span className="old-price">
              {Math.round(product.oldPrice)} TND
            </span>
          )}
          <span className="new-price">
            {product?.newPrice?.toFixed(2) || "0.00"} TND
          </span>
        </div>
      </div>

      {/* 🧭 Hover action buttons */}
      <div className="hover-icons">
        {/* 🛒 Add to Cart */}
        <button
          className={`add-btn ${
            selectedColor?.stock <= 0 ? "disabled-btn" : ""
          }`}
          onClick={selectedColor?.stock > 0 ? handleAddToCart : undefined}
          disabled={selectedColor?.stock <= 0}
        >
          <FiShoppingCart />
          {selectedColor?.stock > 0
            ? "Ajouter au panier"
            : "En rupture de stock"}
        </button>

        {/* ❤️ Wishlist toggle */}
        <span
          className="icon"
          onClick={handleToggleWishlist}
          style={{ cursor: "pointer" }}
        >
          <FiHeart className="icon" />
        </span>

        {/* 👁️ View product details */}
        <a href={`/products/${product._id}`} className="icon">
          <FiEye />
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
