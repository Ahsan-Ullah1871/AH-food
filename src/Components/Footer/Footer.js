import React from "react";
import "./Footer.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Link as a } from "react-router-dom";
import CopyrightIcon from "@material-ui/icons/Copyright";

const Footer = () => {
	return (
		<div>
			<div className="footerCard">
				<div className="icons">
					<a
						href="https://www.facebook.com/Ahsan1871/"
						target="_blank"
					>
						<FacebookIcon
							style={{ fontSize: "50px" }}
						></FacebookIcon>
					</a>
					<a
						href="https://twitter.com/AhsanUl06147007"
						target="_blank"
					>
						<TwitterIcon
							style={{ fontSize: "50px" }}
						></TwitterIcon>
					</a>
					<a
						href="https://www.youtube.com/channel/UCkmGfi4w60qQa34z-YwD3hQ"
						target="_blank"
					>
						<YouTubeIcon
							style={{ fontSize: "50px" }}
						></YouTubeIcon>
					</a>
				</div>
				<p>©2021 AH-food. All rights reserved.</p>
			</div>
		</div>
	);
};

export default Footer;
