import React, { useEffect, useState } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { SongCard } from "./DashboardSongs";
import Filter from "./Filter";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const Home = () => {
  const [
    {
      searchTerm,
      isSongPlaying,
      song,
      allSongs,
      artistFilter,
      filterTerm,
      albumFilter,
      languageFilter,
    },
    dispatch,
  ] = useStateValue();

  const [filteredSongs, setFilteredSongs] = useState(null);

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
    if (searchTerm.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(searchTerm) ||
          data.language.toLowerCase().includes(searchTerm) ||
          data.name.toLowerCase().includes(searchTerm) ||
          data.artist.includes(artistFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.artist === artistFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [artistFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.category.toLowerCase() === filterTerm
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [filterTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.album === albumFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [albumFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.language === languageFilter
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [languageFilter]);

  return (
    <div style={{ width: "100%", height: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "rgb(245 243 243)" }}>
      <Header />
      <SearchBar />

      {searchTerm.length > 0 && (
        <p style={{ marginTop: "1rem", marginBottom: "1rem", fontSize: "1rem", color: "#000000" }}>
          Searched for :
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#000000" }}>
            {searchTerm}
          </span>
        </p>
      )}

      <Filter setFilteredSongs={setFilteredSongs} />

      <div style={{ width: "100%", height: "auto", display: "flex", alignItems: "center", justifyContent: "space-evenly", gap: "1rem", flexWrap: "wrap", padding: "1rem" }}>
        <HomeSongContainer musics={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>
  );
};

export const HomeSongContainer = ({ musics }) => {
  const [{ isSongPlaying, song }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
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

  return (
    <>
      {musics?.map((data, index) => (
        <motion.div
          key={data._id}
          whileTap={{ scale: 0.8 }}
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          style={{ position: "relative", width: "10rem", minWidth: "210px", paddingLeft: "0.5rem", paddingRight: "0.5rem", paddingTop: "1rem", paddingBottom: "1rem", cursor: "pointer", boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.2)", backgroundColor: "#f9fafb", borderRadius: "0.3125rem", display: "flex", flexDirection: "column", alignItems: "center" }}
          onClick={() => addSongToContext(index)}
        >
          <div style={{ width: "10rem", minWidth: "160px", height: "10rem", minHeight: "160px", borderRadius: "0.3125rem", overflow: "hidden", position: "relative" }}>
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={data.imageURL}
              alt=""
              style={{ width: "100%", height: "100%", borderRadius: "0.3125rem", objectFit: "cover" }}
            />
          </div>

          <p style={{ fontSize: "1rem", color: "#333333", fontWeight: "bold", marginTop: "0.5rem", marginBottom: "0.25rem", textAlign: "center" }}>
            {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
            <span style={{ display: "block", fontSize: "0.75rem", color: "#808080", marginTop: "0.25rem" }}>
              {data.artist}
            </span>
          </p>
        </motion.div>
      ))}
    </>
  );
};

export default Home;
