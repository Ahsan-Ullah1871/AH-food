import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import HomeCard from "../HomeCard/HomeCard";
import "./Home.css";
import Loader from "react-loader-spinner";

const Home = () => {
	const [categories, setCategories] = useState(null);
	useEffect(() => {
		fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
			.then((response) => response.json())
			.then((data) => setCategories(data.categories));
	}, []);
	return (
		<div>
			<Header></Header>

			<div className="cardPart" id="homeCard">
				{categories ? (
					categories?.map((category) => (
						<HomeCard
							category={category}
						></HomeCard>
					))
				) : (
					<Loader
						type="BallTriangle"
						color="#00BFFF"
						height={100}
						width={100}
					/>
				)}
			</div>
		</div>
	);
};

export default Home;
