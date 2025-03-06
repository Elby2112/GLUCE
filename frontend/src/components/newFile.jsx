import React from "react";
import { FaHeartbeat, FaChartBar, FaLightbulb } from "react-icons/fa";
import "../styles.css";

const FinalSection = () => {
  return (
    <section className="final-section">
      <h2 className="final-title">Discover Our Features</h2>
      <p className="final-description">
        Explore the key functionalities of our application that will help you monitor and improve your metabolic health.
      </p>
      <div className="squares-container">
        <div className="square">
          <FaHeartbeat className="square-icon" />
          <h3 className="square-title">Predictions</h3>
          <p className="square-text">Get AI-powered predictions on potential health risks.</p>
        </div>
        <div className="square">
          <FaChartBar className="square-icon" />
          <h3 className="square-title">Classifications</h3>
          <p className="square-text">Categorize your metabolic health based on advanced analysis.</p>
        </div>
        <div className="square">
          <FaLightbulb className="square-icon" />
          <h3 className="square-title">Recommendations</h3>
          <p className="square-text">Receive personalized advice to enhance your well-being.</p>
        </div>
      </div>
    </section>
  );
};

export default FinalSection;
