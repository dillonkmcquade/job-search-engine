import React from "react";
import "./lazy-spinner.styles.scss";

const LazySpinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container" />
    </div>
  );
};

export default LazySpinner;
