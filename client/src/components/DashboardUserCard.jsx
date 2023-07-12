import React, { useState } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import { changingUserRole, getAllUsers, removeUser } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { MdDelete } from "react-icons/md";

const DashboardUserCard = ({ data, index }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateRole, setIsUpdateRole] = useState(false);

  const [{ allUsers, user }, dispatch] = useStateValue();
  const createdAt = moment(new Date(data.createdAt)).format("MMMM Do YYYY");

  const UpdateUserRole = (userId, role) => {
    setIsLoading(true);
    setIsUpdateRole(false);
    changingUserRole(userId, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    });
  };

  const deleteUser = (userId) => {
    setIsLoading(true);
    removeUser(userId).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    });
  };

  const containerStyle = {
    position: "relative",
    width: "100%",
    borderRadius: "0.375rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0px",
    backgroundColor: "#f3f4f6",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  };

  const deleteIconStyle = {
    position: "absolute",
    left: "0.75rem",
    width: "2rem",
    height: "2rem",
    borderRadius: "0.375rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  };
  
  const imageContainerStyle ={
    width: "275px",
    minWidth: "160px",
    textAlign: "center",
    color: "#1f2937",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.375rem",
  } 
  const imageStyle = {
    width: "2.5rem",
    height: "2.5rem",
    objectFit: "cover",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  };

  const textContainerStyle = {
    width: "275px",
    minWidth: "160px",
    textAlign: "center",
    color: "#1f2937",
  };

  const roleContainerStyle = {
    width: "275px",
    minWidth: "160px",
    textAlign: "center",
    color: "#1f2937",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.375rem",
    position: "relative",
  };

  const roleTextStyle = {
    fontSize: "0.625rem",
    fontWeight: "600",
  };

  const roleUpdateButtonStyle = {
    fontSize: "0.625rem",
    fontWeight: "600",
    padding: "0.25rem 0.5rem",
    backgroundColor: "#d1d5db",
    borderRadius: "0.375rem",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
  };

  const roleUpdateContainerStyle = {
    position: "absolute",
    top: "1.5rem",
    right: "0.75rem",
    borderRadius: "0.375rem",
    padding: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  };

  const roleUpdatePromptStyle = {
    color: "#1f2937",
    fontSize: "0.875rem",
    fontWeight: "600",
  };

  const roleUpdateButtonsContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const roleUpdateYesButtonStyle = {
    outline: "none",
    border: "none",
    fontSize: "0.875rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.375rem",
    backgroundColor: "#60a5fa",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  };

  const roleUpdateNoButtonStyle = {
    outline: "none",
    border: "none",
    fontSize: "0.875rem",
    padding: "0.25rem 0.5rem",
    borderRadius: "0.375rem",
    backgroundColor: "#f9fafb",
    color: "#1f2937",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  };

  const isLoadingOverlayStyle = {
    position: "absolute",
    inset: "0",
    backgroundColor: "#f3f4f6",
    animation: "pulse 2s infinite",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      style={containerStyle}
    >
      {data._id !== user?.user._id && (
        <motion.div
          whileTap={{ scale: 0.75 }}
          style={deleteIconStyle}
          onClick={() => deleteUser(data._id)}
        >
          <MdDelete
            className="text-xl text-red-400 hover:text-red-500"
            style={{ fontSize: "1.25rem" }}
          />
        </motion.div>
      )}
      <div style={imageContainerStyle}>
        <img src={data.imageURL} alt="" style={imageStyle} />
      </div>
      <p style={textContainerStyle}>{data.name}</p>
      <p style={textContainerStyle}>{data.email}</p>
      <p style={textContainerStyle}>
        {data.email_verified ? "True" : "False"}
      </p>
      <p style={textContainerStyle}>{createdAt}</p>
      <div style={roleContainerStyle}>
        <p style={roleTextStyle}>{data.role}</p>
        {data._id !== user?.user._id && (
          <motion.p
            whileTap={{ scale: 0.75 }}
            style={roleUpdateButtonStyle}
            onClick={() => setIsUpdateRole(true)}
          >
            {data.role === "admin" ? "Member" : "Admin"}
          </motion.p>
        )}
        {isUpdateRole && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={roleUpdateContainerStyle}
          >
            <p style={roleUpdatePromptStyle}>
              Are you sure you want to mark the user as{" "}
              <span>{data.role === "admin" ? "Member" : "Admin"}</span>?
            </p>
            <div style={roleUpdateButtonsContainerStyle}>
              <motion.button
                whileTap={{ scale: 0.75 }}
                style={roleUpdateYesButtonStyle}
                onClick={() =>
                  UpdateUserRole(
                    data._id,
                    data.role === "admin" ? "member" : "admin"
                  )
                }
              >
                Yes
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.75 }}
                style={roleUpdateNoButtonStyle}
                onClick={() => setIsUpdateRole(false)}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>

      {isLoading && <div style={isLoadingOverlayStyle}></div>}
    </motion.div>
  );
};

export default DashboardUserCard;
