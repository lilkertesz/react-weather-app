import Axios from "axios";
import React, { createContext, useState } from "react";

export const FavoriteListContext = createContext();

export const FavoriteListProvider = (props) => {
  const [favorites, setFavorites] = useState([]);

  return (
    <FavoriteListContext.Provider value={[favorites, setFavorites]}>
      {props.children}
    </FavoriteListContext.Provider>
  );
};
