import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./products/ProductCard";
import { useGetAllProductsQuery } from "../redux/features/products/productsApi";
import "../Styles/StylesProducts.css";
import FadeInSection from "../Animations/FadeInSection";
import SelectorsPageProducts from "./../components/SelectorProductsPage";
import PriceSlider from "../components/PriceSlider";
import { Helmet } from "react-helmet";

// 🧩 Options for frame type filtering
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

const Products = () => {
  // 🔧 State for selected filters
  const [selectedCategory, setSelectedCategory] = useState(["All"]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(["All"]);
  const [selectedBrand, setSelectedBrand] = useState(["All"]);
  const [selectedFrameType, setSelectedFrameType] = useState(["All"]);

  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // 📦 Fetch products from API
  const {
    data: products = [],
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category");
  const subCategoryFromUrl = queryParams.get("subCategory");

  const [priceRange, setPriceRange] = useState([0, 4500]); // 💰 Default price range

  // 🌐 Auto-select category/subCategory from URL
  useEffect(() => {
    if (categoryFromUrl) setSelectedCategory([categoryFromUrl]);
    if (subCategoryFromUrl) setSelectedSubCategory([subCategoryFromUrl]);
  }, [categoryFromUrl, subCategoryFromUrl]);

  // 🧠 Get unique brand list for selector
  const uniqueBrands = useMemo(() => {
    const brandsSet = new Set(products.map((p) => p.brand).filter(Boolean));
    const unique = Array.from(brandsSet);
    return unique.length > 0 ? unique : ["Aucune marque"];
  }, [products]);

  // 🧹 Apply all filters
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory.length && !selectedCategory.includes("All")) {
      result = result.filter((p) => selectedCategory.includes(p.mainCategory));
    }
    if (selectedSubCategory.length && !selectedSubCategory.includes("All")) {
      result = result.filter((p) => selectedSubCategory.includes(p.subCategory));
    }
    if (selectedBrand.length && !selectedBrand.includes("All")) {
      result = result.filter((p) => selectedBrand.includes(p.brand));
    }
    if (selectedFrameType.length && !selectedFrameType.includes("All")) {
      result = result.filter((p) => selectedFrameType.includes(p.frameType));
    }

    return result.filter((p) => {
      const price = p.newPrice || p.oldPrice || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });
  }, [
    products,
    selectedCategory,
    selectedSubCategory,
    selectedBrand,
    selectedFrameType,
    priceRange,
  ]);

  // ✂️ Slice visible products for pagination
  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  // ⬇️ Load more handler
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoadingMore(false);
      window.scrollBy({ top: 300, behavior: "smooth" });
    }, 800);
  };

  // ⏳ Loading state
  if (isLoading || isFetching) {
    return (
      <div className="products-loader-container">
        <div className="loader-circle" />
        <p className="loading-text">Chargement des produits...</p>
      </div>
    );
  }

  return (
    <div className="our-sellers" role="main">
      <Helmet>
        {/* ✅ Title assez long et descriptif */}
        <title>
          Catalogue : Lunettes optiques, solaires & lentilles en Tunisie | Lina Optic
        </title>

        {/* ✅ Meta description 150–160 caractères */}
        <meta
          name="description"
          content="Explorez notre catalogue de lunettes optiques, solaires et lentilles en Tunisie. Filtrez par catégorie, marque et type de cadre. Qualité et service Lina Optic."
        />

        <meta
          name="keywords"
          content="Lunettes opticien, Lunettes Optic, Optic Tunisie, Lunettes solaires opticien, Opticien Tunisie, Catalogue lunettes Tunisie"
        />

        {/* ✅ Canonical */}
        <link rel="canonical" href="https://www.linaoptic.com/products" />
      </Helmet>

      {/* ✅ H1 unique pour la page */}
      <h1 className="animated-products-title">Nos Produits – Lina Optic</h1>

      <div className="products-page-wrapper">
        {/* 🔍 Left Filter Sidebar */}
        <div className="selectors-wrapper-left" aria-label="Filtres produits">
          {/* Row: Catégorie + Sous-catégorie */}
          <div className="selector-row">
            <SelectorsPageProducts
              options={["Hommes", "Femmes", "Enfants"]}
              label="Catégorie"
              onSelect={setSelectedCategory}
              selected={selectedCategory}
            />

            <SelectorsPageProducts
              options={["Optique", "Solaire", "Lentilles"]}
              label="Sous-catégorie"
              onSelect={setSelectedSubCategory}
              selected={selectedSubCategory}
            />
          </div>

          {/* Row: Marque + Cadre + Prix */}
          <div className="selector-row">
            <div className="selector-column">
              <SelectorsPageProducts
                options={uniqueBrands}
                label="Marque"
                onSelect={setSelectedBrand}
                selected={selectedBrand}
              />

              <FadeInSection delay={0.1}>
                <div className="selector-sidebar-lina">
                  <PriceSlider
                    min={0}
                    max={4500}
                    priceRange={priceRange}
                    onChange={setPriceRange}
                  />
                </div>
              </FadeInSection>
            </div>

            <div className="selector-column">
              <SelectorsPageProducts
                options={frameTypeOptions}
                label="Type de Cadre"
                onSelect={setSelectedFrameType}
                selected={selectedFrameType}
              />
            </div>
          </div>
        </div>

        {/* 🛍 Product Grid */}
        <div className="products-grid-wrapper">
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div className="products-grid">
              {visibleProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>

          {visibleProducts.length === 0 && (
            <p className="no-products">Aucun produit ne correspond aux filtres.</p>
          )}

          {visibleCount < filteredProducts.length && (
            <div className="load-more-wrapper">
              {isLoadingMore ? (
                <div className="loader-spinner"></div>
              ) : (
                <button onClick={handleLoadMore} className="load-more-btn">
                  Charger plus
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
