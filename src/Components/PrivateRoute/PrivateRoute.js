import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router";
import { ProfileContext } from "../../App";
import firebase from "firebase/app";
import "firebase/auth";

const PrivateRoute = ({ children, ...rest }) => {
	var CurrentUser = firebase.auth().currentUser;
	var email;

	if (CurrentUser != null) {
		email = CurrentUser.email;
	}

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			CurrentUser = user;
		} else {
		}
	});

	return (
		<Route
			{...rest}
			render={({ location }) =>
				email ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
