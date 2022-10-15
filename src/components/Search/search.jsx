import React, { useState, useEffect } from "react";
import "./search.css";
import API from "../../hooks/utils/API";

const Search = () => {
  const [searchedData, setSearchedData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleClick = () => {};

  const clearInput = () => {
    setSearchedData([]);
    setWordEntered("");
  };

  useEffect(() => {
    if (wordEntered !== "") {
      const timer = setTimeout(() => {
        API.ApiCities().then((data) => setSearchedData(data));
      }, 500);

      return () => clearTimeout(timer);
    } else {
      // clearInput();
    }
  }, [wordEntered]);

  return (
    <div className="search">
      <div className="search__block">
        <span className="search__block-title">SEARCH</span>
        <input
          type="text"
          className="search__block-input"
          value={wordEntered}
          onChange={(e) => setWordEntered(e.target.value.trim())}
        />
        <div className="search__select-data">
          {searchedData && searchedData.length !== 0 && (
            <>
              {searchedData.map((data, index) => (
                <div key={data.city + index} className="search__select-data-item">
                  {data.city}, <span>{data.country}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
