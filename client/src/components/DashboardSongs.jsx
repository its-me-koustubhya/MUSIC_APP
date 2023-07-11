import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClear } from "react-icons/ai";
import { deleteSongById, getAllSongs } from "../api";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState(null);

  const [{ allSongs }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (songFilter.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(songFilter) ||
          data.language.toLowerCase().includes(songFilter) ||
          data.name.toLowerCase().includes(songFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [songFilter]);

  return (
    <div style={{ width: "100%", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", gap: "6rem" }}>
        <NavLink
          to={"/dashboard/newSong"}
          style={{ display: "flex", alignItems: "center", padding: "12px 16px", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", textDecoration: "none" }}
        >
          <IoAdd />
        </NavLink>
        <input
          type="text"
          placeholder="Search here"
          style={{
            width: "52px",
            padding: "8px 16px",
            border: isFocus ? "1px solid #999" : "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "transparent",
            outline: "none",
            transition: "all 0.15s ease-in-out",
            fontSize: "16px",
            fontWeight: "600",
            color: "var(--textColor)",
          }}
          value={songFilter}
          onChange={(e) => setSongFilter(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
        />

        {songFilter && (
          <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.75 }}
            onClick={() => {
              setSongFilter("");
              setFilteredSongs(null);
            }}
          >
            <AiOutlineClear style={{ fontSize: "24px", color: "var(--textColor)", cursor: "pointer" }} />
          </motion.i>
        )}
      </div>

      <div style={{ position: "relative", width: "100%", margin: "16px 0px", padding: "48px 16px", border: "1px solid #ccc", borderRadius: "4px" }}>
        <div style={{ position: "absolute", top: "4px", left: "4px" }}>
          <p style={{ fontSize: "16px", fontWeight: "bold",margin:"16px 0", color: "var(--textColor)" }}>
            <span style={{ fontSize: "12px", fontWeight: "600",lineHeight:"1.25rem", color: "var(--textColor)" }}>Count :</span>
            {filteredSongs ? filteredSongs.length : allSongs.length}
          </p>
        </div>

        <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>
  );
};

export const SongContainer = ({ data }) => {
  return (
    <div style={{ width: "100%", display: "flex", flexWrap: "wrap", gap: "3px", alignItems: "center", justifyContent: "space-evenly" }}>
      {data &&
        data.map((song, i) => (
          <SongCard key={song._id} data={song} index={i} />
        ))}
    </div>
  );
};

export const SongCard = ({ data, index }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();

  const addSongToContext = () => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };

  const deleteObject = (id) => {
    console.log(id);
    deleteSongById(id).then((res) => {
      // console.log(res.data);
      if (res.data.success) {
        setAlert("success");
        setAlertMsg(res.data.msg);
        getAllSongs().then((data) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.data,
          });
        });
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      } else {
        setAlert("error");
        setAlertMsg(res.data.msg);
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      }
    });
  };
  return (
    <motion.div
      whileTap={{ scale: 0.8 }}
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      style={{ position: "relative", width: "40px", minWidth: "210px", padding: "2px", paddingTop: "4px", cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", backgroundColor: "#f7fafc", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center" }}
      onClick={addSongToContext}
    >
      {isDeleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          style={{ position: "absolute", zIndex: "10", padding: "8px", top: "0", left: "0", right: "0", bottom: "0", backgroundColor: "#f7fafc", backdropFilter: "blur(4px)", display: "flex", flexDirection: "column", gap: "6px", alignItems: "center", justifyContent: "center" }}
        >
          <p style={{ fontSize: "14px", textAlign: "center", color: "var(--textColor)", fontWeight: "600" }}>
            Are you sure do you want to delete this song?
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <button
              style={{ fontSize: "14px", padding: "4px", borderRadius: "4px", color: "#fff", cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", backgroundColor: "#38a169", border: "none" }}
              onClick={() => deleteObject(data._id)}
            >
              Yes
            </button>
            <button
              style={{ fontSize: "14px", padding: "4px", borderRadius: "4px", color: "#fff", cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", backgroundColor: "#9ca3af", border: "none" }}
              onClick={() => setIsDeleted(false)}
            >
              No
            </button>
          </div>
        </motion.div>
      )}

      <div style={{ width: "40px", minWidth: "160px", height: "40px", minHeight: "160px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", position: "relative", overflow: "hidden" }}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={data.imageURL}
          alt=""
          style={{ width: "100%", height: "100%", borderRadius: "8px", objectFit: "cover" }}
        />
      </div>

      <p style={{ fontSize: "16px", color: "var(--headingColor)", fontWeight: "600", marginTop: "2px", marginBottom: "2px" }}>
        {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
        <span style={{ display: "block", fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>{data.artist}</span>
      </p>

      <div style={{ width: "100%", position: "absolute", bottom: "2px", right: "2px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px" }}>
        <motion.i whileTap={{ scale: 0.75 }} onClick={() => setIsDeleted(true)}>
          <IoTrash style={{ fontSize: "16px", color: "#e53e3e", cursor: "pointer" }} />
        </motion.i>
      </div>

      {alert && (
        <>
          {alert === "success" ? (
            <AlertSuccess msg={alertMsg} />
          ) : (
            <AlertError msg={alertMsg} />
          )}
        </>
      )}
    </motion.div>
  );
};

export default DashboardSongs;
