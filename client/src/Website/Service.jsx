import React from "react";
import './about.css'
import { NavLink } from "react-router-dom";
import { data, spinner } from "./ServiceData.jsx";
const Service = () => {
	return (
		<>
			<div className="service">
				{data.map((val, index) => {
					return (
						<>
            
			
    {/* <div >
        <img  src="http://placehold.it/350x250" alt=""/>
            <div class="overlay">
                <h2>Effect 13</h2>
				<p>
					<a href="#">LINK HERE</a>
				</p>
            </div>
    </div> */}

							<div 
								key={index}
								className="card mb-2 mx-2 mt-2 service_div hovereffect"
								style={{ width: "18rem" }}
							>
								<img 
									src={val.img}
									className="card-img-top img-responsive"
									alt={val.movie_id}
								/>
								<div className="card- overlay">
									<h5 className="card-title" style={{"color":"red","fontSize":"20px"}}>{val.phase}</h5>
									<p className="card-text">
										<span style={{ fontWeight: "Bold", color: "blue", "fontSize":"Bold" }}>
											Name
										</span>
										{val.title}
									</p>
									<p className="card-text">
										<span style={{ fontWeight: "Bold", color: "blue" }}>
											Category
										</span>
										{val.category_name}
									</p>
									<p className="card-text">
										<span style={{ fontWeight: "Bold", color: "blue" }}>
											Releasing Year
										</span>
										{val.release_year}
									</p>
									<p className="card-text">
										<span style={{ fontWeight: "Bold", color: "blue" }}>
											Budget
										</span>
										{val.budget}
									</p>
								
								</div>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
};

export default Service;
