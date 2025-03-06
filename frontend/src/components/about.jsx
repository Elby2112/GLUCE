import React from "react";
import aboutImg from "../assets/about_img.png";
import "../styles.css";

const About = () => {
  return (
    <section className="about-section">
      {/* Left Side (Title + Image) */}
      <div className="about-left">
        <h1 className="about-title">Get started with one of our licensed nutritionists</h1>
        <img src={aboutImg} alt="About" className="about-image" />
      </div>

      {/* Right Side (Description + Button) */}
      <div className="about-right">
        <p className="about-text">
          Learn more about our journey and how we strive to make a difference.
        </p>
        <button className="about-button">Let's Try</button>
      </div>
    </section>
  );
};

export default About;
