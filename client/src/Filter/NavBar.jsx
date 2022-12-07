import React from "react";
// import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../RoutingMethod/nav.css";

const NavBar = () => {
  return (
    <>
      <div className="nav">
        <NavLink exact activeclassname="active" to="">
          Home
        </NavLink>
        <NavLink exact activeclassname="active" to="contact">
          Contact
        </NavLink>
        <NavLink exact activeclassname="active" to="service">
          Services
        </NavLink>
        <NavLink exact activeclassname="active" to="Search">
          Search
        </NavLink>
       
      </div>
      {/* <br />
      <a href="/">Home</a>
      <a href="/contact">Contact</a> */}
    </>
  );
};

export default NavBar;
