import React, { useEffect, useState ,useContext} from "react";
import { NavLink } from "react-router-dom";
import image from "./captain-america.png";
import { UserContext } from "./Website";

const Home = () => {
	const { state, dispatch } = useContext(UserContext);
	const [username, setusername] = useState();
	const [isUser, setisUser] = useState(false);
	useEffect(() => {
		callHomePage();
	}, [state]);
	const callHomePage = async () => {
		try {
			const res = await fetch("/getdata", {
				method: "GET",
				header: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (res.status !== 200) {
				dispatch({type:"USER",payload:false})

				// window.alert("signin Again to send data");
			} else {
				dispatch({type:"USER",payload:true})
				setusername(data.name);
				setisUser(true);
			}
		} catch (error) {
			dispatch({type:"USER",payload:false});
			// window.alert("signin Again!!");

			// console.log(error);
		}
	};

	return (
		<>
			<div className="home m-5">
				<div className="text">
					<div className="jumbotron">
						<h1 className="display-4">
							Hello,{isUser ? <>{username.toUpperCase()}</> : <>World!</>}
						</h1>
						{isUser ? (
							<>
								<p className="lead">
									Good to see, {username}, <br></br>
									This is a simple hero unit, a simple jumbotron-style component
									for calling extra attention to featured content or
									information.
								</p>
								<hr className="my-4" />
								<p>
									It uses utility classes for typography and spacing to space
									content out within the larger container.
								</p>
							</>
						) : (
							<>
								<p className="lead">
									This is a simple hero unit, a simple jumbotron-style component
									for calling extra attention to featured content or
									information.
								</p>
								<hr className="my-4" />
								<p>
									It uses utility classes for typography and spacing to space
									content out within the larger container.
								</p>
							</>
						)}

						<NavLink
							to="/contact"
							className="btn btn-primary btn-lg"
							role="button"
						>
							Contact
						</NavLink>
					</div>
				</div>
				<div className="img">
					<img alt="image" src={image} />
				</div>
			</div>
		</>
	);
};

export default Home;
