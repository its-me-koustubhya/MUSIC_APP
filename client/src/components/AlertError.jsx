import React from "react";
import { BsEmojiFrown } from "react-icons/bs";
import { motion } from "framer-motion";

const AlertError = ({ msg }) => {
  const alertStyles = {
    opacity: 0,
    y: -100,
    scale: 0.6,
  };

  const animateStyles = {
    opacity: 1,
    y: 50,
    scale: 1,
  };

  const exitStyles = {
    opacity: 0,
    y: -100,
    scale: 0.6,
  };

  const containerStyles = {
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  };

  const alertBoxStyles = {
    width: "460px",
    backgroundColor: "#f0f4f8",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    backdropFilter: "blur(4px)",
    padding: "0.75rem 1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  };

  const redBarStyles = {
    width: "4px",
    height: "10px",
    backgroundColor: "#f56565",
    borderRadius: "0.375rem",
  };

  const emojiStyles = {
    fontSize: "1.25rem",
    color: "#f56565",
  };

  const msgStyles = {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#2d3748",
  };

  return (
    <motion.div
      initial={alertStyles}
      animate={animateStyles}
      exit={exitStyles}
      style={containerStyles}
    >
      <div style={alertBoxStyles}>
        <div style={redBarStyles}></div>
        <BsEmojiFrown style={emojiStyles} />
        <p style={msgStyles}>
          {msg?.length > 50 ? `${msg?.slice(0, 50)}...` : msg}
        </p>
      </div>
    </motion.div>
  );
};

export default AlertError;
