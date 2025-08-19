import React, { useEffect, useRef, useState } from "react";

// ✅ FadeInSection component for scroll-triggered animations
const FadeInSection = ({ children }) => {
  // 📦 Ref to attach to the DOM element we want to observe
  const domRef = useRef();

  // ✅ State to control visibility (used to add the fade-in class)
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    // 👀 Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
      // ✅ Loop through entries (should only be one)
      entries.forEach((entry) => {
        // 🔍 Check if the element is visible in the viewport
        if (entry.isIntersecting) {
          // ✅ Update visibility to true when element comes into view
          setVisible(true);

          // 🛑 Stop observing after it becomes visible
          observer.unobserve(entry.target);
        }
      });
    });

    // 🎯 Start observing the current DOM node
    if (domRef.current) {
      observer.observe(domRef.current);
    }

    // 🧹 Cleanup observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
