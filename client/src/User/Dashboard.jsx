import React, { useState, useEffect } from "react";
import pic from "../Website/profile.jpg";
import no_messages from "./no-messages.jpg";
import "../Website/about.css";

const Dashboard = () => {
	const [messages, setmessages] = useState([]);

	useEffect(() => {
		callAboutPage();
	}, []);
	const callAboutPage = async () => {
		try {
			const res = await fetch("/getdata", {
				method: "GET",
				header: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (res.status !== 200) {
				// dispatch({ type: "USER", payload: false });
				// window.alert("signin Again to send data");
				// history.push("/signin");
			} else {
				// dispatch({ type: "USER", payload: true });
				setmessages(data.messages);
			}
		} catch (error) {
			// dispatch({ type: "USER", payload: false });

			window.alert("signin Again!!");
			// history.push("/signin");
			// console.log(error);
		}
	};
	return (
		<>
			
				{messages.length === 0 ? (
					<>
						{/* <img
							src={no_messages}
							alt="noMessages"
							style={{ width: "50%", marginInline: "auto", height: "450px" }}
						/> */}
						<div className="spinner">
						<div class="spinner-grow" role="status">
							<span class="sr-only">Loading...</span>
						</div>
					</div>
					</>
				) : (
					<><div className="accordion row mt-5 " id="accordionExample">
						{" "}
						{messages.map((val, index) => {
							return (
								<div className="accordion-item col-md-7 m-auto shadow-lg p-3  bg-body rounded ">
									<h2 className="accordion-header" id={index}>
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target={"#collapse" + index}
											aria-expanded="false"
											aria-controls={"collapse" + index}
										>
											{val.date}
										</button>
									</h2>
									<div
										id={"collapse" + index}
										className="accordion-collapse collapse "
										aria-labelledby={index}
										data-bs-parent="#accordionExample"
									>
										<div className="accordion-body">
											<strong>Message: </strong>
											<br></br> {val.message}
										</div>
									</div>
								</div>
							);
						})}
					</div></>
				)}
			
		</>
	);
};

export default Dashboard;
