import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";
import productsApi from "../../redux/features/products/productsApi";
import { useGetAllProductsQuery } from "../../redux/features/products/productsApi";
import { useTranslation } from "react-i18next";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import { triggerRefetch, resetTrigger } from "../../redux/features/products/productEventsSlice";



import { getImgUrl } from "../../utils/getImgUrl";
import Swal from "sweetalert2";
import "../../Styles/StylesCheckoutPage.css"

const CheckoutPage = () => {
  const { t } = useTranslation();
  
  
  

  const { currentUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  
const { refetch: refetchAllProducts, isLoading: isProductsLoading } = useGetAllProductsQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Add this here
  const [isChecked, setIsChecked] = useState(false);

  
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  
  const cartItems = useSelector((state) => state.cart.cartItems);
const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
const totalPrice = cartItems
  .reduce((acc, item) => acc + item.newPrice * item.quantity, 0)
  .toFixed(2);



  
 

  
// Inside your component:




  
const onSubmit = async (data) => {
  const newOrder = {
    name: data.name,
    email: currentUser?.email,
    address: {
      street: data.address,
      city: data.city,
      country: data.country,
      state: data.state,
      zipcode: data.zipcode,
    },
    phone: data.phone,
    products: cartItems.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      color: {
  colorName:
    typeof item.color?.colorName === "object"
      ? item.color.colorName
      : {
          en: item.color?.colorName || "Original",
          fr: item.color?.colorName || "Original",
          ar: "أصلي",
        },
  image:
    item.color?.image ||
    item.coverImage ||
    (item.color?.colorName?.image ? item.color.colorName.image : "/assets/default-image.png"),
},

    })),
    totalPrice,
  };

  try {
    const result = await createOrder(newOrder).unwrap();
    if (result) {
      Swal.fire({
        title: t("checkout.order_confirmed"),
        text: t("checkout.success_message"),
        icon: "success",
        confirmButtonColor: "#1c3b58",
        confirmButtonText: t("checkout.go_to_orders"),
      }).then(() => {
        navigate("/orders");
        dispatch(clearCart()); // ✅ Clear the cart
        dispatch(productsApi.util.invalidateTags([{ type: "Products", id: "LIST" }])); // ✅ Refresh products
        dispatch(triggerRefetch()); // ✅ Notify others to refetch
        setTimeout(() => dispatch(resetTrigger()), 1000); // ✅ Optional reset
      });
    }
  } catch (error) {
    console.error("❌ Order submission error:", error);
    Swal.fire({
      title: t("checkout.error_title"),
      text: error?.message || t("checkout.error_message"),
      icon: "error",
      confirmButtonColor: "#d33",
    });
  }
};




  if (isLoading || isProductsLoading)

    return (
      <div className="text-center text-lg font-semibold py-10 text-[#1c3b58]">
        {t("checkout.processing")}
      </div>
    );

 return (
  <section className="checkout-wrapper">
    <div className="checkout-container">
      <h2 className="checkout-title">{t("checkout.title")}</h2>

      <div className="checkout-summary">
        
        <p>{t("checkout.total_price")}: <strong>{totalPrice} TND</strong></p>
        <p>{t("checkout.items")}: <strong>{totalItems}</strong></p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="checkout-form">
        <div className="form-section">
          <h3 className="form-section-title">{t("checkout.personal_details")}</h3>

          <div className="form-group">
            <label>{t("checkout.full_name")}</label>
            <input {...register("name", { required: true })} type="text" className="form-input" />
            {errors.name && <p className="error-text">{t("checkout.required")}</p>}
          </div>

          <div className="form-group">
            <label>{t("checkout.email")}</label>
            <input type="email" value={currentUser?.email} disabled className="form-input disabled" />
          </div>

          <div className="form-group">
            <label>{t("checkout.phone")}</label>
            <input {...register("phone", { required: true })} type="text" className="form-input" />
            {errors.phone && <p className="error-text">{t("checkout.required")}</p>}
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">{t("checkout.shipping_address")}</h3>

          <div className="form-group">
            <label>{t("checkout.address")}</label>
            <input {...register("address", { required: true })} type="text" className="form-input" />
            {errors.address && <p className="error-text">{t("checkout.required")}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t("checkout.city")}</label>
              <input {...register("city", { required: true })} type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label>{t("checkout.country")}</label>
              <input {...register("country", { required: true })} type="text" className="form-input" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t("checkout.state")}</label>
              <input {...register("state", { required: true })} type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label>{t("checkout.zipcode")}</label>
              <input {...register("zipcode", { required: true })} type="text" className="form-input" />
            </div>
          </div>
        </div>

        <div className="form-footer">
          <label className="checkbox-label">
            <input
              type="checkbox"
              onChange={(e) => setIsChecked(e.target.checked)}
              className="checkbox"
            />
            {t("checkout.agree")}{" "}
            <Link className="link">{t("checkout.terms")}</Link> {t("checkout.and")}{" "}
            <Link className="link">{t("checkout.policy")}</Link>.
          </label>

          <button
            type="submit"
            disabled={!isChecked}
            className={`checkout-button ${isChecked ? "enabled" : "disabled"}`}
          >
            {t("checkout.place_order")}
          </button>
        </div>
      </form>
    </div>
  </section>
);



  
};

export default CheckoutPage;
