import React, { useEffect, useState } from "react";
import { useStateValue } from "../Context/StateProvider";
import { IoMdClose } from "react-icons/io";
import { IoArrowRedo, IoArrowUndo, IoMusicalNote } from "react-icons/io5";
import { motion } from "framer-motion";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { actionType } from "../Context/reducer";
import { MdPlaylistPlay } from "react-icons/md";
import { getAllSongs } from "../api";
import { RiPlayListFill } from "react-icons/ri";

const MusicPlayer = () => {
  const [isPlayList, setIsPlayList] = useState(false);
  const [{ allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
    useStateValue();

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    if (miniPlayer) {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: false,
      });
    } else {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: true,
      });
    }
  };

  const nextTrack = () => {
    if (song > allSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song + 1,
      });
    }
  };

  const previousTrack = () => {
    if (song === 0) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song - 1,
      });
    }
  };

  useEffect(() => {
    if (song > allSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
    }
  }, [song]);

  return (
    <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "0.75rem", overflow: "hidden" }}>
      <div style={{ width: "100%", display: miniPlayer ? "none" : "flex", alignItems: "center", gap: "0.75rem", padding: "1rem", position: miniPlayer ? "absolute" : "relative", top: miniPlayer ? "40rem" : "unset" }}>
        <img src={allSongs[song]?.imageURL} style={{ width: "10rem", height: "5rem", objectFit: "cover", borderRadius: "0.3125rem" }} alt="" />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <p style={{ fontSize: "1.5rem", color: "#333333", fontWeight: "bold" }}>
            {allSongs[song]?.name.length > 20 ? allSongs[song]?.name.slice(0, 20) : allSongs[song]?.name}{" "}
            <span style={{ fontSize: "16rem", color: "#808080" }}>({allSongs[song]?.album})</span>
          </p>
          <p style={{ color: "#808080" }}>
            {allSongs[song]?.artist}{" "}
            <span style={{ fontSize: "0.875rem", color: "#808080", fontWeight: "bold" }}>({allSongs[song]?.category})</span>
          </p>
          <motion.i whileTap={{ scale: 0.8 }} onClick={() => setIsPlayList(!isPlayList)}>
            <RiPlayListFill style={{ color: "#333333", fontSize: "1.5rem", cursor: "pointer" }} />
          </motion.i>
        </div>
        <div style={{ flex: "1" }}>
          <AudioPlayer
            src={allSongs[song]?.songUrl}
            onPlay={() => console.log("is playing")}
            autoPlay={true}
            showSkipControls={true}
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "0.75rem" }}>
          <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
            <IoMdClose style={{ color: "#333333", fontSize: "1.25rem", cursor: "pointer" }} />
          </motion.i>
          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
            <IoArrowRedo style={{ color: "#333333", fontSize: "1.25rem", cursor: "pointer" }} />
          </motion.i>
        </div>
      </div>

      {isPlayList && (
        <>
          <PlayListCard />
        </>
      )}

      {miniPlayer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ position: "fixed", right: "2rem", bottom: "2rem" }}
        >
          <div style={{ width: "10rem", height: "10rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ position: "absolute", inset: "0", borderRadius: "50%", backgroundColor: "#ff0000", filter: "blur(8px)", animation: "pulse 1s infinite" }}></div>
            <img onClick={togglePlayer} src={allSongs[song]?.imageURL} style={{ zIndex: "50", width: "8rem", height: "8rem", borderRadius: "50%", objectFit: "cover", cursor: "pointer" }} alt="" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const PlayListCard = () => {
  const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();
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

  const setCurrentPlaySong = (songindex) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== songindex) {
      dispatch({
        type: actionType.SET_SONG,
song: songindex,
      });
    }
  };

  return (
    <div style={{ position: "absolute", left: "1rem", bottom: "24rem", gap: "0.5rem", padding: "0.5rem", width: "17.5rem", maxWidth: "350px", height: "23.5rem", maxHeight: "510px", display: "flex", flexDirection: "column", overflowY: "scroll", scrollbarWidth: "thin", borderRadius: "0.3125rem", boxShadow: "0.125rem 0.25rem rgba(0, 0, 0, 0.2)", backgroundColor: "#ff0000" }}>
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`group p-4 hover:bg-card flex gap-3 items-center cursor-pointer ${music?._id === song._id ? "bg-card" : "bg-transparent"}`}
            onClick={() => setCurrentPlaySong(index)}
          >
            <IoMusicalNote style={{ color: "#333333", fontSize: "1.5rem", cursor: "pointer" }} />

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <p style={{ fontSize: "1.25rem", color: "#333333", fontWeight: "bold" }}>
                {music?.name.length > 20 ? music?.name.slice(0, 20) : music?.name}{" "}
                <span style={{ fontSize: "1rem", color: "#808080" }}>({music?.album})</span>
              </p>
              <p style={{ color: "#808080" }}>
                {music?.artist}{" "}
                <span style={{ fontSize: "0.875rem", color: "#808080", fontWeight: "bold" }}>({music?.category})</span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default MusicPlayer;
