import { Button, FormControlLabel, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { ProfileContext } from "../../App";
import "./SignUp.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import Switch from "@material-ui/core/Switch";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app();
}

const SignUpPage = () => {
	const [newUser, setNewUser] = useState(true);
	const [localUser, setLocalUser] = useState({});
	const [user, setUser] = useContext(ProfileContext);

	//
	let history = useHistory();
	let location = useLocation();
	let { from } = location.state || { from: { pathname: "/" } };

	// check Button:
	const [checkButton, setCheckButton] = useState({
		gilad: true,
	});
	const handleChange = (event) => {
		setCheckButton({
			...checkButton,
			[event.target.name]: event.target.checked,
		});
		setNewUser(newUser ? false : true);
	};

	//

	const getFormData = (e) => {
		let isFormValid = true;

		if (e.target.name === "email") {
			isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
		}
		if (e.target.name === "password") {
			const passwordLength = e.target.value.length > 5;
			const passwordChecker = /\d{1}/.test(e.target.value);
			isFormValid = passwordLength && passwordChecker;
		}
		if (isFormValid) {
			const newUser = { ...localUser };
			newUser[e.target.name] = e.target.value;
			setLocalUser(newUser);
		}
	};
	const submitButtonClick = (e) => {
		if (newUser && localUser.email && localUser.password) {
			firebase
				.auth()
				.createUserWithEmailAndPassword(
					localUser.email,
					localUser.password
				)
				.then((res) => {
					// Signed in
					var newUser = res.user;
					newUser.isSingdIn = true;
					newUser.success = true;

					setUser(newUser);
					updateUser(localUser.name);
					history.replace(from);
				})
				.catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					// ..
					console.log(errorCode, errorMessage);
				});
			e.preventDefault();
		}
		if (!newUser && localUser.email && localUser.password) {
			firebase
				.auth()
				.signInWithEmailAndPassword(
					localUser.email,
					localUser.password
				)
				.then((res) => {
					// Signed in
					var newUser = res.user;
					newUser.isSingdIn = true;
					newUser.success = true;

					setUser(newUser);
					history.replace(from);
					// ...
				})
				.catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					console.log(errorCode, errorMessage);
				});
			e.preventDefault();
		}

		e.preventDefault();
	};

	const updateUser = (name) => {
		var user = firebase.auth().currentUser;

		user.updateProfile({
			displayName: name,
		})
			.then(function () {
				// Update successful.
			})
			.catch(function (error) {
				// An error happened.
			});
	};
	return (
		<div>
			<form
				action=""
				className=" signupForm"
				onSubmit={submitButtonClick}
			>
				<FormControlLabel
					control={
						<Switch
							checked={checkButton.gilad}
							onChange={handleChange}
							name="gilad"
						/>
					}
					label="Create New Account"
				/>
				{checkButton.gilad && (
					<div className="formFiled">
						<TextField
							style={{ color: "red" }}
							id="outlined-basic"
							label="Full Name"
							variant="outlined"
							type="text"
							name="name"
							onBlur={getFormData}
						/>
					</div>
				)}

				<div className="formFiled">
					<TextField
						id="outlined-basic"
						label="Email"
						variant="outlined"
						type="email"
						required
						name="email"
						onBlur={getFormData}
					/>
				</div>
				<div className="formFiled">
					<TextField
						id="outlined-basic"
						label="Password"
						variant="outlined"
						type="password"
						required
						name="password"
						onBlur={getFormData}
					/>
				</div>
				{checkButton.gilad && (
					<div className="formFiled">
						<TextField
							id="outlined-basic"
							label="Your City"
							variant="outlined"
							type="text"
							name="city"
							onBlur={getFormData}
						/>
					</div>
				)}
				<div className="formFiled">
					<Button
						variant="outlined"
						color="secondary"
						type="submit"
					>
						{checkButton.gilad
							? "Submit"
							: "Log In"}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignUpPage;
