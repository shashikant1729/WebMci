import React, { useEffect, useState } from "react";
import { data, spinner } from "../Website/ServiceData";
import { NavLink } from "react-router-dom";
import "../Website/about.css";
import Avatar from "@mui/material/Avatar";

const Allusers = () => {
	const [allusersArray, setallusersArray] = useState([]);
	useEffect(() => {
		callAllusers();
	}, []);
	const callAllusers = async () => {
		try {
			const res = await fetch("/allusers", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (res.status !== 201) {
				console.log("error");
			} else {
				// console.log(data);
				setallusersArray(data);
			}
		} catch (error) {
			console.log(error);
			window.alert("Login first OR Server Error");
		}
	};

	// console.log(allusersArray);

	return (
		<>
			{allusersArray.length === 0 ? (
				<>
					<div className="spinner">
						<div class="spinner-grow" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
				</>
			) : (
				<>
					<div
						className="service"
						style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
					>
						{allusersArray.map((val, index) => {
							return (
								<>
									<div
										className="hovereffect_img card mb-2 mx-2 mt-2 service_div"
										key={index}
										style={{ width: "18rem" }}
									>
										<div className="background">
											<Avatar
												className="avatar"
												alt={val.name}
												src={"../upload/" + val.image}
											/>

											<h5
												className="card-title"
												style={{ color: "red", fontSize: "20px" }}
											>
												{val._id}
											</h5>
											<div className="row">
												<div
													className="col-md-3"
													style={{
														fontWeight: "Bold",
														color: "blue",
													}}
												>
													<p>Name</p>
													<p>Email</p>
													<p>Work</p>
												</div>
												<div className="col-md-9">
													<p>{val.name}</p>
													<p>{val.email}</p>
													<p>{val.work}</p>
												</div>
											</div>
										</div>

										<div class="overlay_img">
											{/* <h4>{val.name}</h4> */}
											<div class="rotate_img">
												<p class="group1">
													{val.web_facebook === "" ? (
														<></>
													) : (
														<>
															{" "}
															<a href={val.web_facebook} target="_blank">
																<i
																	class="fa fa-facebook"
																	style={{ color: "blue" }}
																></i>
															</a>
														</>
													)}
													<a href={"mailto:" + val.email} target="_blank">
														<i
															class="fa fa-envelope"
															style={{ color: "blue" }}
														></i>
													</a>
												</p>

												<hr></hr>
												<hr></hr>

												<p class="group2">
													{val.web_insta === "" ? (
														<></>
													) : (
														<>
															{" "}
															<a href={val.web_insta} target="_work2">
																<i
																	class="fa fa-instagram"
																	style={{ color: "blue" }}
																></i>
															</a>
														</>
													)}
													{val.web_linkedin === "" ? (
														<></>
													) : (
														<>
															<a href={val.web_linkedin} target="_blank">
																<i
																	class="fa fa-linkedin"
																	style={{ color: "blue" }}
																></i>
															</a>
														</>
													)}
												</p>
											</div>
										</div>
									</div>
								</>
							);
						})}
					</div>
				</>
			)}
		</>
	);
};

export default Allusers;
