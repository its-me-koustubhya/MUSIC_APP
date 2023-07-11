import React, { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { motion } from "framer-motion";
import { getAllUsers } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import DashboardUserCard from "./DashboardUserCard";

const DashboardUser = () => {
  const [emailFilter, setEmailFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const [filtereUsers, setFiltereUsers] = useState(null);

  const [{ allUsers }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (emailFilter) {
      const filtered = allUsers.filter(
        // prettier-ignore
        (data) =>  data.email.includes(emailFilter) || data.name.includes(emailFilter) || data.role.includes(emailFilter)
      );
      setFiltereUsers(filtered);
    }
  }, [emailFilter]);

  const containerStyle = {
    width: "100%",
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  const searchContainerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "24px",
  };

  const inputStyle = {
    padding: "8px 16px",
    border: isFocus ? "1px solid gray" : "1px solid #ccc",
    borderRadius: "4px",
    background: "transparent",
    outline: "none",
    transition: "all 150ms ease-in-out",
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--textColor)",
  };

  const clearIconStyle = {
    opacity: 0,
  };

  if (emailFilter) {
    clearIconStyle.opacity = 1;
  }

  const clearIconHoverStyle = {
    scale: 0.75,
  };

  const countContainerStyle = {
    position: "absolute",
    top: "4px",
    left: "4px",
  };

  const countTextStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "var(--textColor)",
  };

  const userListContainerStyle = {
    position: "relative",
    width: "100%",
    padding: "48px 16px",
    marginTop: "16px",
    minHeight: "400px",
    overflowX: "scroll",
    border: "1px solid #ccc",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "3px",
  };

  const headerContainerStyle = {
    width: "100%",
    minWidth: "750px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const columnHeaderStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    color: "var(--textColor)",
    width: "275px",
    minWidth: "160px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search here"
          style={inputStyle}
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />

        {emailFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setEmailFilter("");
              setFiltereUsers(null);
            }}
            style={clearIconStyle}
          >
            <AiOutlineClear
              className="text-3xl text-textColor cursor-pointer"
              style={clearIconHoverStyle}
            />
          </motion.i>
        )}
      </div>

      <div style={userListContainerStyle}>
        <div style={countContainerStyle}>
          <p style={countTextStyle}>
            <span style={{ fontSize: "14px", fontWeight: "600" }}>
              Count :{" "}
            </span>
            {filtereUsers ? filtereUsers?.length : allUsers?.length}
          </p>
        </div>

        <div style={headerContainerStyle}>
          <p style={columnHeaderStyle}>Image</p>
          <p style={columnHeaderStyle}>Name</p>
          <p style={columnHeaderStyle}>Email</p>
          <p style={columnHeaderStyle}>Verified</p>
          <p style={columnHeaderStyle}>Created</p>
          <p style={columnHeaderStyle}>Role</p>
        </div>

        {allUsers && !filtereUsers
            ? allUsers?.map((data, i) => (
                <DashboardUserCard data={data} key={data._id} index={i} />
              ))
            : filtereUsers?.map((data, i) => (
                <DashboardUserCard data={data} key={data._id} index={i} />
              ))}
      </div>
    </div>
  );
};

export default DashboardUser;
