import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import DataEntry from "./pages/DataEntry";
import Results from "./pages/Results";

// Component that conditionally renders the global Navbar
const ConditionalNavbar = () => {
  const location = useLocation();
  // If the current path is the home page, return null (do not render Navbar)
  if (location.pathname === "/") {
    return null;
  }
  // Otherwise, render Navbar
  return <Navbar />;
};

function App() {
  return (
    <Router>
      {/* Render the global Navbar conditionally */}
      <ConditionalNavbar />
      
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home includes its own Navbar inside HeroSection */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/dataentry" element={<DataEntry />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
