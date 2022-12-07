import * as React from "react";
import { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import img from "./progr.jpg";
import { NavLink } from "react-router-dom";
import { UserContext } from "./Website";
import profile_image from "./profile_image.jpg";

const pages = ["home", "about", "service", "contact", "Weather", "user"];
const settings = ["Profile", "Account", "Dashboard","AllUsers", "Logout"];

const Navbar = () => {
	const { state, dispatch } = useContext(UserContext);

	console.log(state);
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	// const UserProfile = () => {
	// 	return (

	// 	);
	// };
	const [userDetails, setuserDetails] = useState({
		image: profile_image,
		name: "User",
		messages: [],
	});

	useEffect(() => {
		callHomePage();
	}, [state]);
	const callHomePage = async () => {
		console.log("change");
		try {
			const res = await fetch("/getdata", {
				method: "GET",
				header: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (res.status !== 200) {
				// window.alert("signin Again to send data");
				dispatch({ type: "USER", payload: false });
			} else {
				dispatch({ type: "USER", payload: true });
				setuserDetails({
					image: "./upload/" + data.image,
					name: data.name,
					messages: data.messages,
				});
			}
		} catch (error) {
			// window.alert("server Error");
			// console.log(error);
		}
	};

	return (
		<AppBar
			className="Navbar"
			position="static"
			style={{ backgroundColor: "black" }}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
					>
						<Avatar
							alt="Remy Sharp"
							src="https://source.unsplash.com/900x450/?random"
						/>
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<Tooltip title={page} key={page}>
									<MenuItem key={page} onClick={handleCloseNavMenu}>
										<Typography textAlign="center" key={page}>
											<NavLink
												style={{ textDecoration: "none" }}
												exact
												activeClassName="acta"
												to={"/" + page}
											>
												{page}
											</NavLink>
										</Typography>
									</MenuItem>
								</Tooltip>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
					>
						Formal Website
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							<Tooltip title={page} key={page}>
								<Button
									key={page}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: "white", display: "block" }}
								>
									<NavLink
										style={{ textDecoration: "none" }}
										exact
										activeClassName="active"
										to={"/" + page}
									>
										{page}
									</NavLink>
								</Button>
							</Tooltip>
						))}
					</Box>

					{state ? (
						<>
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar alt={userDetails.name} src={userDetails.image} />
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{settings.map((setting) => (
										<MenuItem key={setting} onClick={handleCloseNavMenu}>
											<Typography textAlign="center">
												{setting === "Dashboard" ? (
													<>
														<NavLink
															activeClassName="atv"
															style={{ textDecoration: "none" }}
															activeClassName="atv"
															exact={true}
															to={`/user/` + setting}
														>
															<div
																type="text"
																class="text-primary position-relative"
															>
																{setting}
																<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
																	{userDetails.messages.length}
																	{/* <span class="visually-hidden">
																		unread messages
																	</span> */}
																</span>
															</div>
														</NavLink>
													</>
												) : (
													<>
														<NavLink
															activeClassName="atv"
															style={{ textDecoration: "none" }}
															activeClassName="atv"
															exact={true}
															to={`/user/` + setting}
														>
															{setting}
														</NavLink>
													</>
												)}
											</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
						</>
					) : (
						<></>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Navbar;
