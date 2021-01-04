import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import { FavoriteListProvider } from "./context/FavoriteListContext";
import FavoriteLocations from "./components/favorites/FavoriteLocations";
import Search from "./components/search/Search";

function App() {
  return (
    <div className="App">
      <FavoriteListProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/favorites" component={FavoriteLocations} />
          </Switch>
        </Router>
      </FavoriteListProvider>
    </div>
  );
}

export default App;
