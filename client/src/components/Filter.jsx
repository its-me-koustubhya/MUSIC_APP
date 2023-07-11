import React, { useEffect } from "react";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { getAllAlbums, getAllArtist } from "../api";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import FilterButtons from "./FilterButtons";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";

const Filter = ({ setFilteredSongs }) => {
  const [{ filterTerm, artists, allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
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

  const updateFilter = (value) => {
    dispatch({
      type: actionType.SET_FILTER_TERM,
      filterTerm: value,
    });
  };

  const clearAllFilter = () => {
    setFilteredSongs(null);
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
  };

  const containerStyle = {
    width: "100%",
    marginTop: "1rem",
    paddingTop:"1.5rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    paddingBottom: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2.5rem",
  };

  const textButtonStyle = {
    marginBottom:"0",
    fontSize: "1rem",
    cursor: "pointer",
    color: "#4b5563",
    transition: "all 0.2s ease-in-out",
  };

  const activeTextButtonStyle = {
    marginBottom:"0",
    fontWeight: "600",
  };

  const clearAllButtonStyle = {
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#4b5563",
  };

  return (
    <div style={containerStyle}>
      <FilterButtons filterData={artists} flag={"Artist"} />

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {filters?.map((data) => (
          <p
            key={data.id}
            onClick={() => updateFilter(data.value)}
            style={{
              ...textButtonStyle,
              ...(data.value === filterTerm && activeTextButtonStyle),
            }}
          >
            {data.name}
          </p>
        ))}
      </div>

      <FilterButtons filterData={allAlbums} flag={"Albums"} />

      <FilterButtons filterData={filterByLanguage} flag={"Language"} />

      <motion.i
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.75 }}
        onClick={clearAllFilter}
        style={clearAllButtonStyle}
      >
      <MdClearAll
        style={{
          color: "#4b5563",
          fontSize: "1.5rem",
          cursor: "pointer"
        }}
      />

      </motion.i>
    </div>
  );
};

export default Filter;
