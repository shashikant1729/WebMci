import React, { useEffect, useState, useContext } from "react";
// import { a } from "react-router-dom";
import "../Website/about.css";
import "./profile.css";
import pic from "../Website/profile_image.jpg";
import Insta from "@mui/icons-material/Instagram";
import Linkedin from "@mui/icons-material/LinkedIn";
import Facebook from "@mui/icons-material/Facebook";
import Email from "@mui/icons-material/Email";
import Call from "@mui/icons-material/Call";
import Work from "@mui/icons-material/WorkOutline";
import Tooltip from "@mui/material/Tooltip";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Website/Website";

const Profile = () => {
	const { state, dispatch } = useContext(UserContext);

	const history = useHistory();
	const [userData, setuserData] = useState({
		name: "",
		email: "",
		phone: "",
		work: "",
		password: "",
		cpassword: "",
		web_facebook: "",
		web_insta: "",
		web_linkedin: "",
		web_work: "",
		image: "",
	});
	useEffect(() => {
		callAboutPage();
	}, []);

	const callAboutPage = async () => {
		try {
			const res = await fetch("/about", {
				method: "GET",
				header: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				credentials: "include",
			});
			const data = await res.json();
			if (res.status !== 200) {
				dispatch({ type: "USER", payload: false });
				window.alert("signin Again!!");
				history.push("/signin");
			} else {
				dispatch({ type: "USER", payload: true });
				setuserData(data);
			}
		} catch (error) {
			dispatch({ type: "USER", payload: false });

			window.alert("signin Again!!");
			history.push("/signin");
			// console.log(error);
		}
		console.log("hello");
		console.log("hello " + userData.image + `./upload/${userData.image}`);

		console.log("./upload/" + userData.image);
	};
	{
		/* <div className="col-md-3 image_div">
							<img
								src={"../upload/" + userData.image}
								alt="pic"
								className="image"
							/>
						</div> */
	}
	return (
		<>
			<div className="container emp-profile">
				<form method="GET" className="form">
					<div className="row">
						<div className="col-md-3 image_div">
							<div className="hovereffect_img">
								<img
									className="img-responsive image"
									src={"../upload/" + userData.image}
									alt="pic"
								/>

								<div class="overlay_img">
									<div class="rotate_img">
										<p class="group1">
											{userData.web_facebook === "" ? (
												<></>
											) : (
												<>
												
													<a href={userData.web_facebook} target="_blank">
														<i class="fa fa-facebook"></i>
													</a>
												</>
											)}
											{userData.email === "" ? (
												<></>
											) : (
												<>
												<a href={"mailto:" + userData.email} target="_blank">
												<i class="fa fa-envelope"></i>
											</a>
												</>
											)}
											
										</p>

										<hr></hr>
										<hr></hr>

										<p class="group2">
											{userData.web_insta === "" ? (
												<></>
											) : (
												<>
													{" "}
													<a href={userData.web_insta} target="_work2">
														<i class="fa fa-instagram"></i>
													</a>
												</>
											)}
											{userData.web_linkedin === "" ? (
												<></>
											) : (
												<>
													<a href={userData.web_linkedin} target="_blank">
														<i class="fa fa-linkedin"></i>
													</a>
												</>
											)}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-7 ">
							<div className="profile_head">
								<h5>{userData.name}</h5>
								<h6>{userData.work}</h6>
								<p className="profile-rating mt-3 mb-5">
									Ranking: <span>1/10</span>
								</p>
								<ul className="nav nav-tabs" id="myTab" role="tablist">
									<li className="nav-item" role="presentation">
										<button
											className="nav-link active"
											id="home-tab"
											data-bs-toggle="tab"
											data-bs-target="#home"
											type="button"
											role="tab"
											aria-controls="home"
											aria-selected="true"
										>
											About
										</button>
									</li>
									<li className="nav-item" role="presentation">
										<button
											className="nav-link"
											id="profile-tab"
											data-bs-toggle="tab"
											data-bs-target="#profile"
											type="button"
											role="tab"
											aria-controls="profile"
											aria-selected="false"
										>
											Profile
										</button>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-md-2">
							<input
								type="submit"
								className="profile-edit-btn"
								value="Edit Profile(not in work)"
								name="btnAddMore"
							/>
							{/* 
							<a href="" download="profile_image.png">
              <Tooltip title  = 'Download'><Download></Download></Tooltip>
							</a>

							<canvas width="300" height="300">
                
              </canvas> */}
						</div>
					</div>
					<div className="row ">
						<div className="col-md-4 px-5">
							<div className="profile_work py-1">
								<p>Work And Profile Link</p>

								<a href={"tel:" + userData.phone} target="_work2">
									<Tooltip title="Call">
										<Call></Call>
									</Tooltip>
								</a>
								<br></br>
								<a href={userData.web_work} target="_work2">
									<Tooltip title="Project">
										<Work></Work>
									</Tooltip>
								</a>
							</div>
						</div>
						<div className="col-md-8 pd-5 about-info">
							<div className="tab-content" id="myTabContent">
								<div
									className="tab-pane fade show active"
									id="home"
									role="tabpanel"
									aria-labelledby="home-tab"
								>
									<div className="row">
										<div className="row mt-3">
											<div className="col-md-6">
												<label>UserId</label>
												<br />
											</div>
											<div className="col-md-6">
												<p>{userData._id}</p>
											</div>
										</div>
										<div className="row mt-3">
											<div className="col-md-6">
												<label>Name</label>
												<br />
											</div>
											<div className="col-md-6">
												<p>{userData.name}</p>
											</div>
										</div>
										<div className="row mt-3">
											<div className="col-md-6">
												<label>Work</label>
												<br />
											</div>
											<div className="col-md-6">
												<p>{userData.work}</p>
											</div>
										</div>
										<div className="row mt-3">
											<div className="col-md-6">
												<label>Email</label>
												<br />
											</div>
											<div className="col-md-6">
												<p>{userData.email}</p>
											</div>
										</div>
									</div>
								</div>
								<div
									className="tab-pane fade"
									id="profile"
									role="tabpanel"
									aria-labelledby="profile-tab"
								>
									<div className="row">
										<div className="row mt-3">
											<div className="col-md-6">
												<label>Instagram</label>
												<br />
											</div>
											<div className="col-md-6">
												<p>
													{userData.web_insta === ""
														? "Not Available"
														: userData.web_insta}
												</p>
											</div>
										</div>
										<div className="row mt-3">
											<div className="col-md-6">
												<label>Facebook</label>
												<br />
											</div>
											<div className="col-md-6">
												<p>
													{userData.web_facebook === ""
														? "Not Available"
														: userData.web_facebook}
												</p>
											</div>
										</div>
										<div className="row mt-3">
											<div className="col-md-6">
												<label>Linkedin</label>
												<br />
											</div>
											<div className="col-md-6">
												<p>
													{userData.web_linkedin === ""
														? "Not Available"
														: userData.web_linkedin}
												</p>
											</div>
										</div>
										<div className="row mt-3">
											<div className="col-md-6">
												<label>Phone</label>
												<br />
											</div>
											<div className="col-md-6">
												<p>{userData.phone}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default Profile;
