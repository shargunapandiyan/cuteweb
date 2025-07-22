import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./SearchBar.css";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-component-wrapper">
      <div className="input-group">
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control search-input"
          placeholder={placeholder || "Search..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search"
        />
      </div>
    </div>
  );
};
export default SearchBar;
