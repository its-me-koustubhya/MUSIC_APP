import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

const FilterButtons = ({ filterData, flag }) => {
  const [filterName, setFilterName] = useState(null);
  const [filterMenu, setFilterMenu] = useState(false);

  const [{ artistFilter, albumFilter, filterTerm }, dispatch] = useStateValue();

  const updateFilterButton = (name) => {
    setFilterName(name);
    setFilterMenu(false);

    if (flag === "Artist") {
      dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: name });
    }
    if (flag === "Language") {
      dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: name });
    }

    if (flag === "Albums") {
      dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: name });
    }

    if (flag === "Category") {
      dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: name });
    }
  };

  return (
    <div
      style={{
        border: "1px solid #CBD5E0",
        borderRadius: "0.375rem",
        padding: "0.5rem 1rem",
        position: "relative",
        cursor: "pointer",
        transition: "border-color 0.2s ease-in-out",
      }}
    >
      <p
        style={{
          fontSize: "1rem",
          letterSpacing: "0.025em",
          color: "#4B5563",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom:"0"
        }}
        onClick={() => setFilterMenu(!filterMenu)}
      >
        {!filterName && flag}
        {filterName && (
          <>
            {filterName.length > 15
              ? `${filterName.slice(0, 14)}...`
              : filterName}
          </>
        )}
        <IoChevronDown
          style={{
            fontSize: "1rem",
            color: "#4B5563",
            transition: "transform 0.2s ease-in-out",
            transform: filterMenu ? "rotate(180deg)" : "rotate(0)",
          }}
        />
      </p>
      {filterData && filterMenu && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          style={{
            width: "12rem",
            zIndex: 50,
            backdropFilter: "blur(4px)",
            maxHeight: "11rem",
            overflowY: "scroll",
            scrollbarWidth: "thin",
            scrollbarColor: "#CBD5E0 #A0AEC0",
            padding: "0.25rem",
            display: "flex",
            flexDirection: "column",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            position: "absolute",
            top: "2rem",
            left: 0,
          }}
        >
          {filterData?.map((data) => (
            <div
              key={data.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.25rem 1rem",
                borderRadius: "0.375rem",
                cursor: "pointer",
                transition: "background-color 0.2s ease-in-out",
              }}
              onClick={() => updateFilterButton(data.name)}
            >
              {(flag === "Artist" || flag === "Albums") && (
                <img
                  src={data.imageURL}
                  style={{
                    width: "2rem",
                    minWidth: "32px",
                    height: "2rem",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              )}
              <p
                style={{
                  width: "100%",
                }}
              >
                {data.name.length > 15
                  ? `${data.name.slice(0, 14)}...`
                  : data.name}
              </p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FilterButtons;
