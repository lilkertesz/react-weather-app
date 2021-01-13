import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Navbar() {

  return (
    <Header>
      <nav>
        <NavParagraph>
          <NavLink to="/">WEATHER</NavLink> |{" "}
          <NavLink to="/favorites">MY CITIES</NavLink>{" "}
        </NavParagraph>
      </nav>
    </Header>
  );
}

const Header = styled.header`
  background-image: url("https://jooinn.com/images/cloudy-58.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  text-align: center;
  padding: 15px;
  height: 90px;
  &:hover {
    background-color: #cde4fa;
  }
`;

const NavParagraph = styled.p`
  color: orange;
  font-size: 40px;
  text-decoration: none;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #003464;
`;

export default Navbar;
