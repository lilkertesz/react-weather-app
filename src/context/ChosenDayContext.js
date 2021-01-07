import React, { useState, createContext } from "react";

export const ChosenDayContext = createContext();

export const ChosenDayProvider = (props) => {
  const [chosenDay, setChosenDay] = useState();

  return (
    <ChosenDayContext.Provider value={[chosenDay, setChosenDay]}>
      {props.children}
    </ChosenDayContext.Provider>
  );
};
