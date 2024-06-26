import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./HomeCard.css";
import Zoom from "react-reveal/Zoom";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router";
import { SearchContext } from "../../App";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		margin: "20px 10px",
		padding: "10px",
		width: "30%",
		textAlign: "center",
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default function HomeCard({ category }) {
	const {
		idCategory,
		strCategory,
		strCategoryThumb,
		strCategoryDescription,
	} = category;
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	let history = useHistory();

	const [search, setSearch] = useContext(SearchContext);

	const categoryBtn = (name) => {
		history.push(`/category/${name}`);
		setSearch("");
	};

	return (
		<Card className="homeCard">
			<Zoom right>
				<CardMedia
					className={classes.media}
					image={strCategoryThumb}
				/>
				<CardContent>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						<Button
							variant="contained"
							color="secondary"
							onClick={() =>
								categoryBtn(
									`${strCategory}`
								)
							}
						>
							{strCategory}
						</Button>
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Collapse
					in={expanded}
					timeout="auto"
					unmountOnExit
				>
					<CardContent>
						<Typography>
							{strCategoryDescription}
						</Typography>
					</CardContent>
				</Collapse>
			</Zoom>
		</Card>
	);
}
