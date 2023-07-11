import React from "react";
import { IoSearch } from "react-icons/io5";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

const SearchBar = () => {
  const [{ searchTerm }, dispatch] = useStateValue();

  const setSearchTerm = (value) => {
    dispatch({
      type: actionType.SET_SEARCH_TERM,
      searchTerm: value,
    });
  };

  return (
    <div style={{ width: "100%", marginTop: "1rem", height: "4rem", backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", gap: "1rem", padding: "1rem", maxWidth: "66.666667%", backgroundColor: "rgb(245 243 243)", boxShadow: "0 0.125rem 0.25rem rgba(0, 0, 0, 0.2)", marginTop: "3rem", borderRadius: "0.3125rem", display: "flex", alignItems: "center" }}>
        <IoSearch style={{ color: "#333333", fontSize: "1.5rem" }} />
        <input
          type="text"
          value={searchTerm}
          style={{ width: "100%", height: "100%", backgroundColor: "transparent", fontSize: "1rem", color: "#333333", border: "none", outline: "none" }}
          placeholder="Search here ...."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
