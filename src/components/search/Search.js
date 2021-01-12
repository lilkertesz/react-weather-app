import React, { useState } from "react";
import styled from "styled-components";
import SearchAutocomplete from "./SearchAutocomplete";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const inputFieldChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <SearchBar className="search">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={inputFieldChangeHandler}
      />
      <SearchAutocomplete
        searchedCity={searchTerm}
        setInputText={setSearchTerm}
      />
    </SearchBar>
  );
};

const SearchBar = styled.div`
  width: 400px;
  margin: auto;
  position: relative;
`;

const Input = styled.input`
  width: 360px;
  height: 40px;
  font-size: 15px;
  outline: none;
  border: 2px solid #b5c4d6;
  padding: 10px;
  margin-top: 0;
`;

export default Search;
