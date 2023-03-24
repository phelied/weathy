import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import API from "../utils/API";
import Geolocalisation from "./geolocalisation";

const Search = ({ getWeatherData }) => {
  const [searchedData, setSearchedData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const clearInput = () => {
    setSearchedData([]);
    setWordEntered("");
  };

  const capitalizeFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleClick = (cityName, latitude, longitude) => {
    clearInput();
    API.ApiWeather(latitude, longitude).then((data) => {
      data.name = cityName;
      getWeatherData(data);
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
    <SearchContainer data-testid="search-container">
      <input
        type="text"
        className=" h-10 w-full p-1.5 rounded bg-[#F5F5F5] text-[#1A2840] placeholder-[#1A2840]"
        placeholder="Search city ..."
        value={wordEntered}
        data-testid="search-input"
        onChange={(e) => setWordEntered(e.target.value.trim())}
      />
      <IconContainer>
        <div>
          <Geolocalisation getWeatherData={getWeatherData} />
          <FontAwesomeIcon
            className="text-[#FDAA67]"
            icon={faMagnifyingGlass}
            data-testid="font-awesome-icon"
          />
        </div>
      </IconContainer>
      {searchedData && (
        <SelectData searchedData={searchedData}>
          {searchedData.map((data) => (
            <span
              key={data.city}
              className="search__select-data-item"
              onClick={() =>
                handleClick(data.city, data.latitude, data.longitude)
              }
              tabIndex={0}
              data-testid="searched-data-item"
              aria-hidden="true"
            >
              {capitalizeFirstLetter(data.city)}, {data.country}
            </span>
          ))}
        </SelectData>
      )}
    </SearchContainer>
  );
};

const SelectData = styled.span`
  display: ${({ searchedData }) =>
    searchedData && searchedData.length !== 0 ? "block" : "none"};
  background-color: #fff;
  border-radius: 0.375rem;
  box-sizing: border-box;
  z-index: 1;
  position: absolute;
  width: 100%;
  margin-top: 0.25rem;
  .search__select-data-item {
    display: flex;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #f2f2f2;
    }
    span {
      margin-left: 5px;
    }
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin-top: 0.25rem;

  & div {
    position: absolute;
    top: 15%;
    right: 2.5%;
  }
`;

export default Search;
