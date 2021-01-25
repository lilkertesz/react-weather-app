import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faUser } from '@fortawesome/free-solid-svg-icons'
import Search from "../search/Search";

function Navbar() {

  return (
    <Header>
      <FontAwesomeIcon icon={faSun} /> {" "}
      <NavLink to="/">WEATHER</NavLink> 
      {/* |{" "} */}
      {/* <NavLink to="/favorites">WATCHLIST</NavLink>{" "} */}
      <NavRight>
        <Search/>
        <div style={{margin: "10px", fontSize:"15px"}}>
          <FontAwesomeIcon icon={faUser} /> {" "}
          <span>
          <NavLink to="/registration">Sign up / Login</NavLink>
          </span>
        </div>
      </NavRight>
    </Header>
  );
}

const Header = styled.div`
  background-color: #003464;
  padding: 15px;
  height: 70px;
  overflow: hidden;
  color: orange;
  font-size: 35px;
  text-decoration: none;
`;

const NavRight = styled.div`
  float: right;
  display: flex;
  font-size: 25px;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default Navbar;
