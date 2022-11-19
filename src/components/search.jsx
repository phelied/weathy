import React, { useState, useEffect } from "react";
import "../assets/styles/search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import API from "../hooks/utils/API";

const Search = ({ getWeatherData }) => {
  const [isActive, setActive] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [city, setCity] = useState("");

  const clearInput = () => {
    setSearchedData([]);
    setWordEntered("");
  };

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const askLocalisationUser = () => {
    if (navigator.geolocation) {
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              navigator.geolocation.getCurrentPosition(getLocalisationUser);
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(
                getLocalisationUser,
                errorsLocalisationUser
              );
            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
            }
          });
      } else {
        // safari doesn't support permissions.query
        navigator.geolocation.getCurrentPosition(getLocalisationUser);
      }
    } else {
      alert("Sorry Not available!");
    }
  };

  function getLocalisationUser() {
    navigator.geolocation.getCurrentPosition(function (position) {
      API.ApiGetCityFromLocation(
        position.coords.latitude,
        position.coords.longitude
      ).then((cityName) => {
        setCity(cityName);
      });
      API.ApiWeather(position.coords.latitude, position.coords.longitude).then(
        (data) => {
          getWeatherData(data, city);
        }
      );
    });
  }

  function errorsLocalisationUser(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const handleToggle = () => {
    setActive(!isActive);
  };

  const handleClick = (cityName, latitude, longitude) => {
    API.ApiWeather(latitude, longitude).then((data) => {
      getWeatherData(data, cityName);
      clearInput();
    });
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
    <div className="container-search">
      <nav className="navbar">
        <div className="search-box">
          {isActive ? (
            <>
              <button
                className="btn-search-open btn-search"
                onClick={handleToggle}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
              <input
                type="text"
                className="input-search-open input-search search__block-input"
                value={wordEntered}
                placeholder="Search for a city"
                onChange={(e) => setWordEntered(e.target.value.trim())}
              />{" "}
            </>
          ) : (
            <>
              <button
                onClick={askLocalisationUser}
                className="btn-search btn-localisation"
              >
                <FontAwesomeIcon icon={faLocationDot} />
              </button>
              <button onClick={handleToggle} className="btn-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>

              <input
                type="text"
                className="input-search"
                value={wordEntered}
                onChange={(e) => setWordEntered(e.target.value.trim())}
              />
            </>
          )}
        </div>
      </nav>
      {searchedData && searchedData.length !== 0 && (
        <div className="search__select-data">
          {searchedData.map((data) => (
            <div
              key={data.city}
              className="search__select-data-item"
              onClick={() =>
                handleClick(data.city, data.latitude, data.longitude)
              }
              role="button"
            >
              {capitalizeFirstLetter(data.city)}, <span>{data.country}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
