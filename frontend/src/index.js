import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css"; // Optional, if you have styles
import App from "./App"; // Make sure this matches the file name

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
