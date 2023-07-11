import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { motion } from "framer-motion";

const AlertSuccess = ({ msg }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.6 }}
      animate={{ opacity: 1, y: 50, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.6 }}
      style={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          width: "460px",
          backgroundColor: "#ffffff",
          borderRadius: "4px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(8px)",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <div
          style={{
            width: "4px",
            height: "10px",
            backgroundColor: "#34d399",
            borderRadius: "4px",
          }}
        ></div>
        <BsEmojiSmile
          style={{
            fontSize: "1.5rem",
            color: "#34d399",
          }}
        />
        <p
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: "#111827",
          }}
        >
          {msg?.length > 50 ? `${msg?.slice(0, 50)}...` : msg}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AlertSuccess;
