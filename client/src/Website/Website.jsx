import React, { createContext, useReducer } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Service from "./Service.jsx";
import Contact from "./Contact.jsx";
import OurUser from "./OurUser";
import Profile from "../User/Profile";
import Allusers from "../User/Allusers";
// import Account from "../User/Account";
// import Daseboard from "../User/Daseboard";
import Logout from "../User/Logout";
import Signin from "./Signin";
import Signup from "./Signup";
import "./Website.css";
import Footer from "./Footer.jsx";
import Weather from "../Weather/Weather.jsx";
import { initialState, reducer } from "../Reducer/Usereducer";
import Dashboard from "../User/Dashboard.jsx";
const Routing = () => {
	return (
		<Switch>
			<Route
				exact
				path="/"
				component={() => {
					return <Home />;
				}}
			/>
			<Route
				exact
				path="/home"
				component={() => {
					return <Home />;
				}}
			/>
			<Route
				path="/about"
				component={() => {
					return <About />;
				}}
			/>
			<Route
				path="/service"
				component={() => {
					return <Service />;
				}}
			/>
			<Route
				path="/contact"
				component={() => {
					return <Contact />;
				}}
			/>
			<Route
				path="/weather"
				component={() => {
					return <Weather />;
				}}
			/>
			<Route
				exact
				path="/user"
				component={() => {
					return <OurUser />;
				}}
			/>
			<Route
				path="/user/Profile"
				component={() => {
					return <Profile />;
				}}
			/>
			<Route
				path="/user/Allusers"
				component={() => {
					return <Allusers />;
				}}
			/>
			<Route
				path="/user/Dashboard"
				component={() => {
					return <Dashboard />;
				}}
			/>
			<Route
				path="/user/Logout"
				component={() => {
					return <Logout />;
				}}
			/>
			<Route
				path="/signin"
				component={() => {
					return <Signin />;
				}}
			/>
			<Route
				path="/signup"
				component={() => {
					return <Signup />;
				}}
			/>
			<Redirect to="/" />
		</Switch>
	);
};
//context api
export const UserContext = createContext();
export const UserContextMessage = createContext();
const Website = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
			<UserContext.Provider
				value={{ state, dispatch }}
			>
				<div className="appdiv">
					<div className="navbardiv">
						<Navbar />
					</div>
					<div className="routingdiv">
						<Routing></Routing>
					</div>
					<div className="footerdiv">
						<Footer />
					</div>
				</div>
			</UserContext.Provider>
		</>
	);
};

export default Website;
