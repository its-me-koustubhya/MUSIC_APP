import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        zIndex: "50",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
        backgroundColor: "rgba(256,256,256,0.1)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: "10rem",
            height: "10rem",
            minWidth: "160px",
            backgroundColor: "#DC2626",
            animation: "pulse 1s infinite",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "0",
              borderRadius: "50%",
              backgroundColor: "#DC2626",
              filter: "blur(8px)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
