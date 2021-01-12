import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import FavoriteLocations from "./components/favorites/FavoriteLocations";
import Weather from "./components/weather/Weather";
import { LocationProvider } from "./context/LocationContext";

function App() {
  return (
    <div className="App">
        <LocationProvider>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Weather} />
              <Route path="/favorites" component={FavoriteLocations} />
            </Switch>
          </Router>
        </LocationProvider>
    </div>
  );
}

export default App;
