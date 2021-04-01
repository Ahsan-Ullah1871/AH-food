import logo from "./logo.svg";
import "./App.css";
import Home from "./Components/Home/Home";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
	useLocation,
} from "react-router-dom";
import SearchItems from "./Components/SearchItems/SearchItems";
import { createContext, useEffect, useState } from "react";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import LogIn from "./Components/LoginPage/LogIn";
import FoodDetails from "./Components/FoodDetails/FoodDetails";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Footer from "./Components/Footer/Footer";
import firebase from "firebase/app";
import "firebase/auth";

export const SearchContext = createContext();
export const ProfileContext = createContext();

function App() {
	const [search, setSearch] = useState("");
	const [user, setUser] = useState();

	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				setUser(user);
			} else {
				setUser();
			}
		});
	}, []);

	return (
		<SearchContext.Provider value={[search, setSearch]}>
			<ProfileContext.Provider value={[user, setUser]}>
				<div>
					<Router>
						<Switch>
							<Route exact path="/">
								{search === "" ? (
									<Home></Home>
								) : (
									<SearchItems></SearchItems>
								)}
							</Route>
							<Route exact path="/login">
								{search === "" ? (
									<LogIn></LogIn>
								) : (
									<SearchItems></SearchItems>
								)}
							</Route>
							<Route path="/home">
								{search === "" ? (
									<Home></Home>
								) : (
									<SearchItems></SearchItems>
								)}
							</Route>
							<Route path="/category/:name">
								{search === "" ? (
									<CategoryDetails></CategoryDetails>
								) : (
									<SearchItems></SearchItems>
								)}
							</Route>
							<PrivateRoute path="/fooddetails/:id">
								{search === "" ? (
									<FoodDetails></FoodDetails>
								) : (
									<SearchItems></SearchItems>
								)}
							</PrivateRoute>
						</Switch>
						<Footer></Footer>
					</Router>
				</div>
			</ProfileContext.Provider>
		</SearchContext.Provider>
	);
}

export default App;
