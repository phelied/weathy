import React, { useState, useEffect } from "react";
import "../styles/search.css";
import API from "../../hooks/utils/API";

const Search = () => {
  const [searchedData, setSearchedData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleClick = (latitude, longitude) => {
    API.ApiWeather(latitude, longitude).then((data) => setWeatherData(data));
    console.log(weatherData);
  };

  useEffect(() => {
    if (wordEntered !== "") {
      const timer = setTimeout(() => {
        API.ApiListCities(wordEntered).then((data) => setSearchedData(data));
      }, 500);

      return () => clearTimeout(timer);
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
                <div
                  key={data.city + index}
                  className="search__select-data-item"
                  onClick={() => handleClick(data.latitude, data.longitude)}
                >
                  {capitalizeFirstLetter(data.city)},{" "}
                  <span>{data.country}</span>
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
