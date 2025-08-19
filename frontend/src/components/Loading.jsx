import React from "react";
import "../Styles/StylesLoading.css";

const LinaLoader = () => {
  return (
    <div className="lina-loader-wrapper">
      <div className="lina-spinner-glow"></div>
      <p className="lina-loading-text">Veuillez patienter...</p>
    </div>
  );
};

export default LinaLoader;

