import React from "react"; 
import OurSellers from "./OurSellers";
import { Helmet } from "react-helmet";
import LinaCarousel from './../../components/LinaCarousel';
import "../../Styles/StylesHome.css";
import HeroCategoryCards from "../../components/HeroCategoryCards";
import LentillesSection from './../../components/LentillesSection.jsx';
import KidsEyewearSection from './../../components/KidsEyewearSection';
import FadeInSection from "../../Animations/FadeInSection.jsx";

const Home = () => {
  return (
    <div className="main-content">
      <div className="home-container">
        <Helmet>
          <title>Opticien Tunisie | Optic Tunisie | Lunettes de vue & solaires | Lina Optic</title>
          <meta
            name="description"
            content="Lina Optic – Opticien en Tunisie : lunettes optiques, lunettes solaires, lentilles de contact. Large choix pour hommes, femmes et enfants, conseils par opticiens diplômés."
          />
          <meta
            name="keywords"
            content="Opticien Tunisie, Optic Tunisie, Lunettes opticien, Lunettes Optic, Site web opticien, Lunettes solaires opticien, Opticien Manouba"
          />
        </Helmet>

        {/* ✨ Carousel Section */}
        <FadeInSection>
          <LinaCarousel />
        </FadeInSection>

        {/* 🏡 Hero Section */}
        <FadeInSection>
          <section className="hero-section">
            <h2 className="welcome-title">Bienvenue chez <span>Lina Optic</span></h2>
            <p className="welcome-text">
              Depuis plus de 15 ans, Lina Optic vous accompagne dans le choix de vos lunettes de vue et de soleil avec expertise et passion.
              Découvrez notre large gamme de montures pour hommes, femmes et enfants, adaptées à tous les styles et besoins visuels.
            </p>
            <p className="welcome-text">
              Notre équipe d’opticiens diplômés est à votre écoute pour vous conseiller et vous garantir un confort visuel optimal au quotidien.
            </p>
          </section>
        </FadeInSection>

        <FadeInSection>
          <HeroCategoryCards/>
        </FadeInSection>

        {/* 🛍️ Our Sellers Section */}
        <FadeInSection>
          <section className="sellers-section">
            <div className="text-center">
              <h2 className="section-title">Notre Collection Complète</h2>
              <p className="section-subtitle">
                Parcourez l’ensemble de nos montures disponibles pour hommes, femmes et enfants – des modèles soigneusement sélectionnés pour allier style, confort et qualité visuelle.
              </p>
            </div>
            <OurSellers />
          </section>
        </FadeInSection>

        {/* Lentilles Section */}
        <FadeInSection>
          <section>
            <LentillesSection/>
          </section>
        </FadeInSection>

        {/*  Kids Eyewear Section */}
        <FadeInSection>
          <section>
            <KidsEyewearSection />
          </section>
        </FadeInSection>

      </div>
    </div>
  );
};

export default Home;
