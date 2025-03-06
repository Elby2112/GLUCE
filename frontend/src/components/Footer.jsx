import React from "react";
import logo from "../assets/logo_footer.svg";
import footerImg from "../assets/footer_img.png"; 
import "../styles.css";  

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left Section (Full-Height Image) */}
      <div className="footer-left">
        <img src={footerImg} alt="Footer Image" className="footer-img" />
      </div>

      {/* Right Section (Content) */}
      <div className="footer-right">
        {/* Logo at the Top */}
        <img src={logo} alt="Logo" className="footer-logo" />

        {/* Title in the middle */}
        <h2 className="footer-title">Get In Touch</h2>

        {/* Contact Information at the Bottom */}
        <div className="footer-info">
          <p className="footer-text">Stay connected with us for the latest updates.</p>
          <p className="footer-text">Email: contact@gluce.com</p>
          <p className="footer-text">Phone: +1 234 567 890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
