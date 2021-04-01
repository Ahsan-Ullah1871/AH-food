import React from "react";
import SecondHeader from "../TopHeader/SecondHeader";
import TopHeader from "../TopHeader/TopHeader";
import "./Header.css";

const Header = () => {
	return (
		<div className="fixHeader">
			<TopHeader></TopHeader>
			<SecondHeader></SecondHeader>
		</div>
	);
};

export default Header;
