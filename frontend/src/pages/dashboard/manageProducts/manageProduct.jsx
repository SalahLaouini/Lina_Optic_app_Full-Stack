import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../redux/features/products/productsApi";
import Swal from "sweetalert2";
import { getImgUrl } from "../../../utils/getImgUrl";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { resetTrigger } from "../../../redux/features/products/productEventsSlice.js";
import "../../../Styles/StylesManageProducts.css";

// 🛠️ Component to manage and display all products with edit/delete options
const ManageProducts = () => {
  // 🔄 Fetch all products from backend
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
    error,
  } = useGetAllProductsQuery();

  // 🗑️ Mutation hook for deleting a product
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

  // 🌍 i18n
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  // 🔁 Redux: trigger product list refresh when a change occurs elsewhere
  const dispatch = useDispatch();
  const shouldRefetch = useSelector(
    (state) => state.productEvents.shouldRefetch
  );

  // 🔎 Search term for filtering by ID or title
  const [searchTerm, setSearchTerm] = useState("");

  // 🔃 If `shouldRefetch` is true, refresh product list
  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      dispatch(resetTrigger()); // ✅ Reset trigger to avoid infinite loop
    }
  }, [shouldRefetch, refetch, dispatch]);

  // 🗑️ Handle deletion with confirmation dialog
  const handleDeleteProduct = async (id) => {
    const confirmResult = await Swal.fire({
      title: t("manageProducts.confirmTitle", "Êtes-vous sûr ?"),
      text: t(
        "manageProducts.confirmText",
        "Vous ne pourrez pas revenir en arrière !"
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("manageProducts.confirmYes", "Oui, supprimez-le !"),
      cancelButtonText: t("common.cancel", "Annuler"),
    });

    if (confirmResult.isConfirmed) {
      try {
        await deleteProduct(id).unwrap(); // 🔥 Delete product via API
        Swal.fire(
          t("manageProducts.deletedTitle", "Supprimé !"),
          t("manageProducts.deletedText", "Le produit a été supprimé."),
          "success"
        );
        refetch(); // 🔄 Refresh product list
      } catch (err) {
        Swal.fire(
          t("manageProducts.errorTitle", "Erreur !"),
          err?.data?.message ||
            t(
              "manageProducts.errorDelete",
              "Échec de la suppression du produit. Veuillez réessayer."
            ),
          "error"
        );
      }
    }
  };

  // 🧠 Filter products based on the search input (by ID or title)
  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const idHit = p?._id?.toLowerCase().includes(q);
      const titleHit = String(p?.title || "")
        .toLowerCase()
        .includes(q);
      return idHit || titleHit;
    });
  }, [products, searchTerm]);

  // 🧭 Column headers (i18n-ready). Keep order in sync with tbody cells.
  const headers = [
    { key: "index", label: t("manageProducts.headers.index", "#"), width: "w-14" },
    { key: "id", label: t("manageProducts.headers.id", "ID"), width: "min-w-40" },
    { key: "product", label: t("manageProducts.headers.product", "Produit"), width: "min-w-64" },
    { key: "brand", label: t("manageProducts.headers.brand", "Marque"), width: "min-w-40" },
    { key: "category", label: t("manageProducts.headers.category", "Catégorie"), width: "min-w-48" },
    { key: "colors", label: t("manageProducts.headers.colors", "Couleurs"), width: "min-w-72" },
    { key: "price", label: t("manageProducts.headers.price", "Prix"), width: "min-w-32" },
    { key: "stock", label: t("manageProducts.headers.stock", "Stock"), width: "min-w-40" },
    { key: "actions", label: t("manageProducts.headers.actions", "Actions"), width: "min-w-48" },
  ];

  return (
    <section
      className="w-full bg-gray-50 min-h-screen px-2 md:px-6 py-6"
      dir={i18n.dir ? i18n.dir() : lang === "ar" ? "rtl" : "ltr"}
    >
      {/* 🧭 Header Section */}
      <header className="w-full bg-white shadow px-4 md:px-6 py-4 mb-6 border-b border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center md:text-left">
          {t("manageProducts.title", "Gérer les Produits")}
        </h2>

        {/* 🔍 Search bar for filtering products by ID / Title */}
        <input
          type="text"
          placeholder={t(
            "manageProducts.searchPlaceholder",
            "Rechercher par ID ou titre..."
          )}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-80 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          aria-label={t("manageProducts.searchAria", "Rechercher un produit")}
        />
      </header>

      {/* 📋 Products Table (scrolls inside this box) */}
      <div className="relative w-full">
        <div className="overflow-auto max-h-[calc(100vh-220px)] rounded border border-gray-200">
          <table className="products-table w-max min-w-[1100px] table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700 font-semibold">
                {headers.map((h) => (
                  <th
                    key={h.key}
                    scope="col"
                    role="columnheader"
                    className={`p-4 border border-gray-300 ${h.width} sticky top-0 bg-gray-200 z-10 text-sm md:text-base`}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* ⏳ Loading state */}
              {isLoading && (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="text-center p-6 border border-gray-300"
                  >
                    {t("manageProducts.loading", "Chargement des produits...")}
                  </td>
                </tr>
              )}

              {/* ⚠️ Error state */}
              {!isLoading && isError && (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="text-center p-6 border border-red-300 text-red-600"
                  >
                    {t(
                      "manageProducts.fetchError",
                      "Une erreur s’est produite lors du chargement des produits."
                    )}
                    {process.env.NODE_ENV !== "production" && (
                      <div className="mt-2 text-xs text-gray-500">
                        {String(error?.status || "")}
                      </div>
                    )}
                  </td>
                </tr>
              )}

              {/* ✅ Display filtered products */}
              {!isLoading && !isError && filteredProducts?.length > 0 ? (
                filteredProducts.map((product, index) => {
                  const totalStock = Array.isArray(product?.colors)
                    ? product.colors.reduce(
                        (sum, c) => sum + (Number(c?.stock) || 0),
                        0
                      )
                    : 0;

                  return (
                    <tr key={product._id} className="hover:bg-gray-100 transition">
                      {/* # Index */}
                      <td className="p-4 border border-gray-300 align-middle">
                        {index + 1}
                      </td>

                      {/* 🔑 Product ID */}
                      <td className="p-4 border border-gray-300 align-middle text-xs md:text-sm text-gray-600">
                        {product?._id ? `${product._id.slice(0, 8)}...` : "—"}
                      </td>

                      {/* 🖼️ Product title + cover image (legacy styles) */}
                      <td className="p-4 border border-gray-300">
                        <div className="flex flex-col items-center justify-center text-center">
                          <span className="font-medium text-gray-800 mt-2 text-sm md:text-base break-words">
                            {product?.title || "—"}
                          </span>
                          {product?.coverImage && (
                            <img
                              src={getImgUrl(product.coverImage)}
                              alt={product?.title || "product image"}
                              className="mp-cover mt-2"
                              loading="lazy"
                            />
                          )}
                        </div>
                      </td>

                      {/* 🏷️ Brand */}
                      <td className="p-4 border border-gray-300 text-sm text-gray-700">
                        {product?.brand || "—"}
                      </td>

                      {/* 🗂️ Categories */}
                      <td className="p-4 border border-gray-300 align-middle capitalize text-gray-700">
                        {(product?.mainCategory || "—") +
                          " / " +
                          (product?.subCategory || "—")}
                      </td>

                      {/* 🎨 Colors with images (legacy grid/thumb classes) */}
                      <td className="p-4 border border-gray-300 align-middle">
                        {Array.isArray(product?.colors) &&
                        product.colors.length > 0 ? (
                          <div className="flex flex-col gap-2">
                            {product.colors.map((color, idx) => {
                              const localizedName =
                                color?.colorName?.[lang] ||
                                color?.colorName?.en ||
                                t("manageProducts.defaultColor", "Défaut");
                              return (
                                <div key={idx} className="flex flex-col">
                                  {/* Grid of thumbnails */}
                                  <div className="mp-color-grid">
                                    {Array.isArray(color?.images) &&
                                      color.images.map((img, i) => (
                                        <img
                                          key={i}
                                          src={getImgUrl(img)}
                                          alt={localizedName}
                                          className="mp-color-thumb"
                                          title={localizedName}
                                          loading="lazy"
                                        />
                                      ))}
                                  </div>
                                  {/* Color name */}
                                  <span className="mp-color-name mt-1">
                                    {localizedName}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="text-gray-500">
                            {t("manageProducts.default", "Par défaut")}
                          </span>
                        )}
                      </td>

                      {/* 💰 Price */}
                      <td className="p-4 border border-gray-300 align-middle text-green-600 font-semibold">
                        {Number(product?.newPrice || 0).toLocaleString(lang, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}{" "}
                        {t("currency.tnd", "TND")}
                      </td>

                      {/* 📦 Stock quantity */}
                      <td className="p-4 border border-gray-300 align-middle">
                        <span
                          className={
                            totalStock === 0
                              ? "text-red-500 font-medium"
                              : "text-yellow-600 font-medium"
                          }
                        >
                          {totalStock > 0
                            ? t("manageProducts.inStock", "{{count}} en stock", {
                                count: totalStock,
                              })
                            : t("manageProducts.outOfStock", "Rupture de stock")}
                        </span>
                      </td>

                      {/* 🛠️ Edit / Delete buttons */}
                      <td className="p-4 border border-gray-300 align-middle">
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                          <Link
                            to={`/dashboard/edit-product/${product._id}`}
                            className="bg-blue-500 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 w-full sm:w-auto text-center"
                          >
                            {t("common.edit", "Modifier")}
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            disabled={deleting}
                            className="bg-red-500 text-white px-4 py-2 rounded font-medium hover:bg-red-700 disabled:opacity-60 w-full sm:w-auto"
                          >
                            {deleting
                              ? t("manageProducts.deleting", "Suppression...")
                              : t("common.delete", "Supprimer")}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                // 📭 Empty state
                !isLoading &&
                !isError && (
                  <tr>
                    <td
                      colSpan={headers.length}
                      className="text-center p-6 border border-gray-300"
                    >
                      {t("manageProducts.empty", "Aucun produit trouvé.")}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ManageProducts;
