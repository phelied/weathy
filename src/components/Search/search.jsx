import React, { useState } from "react";
import "./search.css";

const Search = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    // const newFilter = ["me", "moi"].filter((value) => {
    //   return value.title.toLowerCase().includes(searchWord.toLowerCase());
    // });
    console.log(searchWord);

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      //   setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="search__block">
        <span className="search__block-title">Search your city</span>
        <input
          type="text"
          className="search__block-input"
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
    </div>
  );
};

export default Search;
