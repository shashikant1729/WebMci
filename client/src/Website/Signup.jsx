import React from "react";
import "./user.css";
import Name from "@mui/icons-material/Badge";
import Email from "@mui/icons-material/AlternateEmail";
import Phone from "@mui/icons-material/Phone";
import Work from "@mui/icons-material/Work";
import Password from "@mui/icons-material/Lock";
import Cpassword from "@mui/icons-material/ConfirmationNumber";
import signup_image from "./sign_up.png";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Insta from "@mui/icons-material/Instagram";
import Linkedin from "@mui/icons-material/LinkedIn";
import Facebook from "@mui/icons-material/Facebook";
import Axios from "axios";

import Upload from "@mui/icons-material/CloudUpload";
import { useHistory } from "react-router-dom";
const Signup = () => {
	const history = useHistory();
	const [percent, setpercent] = useState(0);
	const [user, setuser] = useState({
		name: "",
		email: "",
		phone: "",
		work: "",
		password: "",
		cpassword: "",
		web_facebook: "",
		web_insta: "",
		web_work: "",
		web_linkedin: "",
	});
	const [image, setimage] = useState();

	const option = {
		onUploadProgress: (progressEvent) => {
			const { loaded, total } = progressEvent;
			let percent = Math.floor((loaded * 100) / total);
			console.log(`${loaded}kb of ${total}kb | ${percent}`);

			if (percent < 100) {
				setpercent(percent);
			}
		},
	};
	const handle_input = (e) => {
		let { name, value } = e.target;
		setuser({ ...user, [name]: value });
	};

	const sendData = async (e) => {
		e.preventDefault();
		e.preventDefault();
		e.preventDefault();

		try {
			var formData = new FormData();
			formData.append("name", user.name);
			formData.append("email", user.email);
			formData.append("phone", user.phone);
			formData.append("work", user.work);
			formData.append("password", user.password);
			formData.append("cpassword", user.cpassword);
			formData.append("web_insta", user.web_insta);
			formData.append("web_facebook", user.web_facebook);
			formData.append("web_linkedin", user.web_linkedin);
			formData.append("web_work", user.web_work);
			formData.append("image", image);

			await Axios.post("/register", formData, option)
				.then((res) => {
					setpercent(100, () => {
						setTimeout(() => {
							setpercent(0);
						}, 5000);
					});
					console.log(image);
					console.log(res);
					window.alert("Successful Registeration");
					console.log("Successful Register");
					history.push("/signin");
				})
				.catch((err) => {
					console.log(err);
					window.alert("Invalid Registeration");
					console.log("invalid Register");
				});

			// const data = await response.json();
		} catch (error) {
			window.alert("Invalid Registeration_catch");
			console.log("invalid Register_catch");
		}
	};

	return (
		<>
			<section className="signup">
				<div className="container mt-5">
					<h2 className="formtitle">SignUp</h2>

					<div className="content">
						<div className="div1">
							<form
								method="POST"
								className="register-form "
								enctype="multipart/form-data"
							>
								<div className="form-group fg">
									<label htmlFor="Name" className="name">
										<Name></Name>
									</label>
									<input
										autoComplete="off"
										value={user.name}
										onChange={handle_input}
										type="text"
										name="name"
										id="name"
										placeholder="Name"
										className="form-control"
									/>
								</div>
								<div className="form-group fg">
									<label htmlFor="email" className="email">
										<Email></Email>
									</label>
									<input
										autoComplete="off"
										value={user.email}
										onChange={handle_input}
										type="text"
										name="email"
										id="email"
										placeholder="Email"
										className="form-control"
									/>
								</div>
								<div className="form-group fg">
									<label htmlFor="phone" className="phone">
										<Phone></Phone>
									</label>
									<input
										autoComplete="off"
										value={user.phone}
										onChange={handle_input}
										type="number"
										name="phone"
										id="phone"
										placeholder="phone"
										className="form-control"
									/>
								</div>
								<div className="form-group fg">
									<label htmlFor="work" className="work">
										<Work></Work>
									</label>
									<input
										autoComplete="off"
										value={user.work}
										onChange={handle_input}
										type="text"
										name="work"
										id="work"
										placeholder="work"
										className="form-control"
									/>
								</div>
								<div className="form-group fg">
									<label htmlFor="password" className="password">
										<Password></Password>
									</label>
									<input
										autoComplete="off"
										value={user.password}
										onChange={handle_input}
										type="password"
										name="password"
										id="password"
										placeholder="password"
										className="form-control"
									/>
								</div>
								<div className="form-group fg">
									<label htmlFor="cpassword" className="cpassword">
										<Cpassword></Cpassword>
									</label>
									<input
										autoComplete="off"
										value={user.cpassword}
										onChange={handle_input}
										type="password"
										name="cpassword"
										id="cpassword"
										placeholder="confirm password"
										className="form-control"
									/>
								</div>
								<div class="collapse" id="insta">
									<div className="form-group fg ">
										<label htmlFor="link" className="link">
											<Insta></Insta>
										</label>
										<input
											autoComplete="off"
											value={user.web_insta}
											onChange={handle_input}
											type="url"
											name="web_insta"
											id="web"
											placeholder="Instagram Link Here...."
											className="form-control"
										/>
									</div>
								</div>
								<div class="collapse" id="facebook">
									<div className="form-group fg ">
										<label htmlFor="link" className="link">
											<Facebook></Facebook>
										</label>
										<input
											autoComplete="off"
											value={user.web_facebook}
											onChange={handle_input}
											type="url"
											name="web_facebook"
											placeholder="Facebook Link Here...."
											className="form-control"
										/>
									</div>
								</div>
								<div class="collapse" id="linkedin">
									<div className="form-group fg ">
										<label htmlFor="link" className="link">
											<Linkedin></Linkedin>
										</label>
										<input
											autoComplete="off"
											value={user.web_linkedin}
											onChange={handle_input}
											type="url"
											name="web_linkedin"
											placeholder="Linkedin Link Here...."
											className="form-control"
										/>
									</div>
								</div>
								<div class="collapse" id="work_profile">
									<div className="form-group fg ">
										<label htmlFor="link" className="link">
											<Work></Work>
										</label>
										<input
											autoComplete="off"
											value={user.web_work}
											onChange={handle_input}
											type="url"
											name="web_work"
											placeholder="Work Link Here...."
											className="form-control"
										/>
									</div>
								</div>
								<div class="collapse" id="image">
									<div className="form-group fg ">
										<label htmlFor="link" className="link">
											<Upload></Upload>
										</label>
										<input
											autoComplete="off"
											onChange={(e) => {
												const file = e.target.files[0];
												setimage(file);
											}}
											type="file"
											name="image"
											placeholder="Upload Pic Here...."
											className="form-control"
										/>
									</div>
								</div>

								<div className="form-group addfield">
									<p>
										<div className="form-group fg">
											<div className="row mx-auto">
												<div className="col-md-2">
													<Tooltip title="Instagram">
														<label
															// class="btn btn-primary"
															role="button"
															data-bs-toggle="collapse"
															data-bs-target="#insta"
															aria-expanded="false"
															aria-controls="collapseExample"
															htmlFor="Insta"
															className="Insta addmore"
															name="Insta"
															id="Insta"
														>
															<Insta></Insta>
														</label>
													</Tooltip>
												</div>
												<div className="col-md-2">
													<Tooltip title="Facebook">
														<label
															// class="btn btn-primary"
															role="button"
															data-bs-toggle="collapse"
															data-bs-target="#facebook"
															aria-expanded="false"
															aria-controls="collapseExample"
															htmlFor="Facebook"
															className="Facebook addmore"
															name="Facebook"
														>
															<Facebook></Facebook>
														</label>
													</Tooltip>
												</div>
												<div className="col-md-2">
													<Tooltip title="Linkedin">
														<label
															// class="btn btn-primary"
															role="button"
															data-bs-toggle="collapse"
															data-bs-target="#linkedin"
															aria-expanded="false"
															aria-controls="collapseExample"
															htmlFor="Linkedin"
															className="Linkedin addmore"
															name="Linkedin"
														>
															<Linkedin></Linkedin>
														</label>
													</Tooltip>
												</div>
												<div className="col-md-2">
													<Tooltip title="Work">
														<label
															// class="btn btn-primary"
															role="button"
															data-bs-toggle="collapse"
															data-bs-target="#work_profile"
															aria-expanded="false"
															aria-controls="collapseExample"
															htmlFor="Work"
															className="Work addmore"
															name="Work"
														>
															<Work></Work>
														</label>
													</Tooltip>
												</div>
												<div className="col-md-2">
													<Tooltip title="UserImage">
														<label
															// class="btn btn-primary"
															role="button"
															data-bs-toggle="collapse"
															data-bs-target="#image"
															aria-expanded="false"
															aria-controls="collapseExample"
															htmlFor="Image"
															className="Work addmore"
															name="Image"
														>
															<Upload></Upload>
														</label>
													</Tooltip>
												</div>
											</div>
										</div>
									</p>
								</div>

								<div className="sub form-group ">
									<div className="submit_progress"><input
										type="submit"
										name="signup"
										className="register"
										onClick={sendData}
									/>
									{percent > 0 ? (
										<>
											<div class="progress">
												<div
													class="spinner-border "
													role="status"
												></div>
											</div>
										</>
									) : (
										<></>
									)}</div>
									
								</div>
							</form>
						</div>
						<div className="div2">
							<figure>
								<img src={signup_image} alt="pic" />
							</figure>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Signup;
