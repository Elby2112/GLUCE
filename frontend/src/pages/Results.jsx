import { motion } from "framer-motion";
import { CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, Scatter, ComposedChart, Line } from "recharts";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import predicition from "../assets/prediction.png";
import classificationIcon from "../assets/hierarchy.png";
import recommendationIcon from "../assets/social-media (1).png";
import summaryIcon from "../assets/contract.png";
import feature from "../assets/top-three.png";
import correlation from "../assets/graph.png";
import bmiWaistCircImage from "../assets/scatter_BMI_WaistCirc.png";
import hdlTriglyceridesImage from "../assets/scatter_HDL_Triglycerides.png";
import ClickableImage from "./ClickableImage ";
import "../styles.css";

// CircularProgress Component
const CircularProgress = ({ value, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = value / 100;
  const offset = circumference * (1 - progress);
  
  return (
    <svg width={size} height={size} className="circular-progress">
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#ddd" strokeWidth={strokeWidth} fill="none" />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#ffc643"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1 }}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="18" fill="#0a5247">
        {`${value}%`}
      </text>
    </svg>
  );
};

// TrafficLightIndicator Component
const TrafficLightIndicator = ({ risk }) => {
  const mappedRisk = risk === "Healthy" ? "Low Risk" : risk === "At Risk" ? "Moderate Risk" : risk;
  const activeAnimation = { scale: [1, 1.2, 1], transition: { duration: 0.5 } };
  
  return (
    <div className="traffic-light-indicator">
      <motion.div className={`light green ${mappedRisk === "Low Risk" ? "active" : ""}`} animate={mappedRisk === "Low Risk" ? activeAnimation : {}}></motion.div>
      <motion.div className={`light yellow ${mappedRisk === "Moderate Risk" ? "active" : ""}`} animate={mappedRisk === "Moderate Risk" ? activeAnimation : {}}></motion.div>
      <motion.div className={`light red ${mappedRisk === "High Risk" ? "active" : ""}`} animate={mappedRisk === "High Risk" ? activeAnimation : {}}></motion.div>
    </div>
  );
};

const Card = ({ children, className = "" }) => <div className={`card ${className}`}>{children}</div>;

/**
 * Helper function to parse recommendations from the Gemini output.
 * Expected format (each line):
 * * **Food/Diet:** Prioritize a diet rich in fruits, vegetables, and whole grains, ...
 */
const parseRecommendations = (recsStr) => {
  if (!recsStr) return [];
  // Split by newline characters.
  const lines = recsStr.split(/\r?\n/);
  const recommendations = [];
  lines.forEach((line) => {
    const trimmed = line.trim();
    // Process only lines that start with an asterisk.
    if (trimmed.startsWith("*")) {
      // Remove the leading asterisk.
      let content = trimmed.substring(1).trim();
      // Now expect the format: **Category:** Description...
      // Remove the starting and ending double asterisks from the category.
      const colonIndex = content.indexOf(":");
      if (colonIndex !== -1) {
        const categoryPart = content.substring(0, colonIndex).replace(/\*\*/g, "").trim();
        const textPart = content.substring(colonIndex + 1).trim();
        if (categoryPart && textPart) {
          recommendations.push({ category: categoryPart, text: textPart });
        }
      }
    }
  });
  return recommendations;
};

const Results = () => {
  // Always call hooks at the top.
  const { state } = useLocation();
  const [currentRecIndex, setCurrentRecIndex] = useState(0);

  // Use a fallback empty string if recommendations not provided.
  const recommendationsStr = state && state.recommendations ? state.recommendations : "";
  // Parse the recommendations string.
  const parsedRecommendations = parseRecommendations(recommendationsStr);

  // Map each parsed recommendation to include an id and an icon.
  const iconMapping = {
    "Food/Diet": "🍎",
    "Sleep": "😴",
    "Exercise": "🏃",
    "Stress Management": "🧘",
    "Regular Check-ups": "🩺",
    "Lifestyle Adjustments": "⚖️"
  };

  const recommendationsArray = parsedRecommendations.map((rec, index) => ({
    id: index + 1,
    category: rec.category,
    text: rec.text,
    icon: iconMapping[rec.category] || "❓"
  }));

  useEffect(() => {
    if (recommendationsArray.length) {
      const interval = setInterval(() => {
        setCurrentRecIndex(prev => (prev + 1) % recommendationsArray.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [recommendationsArray.length]);

  // Fallback if no state is provided.
  if (!state) {
    return (
      <div className="results-container">
        <h1>No Prediction Data Available</h1>
        <p>Please submit your data first.</p>
      </div>
    );
  }

  // Destructure API output from state.
  const { risk_score, classification, summary } = state;

  // Static data for Feature Importance (example data)
  const featureData = [
    { feature: "Triglycerides", importance: 0.184738, color: "#ffc643" },
    { feature: "Blood Glucose", importance: 0.170837, color: "#ffc643" },
    { feature: "Waist Circ", importance: 0.157039, color: "#ffc643" },
    { feature: "HDL", importance: 0.103090, color: "#ffc643" },
    { feature: "BMI", importance: 0.101698, color: "#ffc643" },
    { feature: "Age", importance: 0.057415, color: "#ffc643" },
  ];

  return (
    <div className="results-container">
      <h1 className="results-title">Your Metabolic Health Results Using AI</h1>
      <div className="grid-container">
        
        {/* Metabolic Health Score Container */}
        <Card>
          <h2 className="card-title">
            <img src={predicition} alt="Metabolic Health Score Icon" className="icon" /> Metabolic Health Score Prediction
          </h2>
          <p>Your Score is {risk_score.toFixed(2)}/100</p>
          <CircularProgress value={risk_score} />
        </Card>

        {/* Classification (Risk Category) Container */}
        <Card>
          <h2 className="card-title">
            <img src={classificationIcon} alt="Risk Classification Icon" className="icon" /> Classification (Risk Category)
          </h2>
          <p>You are classified as: {classification}</p>
          <TrafficLightIndicator risk={classification} />
        </Card>

        {/* Recommendations Container */}
        <Card>
          <h2 className="card-title">
            <img src={recommendationIcon} alt="Recommendations Icon" className="icon" /> Recommendations
          </h2>
          <p>Personalized health recommendations generated by Gemini.</p>
          {recommendationsArray.length > 0 ? (
            <div className="recommendations-container">
              <motion.div
                key={recommendationsArray[currentRecIndex].id}
                className="recommendation-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="recommendation-content">
                  <span className="recommendation-icon">{recommendationsArray[currentRecIndex].icon}</span>
                  <h3 className="recommendation-category">{recommendationsArray[currentRecIndex].category}</h3>
                </div>
                <p className="recommendation-text">{recommendationsArray[currentRecIndex].text}</p>
              </motion.div>
              <div className="recommendation-controls">
                <button onClick={() =>
                  setCurrentRecIndex((prev) => (prev - 1 + recommendationsArray.length) % recommendationsArray.length)
                }>
                  ⬅️
                </button>
                <button onClick={() =>
                  setCurrentRecIndex((prev) => (prev + 1) % recommendationsArray.length)
                }>
                  ➡️
                </button>
              </div>
            </div>
          ) : (
            <p>No recommendations available.</p>
          )}
        </Card>

        {/* Summary Container */}
        <Card className="summary-card">
          <h2 className="card-title">
            <img src={summaryIcon} alt="Summary Icon" className="icon" /> Summary
          </h2>
          <motion.div 
            className="summary-text-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="summary-text">{summary}</p>
          </motion.div>
        </Card>

        {/* Feature Importance Container */}
        <Card className="feature-importance-card">
          <h2 className="card-title">
            <img src={feature} alt="Feature Importance Icon" className="icon" /> Feature Importance
          </h2>
          <p className="feature-description">
            This chart ranks the 5 key factors influencing your metabolic health. Higher values indicate higher impact.
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart layout="vertical" data={featureData} margin={{ top: 20, right: 20, bottom: 20, left: 35 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 0.2]} tickFormatter={(tick) => tick.toFixed(2)} />
              <YAxis type="category" dataKey="feature" tick={{ fontSize: 14 }} />
              <Tooltip formatter={(value) => value.toFixed(4)} />
              <Line type="monotone" dataKey="importance" stroke="#ffc643" strokeWidth={2} dot={false} />
              <Scatter data={featureData} dataKey="importance" fill={({ payload }) => payload.color} shape="circle" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Correlation Analysis Container */}
        <Card>
          <h2 className="card-title">
            <img src={correlation} alt="Correlation Analysis Icon" className="icon" /> Correlation Analysis
          </h2>
          <div className="correlation-images" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
            <div className="correlation-image" style={{ textAlign: "center", maxWidth: "300px" }}>
              <ClickableImage src={bmiWaistCircImage} alt="Scatter plot for BMI vs Waist Circumference" />
              <p>
                <strong>Strong Positive Correlation:</strong><br />
                BMI and waist circumference are strongly related.
              </p>
            </div>
            <div className="correlation-image" style={{ textAlign: "center", maxWidth: "300px" }}>
              <ClickableImage src={hdlTriglyceridesImage} alt="Scatter plot for HDL vs Triglycerides" />
              <p>
                <strong>Weak-to-Moderate Negative Correlation:</strong><br />
                As HDL increases, triglyceride levels tend to decrease.
              </p>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Results;
