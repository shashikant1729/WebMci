import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "./Website";
import { UserContextMessage } from "./Website";

const Contact = () => {
	const { state, dispatch } = useContext(UserContext);

	const history = useHistory();
	const [islogin, setislogin] = useState(false);
	const [userData, setuserData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	useEffect(() => {
		callAboutPage();
	}, []);

	const change = (e) => {
		const { name, value } = e.target;
		setuserData((pre) => {
			return {
				...pre,
				[name]: value,
			};
		});
	};
	const submit_btn = async (e) => {
		e.preventDefault();
		// console.log(userData);
		const { name, email, phone, message } = userData;
		if (!name || !email || !phone || !message) {
			window.alert(
				"message not sent, kindly resend, either your message box empty or not login yet"
			);
		} else {
			try {
				console.log("hello contact page");
				const response = await fetch("/contact", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name,
						email,
						phone,
						message,
					}),
				});

				const data = await response.json();
				if (!data || response.status !== 201) {
		console.log(userData);

					window.alert("either your message box empty or not login yet,");
				} else {
		console.log(userData);

					window.alert("message sent successfully");
					setuserData((pre) => {
						// alert("Your data is Successfully submit");
						return {
							...pre,
							message: "",
						};
					});
				}
			} catch (er) {
				console.log(er);
			}
		}
	};
	const callAboutPage = async () => {
		try {
			const res = await fetch("/getdata", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (res.status !== 200) {
				// dispatch({ type: "USER", payload: false });
				// window.alert("signin Again to send data");
				// history.push("/signin");
				setislogin(false);
			} else {
				// dispatch({ type: "USER", payload: true });
				setislogin(true);
				setuserData({
					name: data.name,
					email: data.email,
					phone: data.phone,
					message: "",
				});
			}
		} catch (error) {
			// dispatch({ type: "USER", payload: false });
			setislogin(false);

			// window.alert("signin Again!!");
			// history.push("/signin");
			// console.log(error);
		}
	};

	return (
		<>
			<div className="contact ">
				<form method="POST">
					{islogin ? <></> : <>Kindly login to Send message to us !!!</>}
					<div className="form-group">
						<div className="row">
							<div className="col-md-4">
								<label htmlFor="exampleInputEmail1">UserName</label>
								<input
									name="name"
									required
									value={userData.name}
									readOnly
									type="text"
									className="form-control"
									placeholder="User Name"
								/>
							</div>
							<div className="col-md-4">
								<label htmlFor="exampleInputEmail1">Email address</label>
								<input
									name="email"
									required
									value={userData.email}
									readOnly
									type="email"
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
								/>
								<small id="emailHelp" className="form-text text-muted">
									We'll never share your email with anyone else.
								</small>
							</div>
							<div className="col-md-4">
								<label htmlFor="phone">Phone</label>
								<input
									name="phone"
									required
									value={userData.phone}
									readOnly
									type="number"
									className="form-control"
									placeholder="phone"
								/>
							</div>
						</div>
						<hr />
						<hr />

						<hr />
						<div className="row">
							<div className="col-md-4">
								<label htmlFor="message">Message</label>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<textarea
									class="form-control"
									value={userData.message}
									onChange={change}
									name="message"
									placeholder="Text Here ...."
									id="exampleFormControlTextarea1"
									rows="10"
								></textarea>
							</div>
						</div>
					</div>
					<div className="btn">
						<button type="submit" onClick={submit_btn}>
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Contact;
