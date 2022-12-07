import React, { useContext, useState } from "react";
import "./user.css";
import Email from "@mui/icons-material/AlternateEmail";
import Password from "@mui/icons-material/Lock";
import signin_image from "./sign_in.png";
import { useHistory } from "react-router-dom";
import { UserContext } from "./Website";
const Signin = () => {
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();
	const [collect, setcollect] = useState({
		email: "",
		password: "",
	});

	const change = (e) => {
		let { name, value } = e.target;
		setcollect({ ...collect, [name]: value });
	};

	const click = async (e) => {
		e.preventDefault();
		const { email, password } = collect;

		try {
			const res = await fetch("/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await res.json();
			if (res.status !== 200) {
				window.alert("Invalide Credential");
			} else {
				if (state === true) {
					dispatch({ type: "USER", payload: false });
				}
				dispatch({ type: "USER", payload: true });

				window.alert("welcome");
				history.push("/home");
			}
		} catch (e) {
			window.alert(e);
		}
	};
	return (
		<>
			<section className="signin">
				<div className="container mt-5">
					<h2 className="formtitle">SignIn</h2>
					<div className="content">
						<div className="div1">
							<form method="post" className="register-form">
								<div className="form-group fg">
									<label htmlFor="email" className="email">
										<Email></Email>
									</label>
									<input
										type="text"
										name="email"
										id="email"
										value={collect.email}
										onChange={change}
										placeholder="Email"
										className="form-control"
									/>
								</div>

								<div className="form-group fg">
									<label htmlFor="password" className="password">
										<Password></Password>
									</label>
									<input
										value={collect.password}
										onChange={change}
										type="password"
										name="password"
										id="password"
										placeholder="password"
										className="form-control"
									/>
								</div>

								<div className="sub form-group ">
									<input
										onClick={click}
										type="submit"
										name="signup"
										className="register"
									/>
								</div>
							</form>
						</div>
						<div className="div2">
							<figure>
								<img src={signin_image} alt="pic" />
							</figure>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Signin;
