import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import homeImg from "../assets/Home_img.png";
import "../styles.css";  
import Navbar from "./Navbar";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      {/* Top Bar (Logo + Navbar) */}
      <div className="hero-left">
        <div className="hero-top">
          <img src={logo} alt="Logo" className="hero-logo" />
          <Navbar />
        </div>
        <h1 className="hero-title">Welcome to Gluce</h1>
        <p className="hero-text">Predict Your Metabolic Health with AI.</p>
        <button 
          className="hero-button" 
          onClick={() => navigate("/dataentry")}
        >
          Get Started
        </button>
      </div>

      <div className="hero-right">
        <img src={homeImg} alt="Home" />
      </div>
    </section>
  );
};

export default HeroSection;
