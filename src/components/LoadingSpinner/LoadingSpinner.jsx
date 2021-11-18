import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = ({ className, style }) => {
  return <span className={`spinner ${className}`} style={style}></span>;
};

export default LoadingSpinner;
