import React, { useContext } from "react";
import { ProfileContext } from "../../App";
import "./Profile.css";

const Profile = () => {
	const [user] = useContext(ProfileContext);
	return (
		<div>
			<div className="profileCard">
				<div className="profilePhoto">
					<img src={user?.photoURL} alt="" />
				</div>
				<div className="info">
					<h3>Name: {user?.displayName}</h3>
					<h4>Email: {user?.email}</h4>
				</div>
			</div>
		</div>
	);
};

export default Profile;
