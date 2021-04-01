import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./SecondHeader.css";
import { useHistory } from "react-router-dom";
import { SearchContext } from "../../App";
import MenuIcon from "@material-ui/icons/Menu";
import { Box, Button } from "@material-ui/core";

const SecondHeader = () => {
	let history = useHistory();

	const [search, setSearch] = useContext(SearchContext);

	function CategoryClick(name) {
		history.push(`/category/${name}`);
		setSearch("");
	}

	const [display, setDislay] = useState("none");
	const closeNav = () => {
		const mobileNavDisplay = display === "none" ? "block" : "none";
		setDislay(mobileNavDisplay);
	};
	return (
		<div>
			<div className="navBarPart">
				<Link to="/home">Home</Link>
				<Link onClick={() => CategoryClick("beef")}>
					Beef
				</Link>
				<Link onClick={() => CategoryClick("chicken")}>
					Chicken
				</Link>
				<Link onClick={() => CategoryClick("pasta")}>
					Pasta
				</Link>
				<Link onClick={() => CategoryClick("seafood")}>
					Seafood
				</Link>
				<Link onClick={() => CategoryClick("breakfast")}>
					Breakfast
				</Link>
			</div>
			<div className="mobileNavbar">
				<Button onClick={closeNav}>
					<MenuIcon
						style={{
							color: "white",
							fontSize: "50px",
						}}
					></MenuIcon>
				</Button>
				<Box
					className="mobileNavLink"
					id="mobileNavLink"
					display={display}
				>
					<Link to="/home">Home</Link>
					<Link onClick={() => CategoryClick("beef")}>
						Beef
					</Link>
					<Link
						onClick={() =>
							CategoryClick("chicken")
						}
					>
						Chicken
					</Link>
					<Link onClick={() => CategoryClick("pasta")}>
						Pasta
					</Link>
					<Link
						onClick={() =>
							CategoryClick("seafood")
						}
					>
						Seafood
					</Link>
					<Link
						onClick={() =>
							CategoryClick("breakfast")
						}
					>
						Breakfast
					</Link>
				</Box>
			</div>
		</div>
	);
};

export default SecondHeader;
