import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Age from "../assets/age-range.png";
import sex from "../assets/sex.png";
import martial from "../assets/relationship.png";
import income from "../assets/income.png";
import race from "../assets/united-nations.png";
import waist from "../assets/measuring-tape.png";
import bmi from "../assets/bmi.png";
import alb from "../assets/urine-sample.png";
import kidney from "../assets/kidney.png";
import uricAcid from "../assets/increased-acidity.png";
import gluco from "../assets/sugar-blood-level.png";
import hdl from "../assets/hdl.png";
import trig from "../assets/triglycerides.png";
import { 
  Box, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Button,
  CircularProgress
} from "@mui/material";
import "../styles.css";

// Reusable component to wrap input fields with an icon and a description.
const FieldWithIcon = ({ icon, description, children }) => (
  <div className="field-group">
    <div className="field-icon-container">
      <img src={icon} alt="icon" className="field-icon" />
      {children}
    </div>
    <p className="field-description">{description}</p>
  </div>
);

const DataEntry = () => {
  // State for personal information
  const [personalInfo, setPersonalInfo] = useState({
    age: "",
    sex: "",
    marital: "",
    income: "",
    race: ""
  });

  // State for physical metrics
  const [physicalMetrics, setPhysicalMetrics] = useState({
    waistCirc: "",
    BMI: "",
    albuminuria: "",
    urAlbCr: "",
    uricAcid: "",
    bloodGlucose: "",
    HDL: "",
    triglycerides: ""
  });

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlePersonalChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handlePhysicalChange = (e) => {
    setPhysicalMetrics({ ...physicalMetrics, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Combine personal info and physical metrics:
    const formData = { ...personalInfo, ...physicalMetrics };

    // Map keys to match what your backend expects:
    const payload = {
      Age: parseFloat(formData.age),
      Sex: formData.sex,
      Marital: formData.marital,
      Income: parseFloat(formData.income),
      Race: formData.race,
      WaistCirc: parseFloat(formData.waistCirc),
      BMI: parseFloat(formData.BMI),
      Albuminuria: parseFloat(formData.albuminuria),
      UrAlbCr: parseFloat(formData.urAlbCr),
      UricAcid: parseFloat(formData.uricAcid),
      BloodGlucose: parseFloat(formData.bloodGlucose),
      HDL: parseFloat(formData.HDL),
      Triglycerides: parseFloat(formData.triglycerides),
    };

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Prediction result:", result);
      // Navigate to your results page, passing the result data:
      navigate("/results", { state: result });
    } catch (error) {
      console.error("Error during API call:", error);
      setError("There was an error processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="data-entry-container"
      sx={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Enter Your Metabolic Health Data
      </Typography>
      <form onSubmit={handleSubmit} className="data-entry-form">
        {/* Personal Information Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            👤 Personal Information
          </Typography>
          <FieldWithIcon icon={Age} description="Age in Years.">
            <TextField
              label="Age"
              name="age"
              type="number"
              value={personalInfo.age}
              onChange={handlePersonalChange}
              fullWidth
              required
            />
          </FieldWithIcon>
          <FieldWithIcon icon={sex} description="Male or Female">
            <FormControl fullWidth required>
              <InputLabel>Sex</InputLabel>
              <Select
                name="sex"
                value={personalInfo.sex}
                label="Sex"
                onChange={handlePersonalChange}
              >
                <MenuItem value="">
                  <em>Select Sex</em>
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </FieldWithIcon>
          <FieldWithIcon icon={martial} description="Marital Status.">
            <FormControl fullWidth required>
              <InputLabel>Marital Status</InputLabel>
              <Select
                name="marital"
                value={personalInfo.marital}
                label="Marital Status"
                onChange={handlePersonalChange}
              >
                <MenuItem value="">
                  <em>Select Status</em>
                </MenuItem>
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married</MenuItem>
                <MenuItem value="divorced">Divorced</MenuItem>
                <MenuItem value="widowed">Widowed</MenuItem>
              </Select>
            </FormControl>
          </FieldWithIcon>
          <FieldWithIcon icon={income} description="Annual Income in USD.">
            <TextField
              label="Income"
              name="income"
              type="number"
              value={personalInfo.income}
              onChange={handlePersonalChange}
              fullWidth
              required
            />
          </FieldWithIcon>
          <FieldWithIcon icon={race} description="Racial Group">
            <FormControl fullWidth required>
              <InputLabel>Race</InputLabel>
              <Select
                name="race"
                value={personalInfo.race}
                label="Race"
                onChange={handlePersonalChange}
              >
                <MenuItem value="">
                  <em>Select Race</em>
                </MenuItem>
                <MenuItem value="white">White</MenuItem>
                <MenuItem value="black">Black</MenuItem>
                <MenuItem value="asian">Asian</MenuItem>
                <MenuItem value="hispanic">Hispanic</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </FieldWithIcon>
        </Box>

        {/* Physical Metrics Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            🏋️ Physical Metrics
          </Typography>
          <FieldWithIcon icon={waist} description="Waist Circumference (cm)">
            <TextField
              label="Waist Circumference (cm)"
              name="waistCirc"
              type="number"
              value={physicalMetrics.waistCirc}
              onChange={handlePhysicalChange}
              fullWidth
              required
            />
          </FieldWithIcon>
          <FieldWithIcon icon={bmi} description="Body Mass Index (kg/m**2)">
            <TextField
              label="BMI"
              name="BMI"
              type="number"
              value={physicalMetrics.BMI}
              onChange={handlePhysicalChange}
              fullWidth
              required
            />
          </FieldWithIcon>
          <FieldWithIcon icon={kidney} description="Albumin in Urine (mg/L)">
            <TextField
              label="Albuminuria"
              name="albuminuria"
              type="number"
              value={physicalMetrics.albuminuria}
              onChange={handlePhysicalChange}
              fullWidth
              required
            />
          </FieldWithIcon>
          <FieldWithIcon 
            icon={alb} 
            description="Ratio of Albumin (mcg/L) to Creatinine (mg/L) in Urine"
          >
            <TextField
              label="UrAlbCr"
              name="urAlbCr"
              type="number"
              value={physicalMetrics.urAlbCr}
              onChange={handlePhysicalChange}
              fullWidth
              required
            />
          </FieldWithIcon>
          <FieldWithIcon icon={uricAcid} description="Uric Acid in Blood (mg/dl)">
            <TextField
              label="Uric Acid"
              name="uricAcid"
              type="number"
              value={physicalMetrics.uricAcid}
              onChange={handlePhysicalChange}
              fullWidth
              required
            />
          </FieldWithIcon>
          <FieldWithIcon icon={gluco} description="Glucose in Blood (mg/dL)">
            <TextField
              label="Blood Glucose (mg/dL)"
              name="bloodGlucose"
              type="number"
              value={physicalMetrics.bloodGlucose}
              onChange={handlePhysicalChange}
              fullWidth
              required
            />
          </FieldWithIcon>
          <FieldWithIcon icon={hdl} description="High Density Lipoprotein (mg/dl)">
            <TextField
              label="HDL (mg/dL)"
              name="HDL"
              type="number"
              value={physicalMetrics.HDL}
              onChange={handlePhysicalChange}
              fullWidth
              required
            />
          </FieldWithIcon>
          <FieldWithIcon icon={trig} description="Triglycerides in Blood (mg/dL)">
            <TextField
              label="Triglycerides (mg/dL)"
              name="triglycerides"
              type="number"
              value={physicalMetrics.triglycerides}
              onChange={handlePhysicalChange}
              fullWidth
              required
            />
          </FieldWithIcon>
        </Box>

        {/* Display error message if any */}
        {error && (
          <Typography variant="body1" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Submit Button */}
        <Button 
          variant="contained" 
          type="submit"
          className="submit-button"
          disabled={loading}
          fullWidth
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "See your results?"}
        </Button>
      </form>
    </Box>
  );
};

export default DataEntry;
