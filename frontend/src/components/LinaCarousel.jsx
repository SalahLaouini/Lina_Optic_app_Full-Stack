import { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Styles/StylesLinaCarousel.css";

// 📷 Carousel images
import CarreraImg from "../assets/lina-carousel/carrera.jpg";
import CerrutiImg from "../assets/lina-carousel/cerruti.jpg";
import GucciImg from "../assets/lina-carousel/gucci.jpg";

const LinaCarousel = () => {
  // 🖱️ Custom cursor animation inside the carousel wrapper
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

    const showCursor = () => {
      cursor.style.opacity = 1;
    };

    const hideCursor = () => {
      cursor.style.opacity = 0;
    };

    wrapper.addEventListener("mousemove", moveCursor);
    wrapper.addEventListener("mouseenter", showCursor);
    wrapper.addEventListener("mouseleave", hideCursor);

    return () => {
      wrapper.removeEventListener("mousemove", moveCursor);
      wrapper.removeEventListener("mouseenter", showCursor);
      wrapper.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  // ✅ Correct placement: Define slides here
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

      {/* 🎠 Main Carousel Component */}
      <Carousel
        autoPlay            // 🔄 Autoplay carousel
        infiniteLoop        // 🔁 Loop slides
        showThumbs={false}  // 🚫 Hide thumbnail nav
        showStatus={false}  // 🚫 Hide status text
        interval={5000}     // ⏱️ Slide interval in ms
        showArrows          // ⬅️➡️ Show navigation arrows
        swipeable           // 📱 Allow swipe gestures
        emulateTouch        // 📲 Enable mobile behavior

        // ⬅️ Custom left arrow
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button className="custom-arrow left" onClick={onClickHandler}>‹</button>
          )
        }

        // ➡️ Custom right arrow
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button className="custom-arrow right" onClick={onClickHandler}>›</button>
          )
        }
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
  loading="lazy"
  decoding="async"
  fetchpriority={index === 0 ? "high" : "auto"}
/>

    </div>
    <div className="carousel-overlay">
      <p className="carousel-subtitle">{slide.subtitle}</p>
      <h2 className="carousel-title">{slide.title}</h2>
      <a href="/products" className="carousel-button">Découvrir</a>
    </div>
  </div>
))}

      </Carousel>
    </div>
  );
};

export default LinaCarousel;


