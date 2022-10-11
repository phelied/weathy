import React, { useState } from "react";

const Search = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    // const newFilter = ["me", "moi"].filter((value) => {
    //   return value.title.toLowerCase().includes(searchWord.toLowerCase());
    // });
    console.log(searchWord)

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
    <div>
      <span>Search your city</span>
      <input
        type="text"
  
        value={wordEntered}
        onChange={handleFilter}
      />
    </div>
  );
};

export default Search;
