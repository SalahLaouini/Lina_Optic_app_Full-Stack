import { useEffect, useState, Suspense } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Styles/StylesLinaCarousel.css";

// 📷 Carousel images (static import ensures preload capability)
import CarreraImg from "../assets/lina-carousel/carrera-webp.webp";
import CerrutiImg from "../assets/lina-carousel/cerruti-webp.webp";
import GucciImg from "../assets/lina-carousel/gucci-webp.webp";

const LinaCarousel = () => {
  const [isLoaded, setIsLoaded] = useState(false); // Track image load state

  // 🖱️ Custom animated hover cursor logic
  useEffect(() => {
    const cursor = document.querySelector(".custom-hover-cursor");
    const wrapper = document.querySelector(".lina-carousel-wrapper");

    const moveCursor = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    };

    const showCursor = () => (cursor.style.opacity = 1);
    const hideCursor = () => (cursor.style.opacity = 0);

    wrapper?.addEventListener("mousemove", moveCursor);
    wrapper?.addEventListener("mouseenter", showCursor);
    wrapper?.addEventListener("mouseleave", hideCursor);

    return () => {
      wrapper?.removeEventListener("mousemove", moveCursor);
      wrapper?.removeEventListener("mouseenter", showCursor);
      wrapper?.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  const slides = [
    {
      subtitle: "CARRERA",
      title: "Tendance Sans Cadre",
      image: CarreraImg,
    },
    {
      subtitle: "CERRUTI 1881",
      title: "Monture Fine et Élégante",
      image: CerrutiImg,
    },
    {
      subtitle: "GUCCI",
      title: "Design Classique & Luxe",
      image: GucciImg,
    },
  ];

  return (
    <div className="lina-carousel-wrapper">
      {/* 🌀 Custom animated hover cursor */}
      <div className="custom-hover-cursor"></div>

      {/* 🎠 Main Carousel with lazy image loading */}
      <Suspense fallback={<div className="carousel-loading">Chargement...</div>}>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={5000}
          showArrows
          swipeable
          emulateTouch
          renderArrowPrev={(onClickHandler, hasPrev) =>
            hasPrev && (
              <button className="custom-arrow left" onClick={onClickHandler}>
                ‹
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext) =>
            hasNext && (
              <button className="custom-arrow right" onClick={onClickHandler}>
                ›
              </button>
            )
          }
          onChange={() => {
            // Optional: Preload next image manually here if needed
          }}
        >
          {slides.map((slide, index) => (
            <div className="carousel-slide" key={index}>
              <div className="carousel-image-block">
                <img
                  src={slide.image}
                  alt={`Lunettes ${slide.subtitle}`}
                  className="carousel-img"
                  width="1200"
                  height="600"
                  loading={index === 0 ? "eager" : "lazy"} // Load first image ASAP
                  decoding="async"
                  fetchpriority={index === 0 ? "high" : "low"}
                  onLoad={() => index === 0 && setIsLoaded(true)}
                />
              </div>
              <div className="carousel-overlay">
                <p className="carousel-subtitle">{slide.subtitle}</p>
                <h2 className="carousel-title">{slide.title}</h2>
                <a href="/products" className="carousel-button">
                  Découvrir
                </a>
              </div>
            </div>
          ))}
        </Carousel>
      </Suspense>

      {/* 🕐 Optional preloader message */}
      {!isLoaded && <div className="carousel-preloader">Veuillez patienter...</div>}
    </div>
  );
};

export default LinaCarousel;
