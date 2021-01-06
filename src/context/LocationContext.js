import React, { useState, createContext } from "react";

export const LocationContext = createContext();

export const LocationProvider = (props) => {
  const [location, setLocation] = useState({
    city: "Budapest",
    country: "HU",
    latitude: 47.4984,
    longitude: 19.0404
  });

  return (
    <LocationContext.Provider value={[location, setLocation]}>
      {props.children}
    </LocationContext.Provider>
  );
};
