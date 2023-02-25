import React, { useState, useEffect } from "react";
import "../assets/styles/search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import API from "../hooks/utils/API";

const Search = ({ getWeatherData }) => {
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
    clearInput();
  }, [wordEntered]);

  return (
    <div className="w-full">
      <nav className="flex">
        <input
          type="text"
          className=" h-10 w-full p-1.5 rounded bg-[#F5F5F5] text-[#1A2840] placeholder-[#1A2840]"
          placeholder="Search city ... "
          value={wordEntered}
          onChange={(e) => setWordEntered(e.target.value.trim())}
        />
        <div className="absolute left-[76%] text-xl mt-1">
          <button onClick={askLocalisationUser} className="">
            <FontAwesomeIcon className="mr-2.5" icon={faLocationDot} />
          </button>
          <FontAwesomeIcon
            className="text-[#FDAA67]"
            icon={faMagnifyingGlass}
          />
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
