import React, { createContext, useContext, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { ProfileContext, SearchContext } from "../../App";
import logo from "../../Images/logo.png";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router";
import "./TopHeader.css";
import CancelIcon from "@material-ui/icons/Cancel";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import firebase from "firebase/app";
import "firebase/auth";

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
		backgroundColor: "white",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		width: "100px",
		marginRight: 30,
		marginLeft: 30,
		height: "100px",
	},

	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(10),
		marginLeft: theme.spacing(10),
		width: "70%",
		[theme.breakpoints.up("large")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	searchIcon: {
		height: "100%",
		position: "absolute",
		left: "95%",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
	},
	inputRoot: {
		color: "inherit",
		fullWidth: "true",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(4em + ${theme.spacing(9)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));

//

export default function TopHeader() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	// Log in page Open:
	const history = useHistory();
	const LoginPagePush = () => {
		history.push("/login");
	};
	// Context:
	const [search, setSearch] = useContext(SearchContext);
	const [user, setUser] = useContext(ProfileContext);
	// Search Items:
	const SearhItemHandle = (e) => {
		setSearch(e.target.value);
	};
	// Profile Open: https:
	const profileOpen = () => {
		document.getElementById("profileCard").style.display = "block";
	};
	// closeProfile
	const closeProfile = () => {
		document.getElementById("profileCard").style.display = "none";
	};
	// Log Out:
	const logOut = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
			});
	};
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
			onClick={handleMenuClose}
		>
			<MenuItem onClick={profileOpen}>Profile</MenuItem>
			{user?.email ? (
				<MenuItem onClick={logOut}>Log Out</MenuItem>
			) : (
				<MenuItem onClick={LoginPagePush}>Log In</MenuItem>
			)}
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton
					aria-label="show 4 new mails"
					color="inherit"
				>
					<Badge badgeContent={4} color="secondary">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					aria-label="show 11 new notifications"
					color="inherit"
				>
					<Badge badgeContent={11} color="secondary">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar
				position="static"
				style={{
					backgroundColor: "white",
					color: "black",
				}}
			>
				<Toolbar>
					<div
						className={classes.title}
						variant="h6"
						noWrap
					>
						<img
							src={logo}
							alt=""
							style={{ height: "100px" }}
						/>
					</div>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<TextField
							placeholder="Search Your Food"
							classes={{
								root: classes.inputRoot,
								input:
									classes.inputInput,
							}}
							id="filled-full-width searchBox"
							style={{ margin: 8 }}
							fullWidth
							margin="normal"
							inputProps={{
								"aria-label": "search",
							}}
							onChange={SearhItemHandle}
							value={search}
						/>
					</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<IconButton
							aria-label="show 4 new mails"
							color="inherit"
						>
							<Badge
								badgeContent={4}
								color="secondary"
							>
								<MailIcon />
							</Badge>
						</IconButton>
						<IconButton
							aria-label="show 17 new notifications"
							color="inherit"
						>
							<Badge
								badgeContent={17}
								color="secondary"
							>
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
				<div className="profileCard" id={"profileCard"}>
					<Button
						variant="contained"
						color="secondary"
						className="closeButton"
						onClick={closeProfile}
					>
						<CancelIcon></CancelIcon>
					</Button>
					<div className="profilePhoto">
						<img src={user?.photoURL} alt="" />
					</div>
					<div className="info">
						<h3>Name: {user?.displayName}</h3>
						<h4>Email: {user?.email}</h4>
					</div>
					<Button
						variant="contained"
						color="primary"
						className="logOut"
						onClick={logOut}
					>
						<ExitToAppIcon></ExitToAppIcon>
						Log Out
					</Button>
				</div>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}
