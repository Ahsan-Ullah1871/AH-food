import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import firebaseConfig from "../../firebase.config";

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app();
}

const SignIn = () => {
	var provider = new firebase.auth.GoogleAuthProvider();
	const [user, setUser] = useState({});

	const googleSignInHandle = () => {
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
			})
			.catch((error) => {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				console.log(errorCode, errorMessage, email);
				// ...
			});
	};

	var fbProvider = new firebase.auth.FacebookAuthProvider();

	const facebookSignInHandle = () => {
		firebase
			.auth()
			.signInWithPopup(fbProvider)
			.then((result) => {
				/** @type {firebase.auth.OAuthCredential} */
				var credential = result.credential;

				var user = result.user;
				console.log(user);

				var accessToken = credential.accessToken;

				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;

				console.log(errorCode, errorMessage, email);
				// ...
			});
	};
	return (
		<div>
			<div className="App">
				<button onClick={googleSignInHandle}>
					Sign In with Google
				</button>
				<button onClick={facebookSignInHandle}>
					Sign In with Facebook
				</button>
				<h3>name:{user.displayName}</h3>
			</div>
		</div>
	);
};

export default SignIn;
