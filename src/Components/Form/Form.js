import React from "react";
import AutoSignInPage from "../AutoSignIn/AutoSignInpage";
import SignUpPage from "../SignUp/SignUpPage";
import "./Form.css";

const Form = () => {
	return (
		<div>
			<div className="row">
				<div className="colum">
					<SignUpPage></SignUpPage>
				</div>
				<div className="colum autoSignIn">
					<AutoSignInPage></AutoSignInPage>
				</div>
			</div>
		</div>
	);
};

export default Form;
