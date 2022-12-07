import React from "react";
import { NavLink } from "react-router-dom";
import "./search.css";
const Error = () => {
  return (
    <>
      <div className="error">
        <h1 >404 Error Page</h1>
        <NavLink to="/Search">Go Back</NavLink>
      </div>
    </>
  );
};

export default Error;
