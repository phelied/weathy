import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";

const Search = () => {
  const [searchData, setSearchData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleClick = () => {};

  const clearInput = () => {
    setSearchData([]);
    setWordEntered("");
  };

  useEffect(() => {
    if (wordEntered !== "") {
      const timer = setTimeout(() => {
        callApi();
      }, 700);

      return () => clearTimeout(timer);
    } else {
      // clearInput();
    }
  }, [wordEntered]);

  const options = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    params: { sort: "elevation", namePrefix: wordEntered, limit: "5" },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_GEO_DB_API_KEY
      ,
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
    },
  };

  const callApi = () => {
    axios
      .request(options)
      .then(function (response) {
        setSearchData(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

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
          {searchData && searchData.length !== 0 && (
            <>
              {searchData.map((data) => (
                <div key={data.city} className="search__select-data-item">
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
