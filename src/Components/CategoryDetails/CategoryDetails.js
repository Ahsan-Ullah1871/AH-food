import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CategoryDetailsCard from "./CategoryDetailsCard/CategoryDetailsCard";
import Container from "@material-ui/core/Container";

import "./CategoryDetails.css";
import TopHeader from "../TopHeader/TopHeader";
import SecondHeader from "../TopHeader/SecondHeader";
import Loader from "react-loader-spinner";
import Header from "../Header/Header";

const CategoryDetails = () => {
	const { name } = useParams();
	const [categories, setCategories] = useState(null);
	useEffect(() => {
		fetch(
			`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
		)
			.then((response) => response.json())
			.then((data) => setCategories(data?.meals));
	}, [name]);
	return (
		<div>
			<Header></Header>
			<Container maxWidth="xm">
				<div className="categoryCard">
					{categories ? (
						categories.map((CategoryResult) => (
							<CategoryDetailsCard
								CategoryResult={
									CategoryResult
								}
							></CategoryDetailsCard>
						))
					) : (
						<Loader
							type="ThreeDots"
							color="#00BFFF"
							height={100}
							width={100}
						/>
					)}
				</div>
			</Container>
		</div>
	);
};

export default CategoryDetails;
