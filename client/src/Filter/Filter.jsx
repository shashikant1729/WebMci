import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Search from "./Search.jsx";
import Error from "./Error.jsx";

const Filter = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route
          path="/Search"
          render={() => {
            return <Search />;
          }}
        />
        {/* <Route
          render={() => {
            return <Error />;
          }}
              /> */}
              <Redirect to="/Search" /> 
              {/* redirect doing the same work if page not exit in navlink  */}
      </Switch>
    </>
  );
};

export default Filter;
