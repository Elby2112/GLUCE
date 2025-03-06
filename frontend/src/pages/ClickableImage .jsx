import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ClickableImage = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} style={{ cursor: "pointer" }}>
        <img 
          src={src} 
          alt={alt} 
          style={{ width: "100%", height: "auto", borderRadius: "8px" }} 
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={src}
              alt={alt}
              style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px" }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClickableImage;
