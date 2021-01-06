import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { FavoriteListContext } from "../../context/FavoriteListContext";
import SearchAutocomplete from "./SearchAutocomplete";

const Search = () => {
  const [favorites, setFavorites] = useContext(FavoriteListContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_FAVORITES_URL}`).then((res) => {
      setFavorites(res.data.map((item) => item.city));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
