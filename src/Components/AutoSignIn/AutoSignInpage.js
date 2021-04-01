import { Button } from "@material-ui/core";
import React, { createContext, useContext, useEffect } from "react";
import "./AutoSignInPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faFacebook,
	faGoogle,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";
import { ProfileContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app();
}

const AutoSignInPage = () => {
	var googleProvider = new firebase.auth.GoogleAuthProvider();
	var fbProvider = new firebase.auth.FacebookAuthProvider();

	let history = useHistory();
	let location = useLocation();
	let { from } = location.state || { from: { pathname: "/" } };
	const [user, setUser] = useContext(ProfileContext);

	const firebaseHandle = (provider) => {
		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				/** @type {firebase.auth.OAuthCredential} */
				var credential = result.credential;

				var token = credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				setUser(user);
				history.replace(from);
			})
			.catch((error) => {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				console.log(errorCode, errorMessage, email);
				// ...
			});
	};

	const googleSignInHandle = () => {
		firebaseHandle(googleProvider);
	};
	const facebookSignInHandle = () => {
		firebaseHandle(fbProvider);
	};

	return (
		<div className="socialButton">
			<h2>Sign In with social network</h2>
			<div className="facebook">
				<button onClick={facebookSignInHandle}>
					<div className=" socialRow">
						<div className=" socialColum">
							<FontAwesomeIcon
								icon={faFacebook}
								className="socialIcons"
							/>
						</div>
						<div className=" socialColum">
							Log in with facebook
						</div>
					</div>
				</button>
			</div>
			<div className="google">
				<button onClick={googleSignInHandle}>
					<div className=" socialRow">
						<div className=" socialColum">
							<FontAwesomeIcon
								icon={faGoogle}
								className="socialIcons"
							/>
						</div>
						<div className=" socialColum">
							Log in with Google
						</div>
					</div>
				</button>
			</div>
		</div>
	);
};

export default AutoSignInPage;
