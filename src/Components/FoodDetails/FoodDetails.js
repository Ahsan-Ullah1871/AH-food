import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../Header/Header";

import "./FoodDetails.css";
const FoodDetails = () => {
	const { id } = useParams();
	const [foodDetails, setFoodDetails] = useState();

	useEffect(() => {
		fetch(
			` https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
		)
			.then((response) => response.json())
			.then((data) => setFoodDetails(data?.meals[0]));
	}, [id]);

	return (
		<div>
			<Header></Header>
			<div className="foodDetailsPart">
				<h1>{foodDetails?.strMeal}</h1>
				<div className="foodDetailsCard">
					<div className="Info">
						<h4>
							Category:{" "}
							{foodDetails?.strCategory}
						</h4>
						<h4>Area: {foodDetails?.strArea}</h4>
						<p>
							Introduction: <br />
							{foodDetails?.strInstructions}
						</p>
					</div>
					<div className="imageAndVideo">
						<img
							src={foodDetails?.strMealThumb}
							alt=""
						/>
						<Button
							variant="contained"
							color="primary"
							href={foodDetails?.strYoutube}
							target="_blank"
						>
							Show Recipe Video
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FoodDetails;
