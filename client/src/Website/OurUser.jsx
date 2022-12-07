import React from "react";
import "./user.css";
import { NavLink } from "react-router-dom";
const OurUser = () => {
	return (
		<>
			<section className="user">
				<div className="container ">
					<h2 className="formtitle">User</h2>
					<div className="content">
						<div className="div1">
							<div className="sub form-group ">
								<NavLink to="/signup" className="navlink">
									<button className="btnuser">
										<label htmlFor="signup" className="signup">
											Signup
										</label>
									</button>
								</NavLink>
							</div>
						</div>
						<div className="div2">
							<NavLink to="/signin" className="navlink">
								<button className="btnuser">
									<label htmlFor="signin" className="signin">
										Signin
									</label>
								</button>
							</NavLink>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default OurUser;
