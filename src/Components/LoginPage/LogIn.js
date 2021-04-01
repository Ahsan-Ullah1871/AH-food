import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { ProfileContext } from "../../App";
import Form from "../Form/Form";
import Header from "../Header/Header";

const LogIn = () => {
	const [user, setUser] = useContext(ProfileContext);
	let history = useHistory();
	let location = useLocation();
	let { from } = location.state || { from: { pathname: "/" } };

	useEffect(() => {
		if (user?.displayName) {
			history.replace(from);
		}
	}, [user]);

	return (
		<div>
			<Header></Header>
			<div className="formDiv" style={{ marginTop: "230px" }}>
				<Form></Form>
			</div>
		</div>
	);
};

export default LogIn;
