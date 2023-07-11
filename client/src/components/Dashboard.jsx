import React from "react";
import { IoHome } from "react-icons/io5";
import { NavLink, Route, Routes } from "react-router-dom";
import { DashboardNewSong } from ".";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import DashboardAlbum from "./DashboardAlbum";
import DashboardArtist from "./DashboardArtist";
import DashBoardHome from "./DashBoardHome";
import DashboardSongs from "./DashboardSongs";
import DashboardUser from "./DashboardUser";
import Header from "./Header";

const Dashboard = () => {
  const containerStyle = {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--primary)",
  };

  const linkContainerStyle = {
    width: "60%",
    marginTop: "8px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  };

  return (
    <div style={containerStyle}>
      <Header />

      <div style={linkContainerStyle}>
        <NavLink to="/dashboard/home"><IoHome className="text-2xl text-textColor" /></NavLink>
        <NavLink to="/dashboard/user" style={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}>Users</NavLink>
        <NavLink to="/dashboard/songs" style={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}>Songs</NavLink>
        <NavLink to="/dashboard/artist" style={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}>Artist</NavLink>
        <NavLink to="/dashboard/albums" style={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}>Albums</NavLink>
      </div>

      <div style={{ width: "100%", padding: "1rem" }}>
        <Routes>
          <Route path="/home" element={<DashBoardHome />} />
          <Route path="/user" element={<DashboardUser />} />
          <Route path="/songs" element={<DashboardSongs />} />
          <Route path="/artist" element={<DashboardArtist />} />
          <Route path="/albums" element={<DashboardAlbum />} />
          <Route path="/newSong" element={<DashboardNewSong />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
