import React, { useState } from "react";
import "./weather.css";
const App = () => {
	const [inputValue, setValue] = useState("");

	const show_city = document.getElementById("city_name");
	const temp = document.getElementById("temp");
	const temp_statues = document.getElementById("temp_status");
	const status_info = document.getElementById("temp_status_info");

	const daysInWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const change = (e) => {
		let value = e.target.value;
		setValue((pre) => {
			return value;
		});
	};
	const getInfo = async (e) => {
		e.preventDefault();

		if (inputValue === "") {
			show_city.innerText = "Pls Write Something Before Search";
		} else {
			try {
				const link = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=76d8169b8c9c9aa3d77265d6a1f58b7c`;
				const response = await fetch(link);
				const data = await response.json();
				const arr = [data];
				show_city.innerText = `${arr[0].name}, ${arr[0].sys.country}`;
				temp.innerText = arr[0].main.temp;

				const mood = arr[0].weather[0].main;
				status_info.innerText = mood;
				if (mood === "Clear") {
					temp_statues.innerHTML =
						"<i className='fa fa-sun' style = 'color:#eccc68' aria-hidden='true'></i>";
				} else if (mood === "Clouds") {
					temp_statues.innerHTML =
						" <i className='fa fa-cloud' style='color:#f1f2f6' aria-hidden='true'></i>";
				} else if (mood === "Rain") {
					temp_statues.innerHTML =
						"<i className='fa fa-cloud-rain' style='color:#a4b0be' aria-hidden='true'></i>";
				} else {
					temp_statues.innerHTML =
						"<i className='fa fa-sun' style='color:#f1f2f6' aria-hidden='true'></i>";
				}
			} catch {
				show_city.innerText = "Pls Enter City Name Properly ";
			}
		}
		setValue("");
		//   alert("alert");
	};

	return (
		<>
			<div className="container-fluid main_header">
				<div className="row">
					<div className="col-md-10 col-12 mx-auto">
						<div className="main_content">
							<form action="" className="form">
								<input
									type="text"
									placeholder="Enter name of Your city"
									id="city"
									onChange={change}
									value={inputValue}
									name="inputName"
								/>
								<input
									type="submit"
									value="Search"
									id="submitbtn"
									onClick={getInfo}
								/>
							</form>
							<div className="tempInfo">
								<div className="top_layer">
									<p id="day">{daysInWeek[new Date().getDay()]}</p>
									<p id="today_date">{`${new Date().getDate()}/${
										new Date().getMonth() + 1
									}/${new Date().getFullYear()}`}</p>
								</div>

								<div className="main_layer">
									<p id="city_name">-------</p>

									<div className="middle_layer data_hide row">
										<div className="col-md-6">
											<p>
												<span id="temp">--</span>
												<sup>0</sup>C
											</p>
										</div>
										<div className="col-md-6">
											<p>
												<span id="temp_status">-</span>
												<sup id="temp_status_info">-</sup>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
