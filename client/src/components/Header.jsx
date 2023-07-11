import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../assets/img";
import { useStateValue } from "../Context/StateProvider";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase_config";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };

  return (
    <header style={{ display: "flex", alignItems: "center", width: "100%", padding: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
      <NavLink to={"/"} style={{ marginRight: "0.875rem" }}>
        <img src={Logo} style={{ width: "4rem" }} alt="" />
      </NavLink>

      <ul style={{ display: "flex", alignItems: "center",listStyle:"none", justifyContent: "center", marginLeft: "1.25rem" }}>
        <li style={{ marginRight: "1.25rem" }}>
          <NavLink
            to={"/home"}
            style={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}
          >
            Home
          </NavLink>
        </li>
        <li style={{ marginRight: "1.25rem" }}>
          <NavLink
            to={"/musics"}
            style={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}
          >
            Musics
          </NavLink>
        </li>
        <li style={{ marginRight: "1.25rem" }}>
          <NavLink
            to={"/premium"}
            style={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}
          >
            Premium
          </NavLink>
        </li>
        <li style={{ marginRight: "1.25rem", }}>
          <NavLink
            to={"/contact"}
            style={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}
          >
            Contact
          </NavLink>
        </li>
      </ul>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
          cursor: "pointer",
          gap: "0.5rem",
          position: "relative",
        }}
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
      >
        <img
          style={{ width: "3rem", minWidth: "44px", objectFit: "cover", borderRadius: "50%", boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.2)" }}
          src={user?.user?.imageURL}
          alt=""
          referrerpolicy="no-referrer"
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ color: "#000000", fontSize: "1.125rem", fontWeight: "bold", marginTop: "1.125rem",marginBottom:"0" }}>
            {user?.user.name}
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: "0.125rem", color: "#808080", fontSize: "0.75rem", fontWeight: "normal" }}>
            Premium Member. <FaCrown style={{ fontSize: "0.875rem", marginLeft: "-0.0625rem", color: "#ffd700" }} />
          </p>
        </div>

        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: "absolute",
              top: "4rem",
              right: "0.4rem",
              width: "16rem",
              padding: "1rem",
              gap: "0",
              backgroundColor: "#ffffff",
              boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)",
              borderRadius: "0.5125rem",
              backdropFilter: "blur(4px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <NavLink to={"/userProfile"}>
              <p style={{ fontSize: "1rem", color: "#000000", transition: "all 0.15s ease-in-out", marginBottom:"0.2rem" }}>Profile</p>
            </NavLink>
            <p style={{ fontSize: "1rem", color: "#000000", transition: "all 0.15s ease-in-out", marginBottom:"0.2rem" }}>My Favourites</p>
            <hr style={{margin:"0.2rem"}} />
            {user?.user.role === "admin" && (
              <>
                <NavLink to={"/dashboard/home"}>
                  <p style={{ fontSize: "1rem", color: "#000000", transition: "all 0.15s ease-in-out", marginBottom:"0.2rem" }}>Dashboard</p>
                </NavLink>
                <hr style={{margin:"0.2rem"}}/>
              </>       
            )}
            
            <p
              style={{ fontSize: "1rem", color: "#000000", transition: "all 0.15s ease-in-out", cursor: "pointer", marginBottom:"0.2rem" }}
              onClick={logout}
            >
              Sign out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
