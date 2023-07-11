import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";
import { getAllAlbums, getAllArtist, getAllSongs, getAllUsers } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { bgColors } from "../utils/styles";

const DashboardCard = ({ icon, name, count }) => {
  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];

  const cardStyle = {
    background: bg_color,
    padding: "1rem",
    width: "10rem",
    gap: "0.75rem",
    height: "auto",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    color: "var(--textColor)",
    fontWeight: "bold",
  };

  const countStyle = {
    fontSize: "0.875rem",
    color: "var(--textColor)",
  };

  return (
    <div style={cardStyle}>
      {icon}
      <p style={titleStyle}>{name}</p>
      <p style={countStyle}>{count}</p>
    </div>
  );
};

const DashBoardHome = () => {
  const [{ allUsers, allSongs, artists, allAlbums }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }

    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }

    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, []);

  const containerStyle = {
    width: "100%",
    padding: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  };

  return (
    <div style={containerStyle}>
      <DashboardCard
        icon={<FaUsers style={{ fontSize: "1.875rem", color: "var(--textColor)" }} />}
        name={"Users"}
        count={allUsers?.length > 0 ? allUsers?.length : 0}
      />

      <DashboardCard
        icon={<GiLoveSong style={{ fontSize: "1.875rem", color: "var(--textColor)" }} />}
        name={"Songs"}
        count={allSongs?.length > 0 ? allSongs?.length : 0}
      />

      <DashboardCard
        icon={<RiUserStarFill style={{ fontSize: "1.875rem", color: "var(--textColor)" }} />}
        name={"Artist"}
        count={artists?.length > 0 ? artists?.length : 0}
      />

      <DashboardCard
        icon={<GiMusicalNotes style={{ fontSize: "1.875rem", color: "var(--textColor)" }} />}
        name={"Album"}
        count={allAlbums?.length > 0 ? allAlbums?.length : 0}
      />
    </div>
  );
};

export default DashBoardHome;
