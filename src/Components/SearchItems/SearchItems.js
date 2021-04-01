import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../App";
import CategoryDetailsCard from "../CategoryDetails/CategoryDetailsCard/CategoryDetailsCard";
import Header from "../Header/Header";
import NotFind from "../NotFind/NotFind";
import SecondHeader from "../TopHeader/SecondHeader";
import TopHeader from "../TopHeader/TopHeader";
import "./SearchItems.css";

const SearchItems = () => {
	const [search] = useContext(SearchContext);
	const [searchResult, setSearchResult] = useState([]);

	useEffect(() => {
		fetch(
			`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
		)
			.then((response) => response.json())
			.then((data) => {
				setSearchResult(data.meals);
			});
	}, [search]);

	return (
		<div>
			<Header></Header>
			<div className="searchResultCard">
				{searchResult ? (
					searchResult.map((CategoryResult) => (
						<CategoryDetailsCard
							CategoryResult={CategoryResult}
						></CategoryDetailsCard>
					))
				) : (
					<NotFind></NotFind>
				)}
			</div>
		</div>
	);
};

export default SearchItems;
