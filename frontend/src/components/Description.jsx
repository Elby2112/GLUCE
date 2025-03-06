import React from "react";
import descriptionImg from "../assets/description_img.png";
import "../styles.css";  // Import CSS

const Description = () => {
  return (
    <section className="description-section">
      {/* Left Side (Text Content) */}
      <div className="description-left">
        <h2 className="description-title">What is Metabolic Health ?</h2>
        <h3 className="description-subtitle">The Foundation of Lifelong Well-being</h3>
        <p className="description-text">
        Metabolic health is the body’s ability to efficiently convert food into energy at the cellular level. This fundamental process fuels every function in our body, impacting not just weight and energy levels but also long-term health. When metabolism is optimized, it supports cardiovascular function, brain health, and hormone balance. However, poor metabolic health is linked to serious conditions like obesity, type 2 diabetes, Alzheimer’s, dementia, depression, and heart disease. By understanding and improving metabolic health, we unlock the key to vitality, longevity, and disease prevention.
        </p>
      </div>

      {/* Right Side (Image) */}
      <div className="description-right">
        <img src={descriptionImg} alt="Description" className="description-img" />
      </div>
    </section>
  );
};

export default Description;
