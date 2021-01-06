import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { FavoriteListContext } from "../../context/FavoriteListContext";
import SearchAutocomplete from "./SearchAutocomplete";
import { LocationContext } from "../../context/LocationContext";

const Search = () => {
  const [favorites, setFavorites] = useContext(FavoriteListContext);
  const [city, setCity] = useState("budapest");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_FAVORITES_URL}`).then((res) => {
      setFavorites(res.data.map((item) => item.city));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = () => {
    setCity(searchTerm.toLowerCase());
    setSearchTerm("");
  };

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      submitHandler();
    }
  };

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
        onKeyDown={keyDownHandler}
      />
      <SearchButton onClick={submitHandler}>
        <i className="fa fa-search" />
      </SearchButton>
      <SearchAutocomplete
        searchedCity={searchTerm}
        setSearchedCity={setCity}
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

const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 15px;
  background-color: #b5c4d6;
  color: #fff;
  border: 1px solid #b5c4d6;
  outline: none;
  cursor: pointer;
`;

export default Search;
