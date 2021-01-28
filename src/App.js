import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import FavoriteLocations from "./components/favorites/FavoriteLocations";
import Weather from "./components/weather/Weather";
import { LocationProvider } from "./context/LocationContext";
import RegistrationTab from "./components/registration/Tab";

function App() {
  return (
    <div className="App">
        <LocationProvider>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Weather} />
              <Route path="/favorites" component={FavoriteLocations} />
              <Route path="/registration" component={RegistrationTab} />
            </Switch>
          </Router>
        </LocationProvider>
    </div>
  );
}

export default App;
