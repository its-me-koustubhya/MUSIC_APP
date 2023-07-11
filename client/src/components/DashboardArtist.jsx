import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useStateValue } from "../Context/StateProvider";
import { Link } from "react-router-dom";
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { getAllArtist } from "../api";
import { actionType } from "../Context/reducer";

const DashboardArtist = () => {
  const [{ artists }, dispatch] = useStateValue();

  useEffect(() => {
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }
  }, []);

  const containerStyle = {
    width: "100%",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  const artistContainerStyle = {
    width: "100%",
    marginTop: "4rem",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  return (
    <div style={containerStyle}>
      <div style={artistContainerStyle}>
        {artists &&
          artists.map((data, index) => (
            <ArtistCard key={index} data={data} index={index} />
          ))}
      </div>
    </div>
  );
};

export const ArtistCard = ({ data, index }) => {
  const [isDelete, setIsDelete] = useState(false);

  const cardStyle = {
    position: "relative",
    width: "44rem",
    minWidth: "180px",
    padding: "2px",
    paddingTop: "4px",
    gap: "0.75rem",
    cursor: "pointer",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "var(--card)",
    borderRadius: "0.375rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const imageStyle = {
    width: "100%",
    height: "40rem",
    objectFit: "cover",
    borderRadius: "0.375rem",
  };

  const textStyle = {
    fontSize: "1rem",
    color: "var(--textColor)",
  };

  const socialLinksContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  };

  const socialIconStyle = {
    color: "var(--gray-500)",
    fontSize: "1.5rem",
  };

  const deleteIconStyle = {
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
  };

  const deleteIconHoverStyle = {
    color: "var(--red-400)",
    fontSize: "1.5rem",
    cursor: "pointer",
  };

  const deleteOverlayStyle = {
    position: "absolute",
    inset: "0",
    padding: "2px",
    backgroundColor: "var(--darkOverlay)",
    backdropFilter: "blur(2px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
  };

  const deleteTextsContainerStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
  };

  const deleteButtonStyle = {
    backgroundColor: "var(--red-300)",
    padding: "0.5rem",
    borderRadius: "0.375rem",
  };

  const cancelButtonStyle = {
    backgroundColor: "var(--green-300)",
    padding: "0.5rem",
    borderRadius: "0.375rem",
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      style={cardStyle}
    >
      <img src={data?.imageURL} style={imageStyle} alt="" />

      <p style={textStyle}>{data.name}</p>

      <div style={socialLinksContainerStyle}>
        <a href={data.instagram} target="_blank">
          <motion.i whileTap={{ scale: 0.75 }}>
            <IoLogoInstagram style={socialIconStyle} />
          </motion.i>
        </a>
        <a href={data.twitter} target="_blank">
          <motion.i whileTap={{ scale: 0.75 }}>
            <IoLogoTwitter style={socialIconStyle} />
          </motion.i>
        </a>
      </div>

      <motion.i
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
        }}
        whileTap={{ scale: 0.75 }}
        onClick={() => setIsDelete(true)}
      >

        <MdDelete
          className="text-gray-400 hover:text-red-400 text-xl cursor-pointer"
          style={deleteIconHoverStyle}
        />
      </motion.i>

      {isDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          style={deleteOverlayStyle}
        >
          <p
            style={{
              color: "var(--gray-100)",
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete this?
          </p>
          <div style={deleteTextsContainerStyle}>
            <div style={deleteButtonStyle}>
              <p style={{ color: "var(--headingColor)", fontSize: "0.875rem" }}>
                Yes
              </p>
            </div>
            <div
              style={cancelButtonStyle}
              onClick={() => setIsDelete(false)}
            >
              <p style={{ color: "var(--headingColor)", fontSize: "0.875rem" }}>
                No
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardArtist;
