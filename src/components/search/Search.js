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
  width: 350px;
  margin: 5px;
`;

const Input = styled.input`
  width: 350px;
  height: 30px;
  font-size: 15px;
  outline: none;
  border: 2px solid orange;
  border-radius: 3px;
  padding: 10px;
`;

export default Search;
