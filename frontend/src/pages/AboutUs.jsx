import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import loubna from "../assets/loubna.jpeg";

const profile = {
  name: "Loubna Bouzenzen",
  description:
    "Hey, I’m Loubna! I’m a Junior Software Developer with a Master’s in Big Data, focused on using machine learning and optimization to build impactful, user-friendly solutions.",
  img: loubna,
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/loubna-bouzenzen-86a6441b8/",
    github: "https://github.com/Elby2112",
  },
};

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="about-title"
      >
        About Us
      </motion.h1>
      <div className="profile-card-container">
        <motion.div
          className="profile-card"
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="profile-img">
            <img src={profile.img} alt={profile.name} />
          </div>
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p>{profile.description}</p>
            <div className="social-links">
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
