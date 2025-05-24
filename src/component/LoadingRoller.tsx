import React from "react";
import "./LoadingRoller.css";

const LoadingRoller: React.FC<{ text?: string }> = ({
  text = "Loading...",
}) => (
  <div className="loading-container">
    <div className="roller"></div>
    <div className="loading-text">{text}</div>
  </div>
);

export default LoadingRoller;
