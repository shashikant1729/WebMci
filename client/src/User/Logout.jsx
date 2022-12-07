import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Website/Website";

const Logout = () => {
	const { state, dispatch } = useContext(UserContext);

	//using promises not from async await
	const history = useHistory();
	useEffect(() => {
		fetch("/user/Logout", {
			method: "GET",
			header: {
				Accept: "application/json",
				"Content-Type": "application.json",
			},
			credentials: "include",
		})
			.then((res) => {
				dispatch({ type: "USER", payload: false });
				history.push("/home", { replace: true });

				if (res.status !== 200) {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});

	return (
		<>
			<h1>page of logout</h1>
		</>
	);
};

export default Logout;
