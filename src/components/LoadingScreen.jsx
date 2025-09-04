// LoadingScreen.jsx
import React from "react";
import { Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--black)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "4rem",
          height: "4rem",
          borderColor: "var(--light-blue)",
          borderRightColor: "transparent",
        }}
      />
    </motion.div>
  );
};

export default LoadingScreen;
