import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { createMuiTheme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router";
import { SearchContext } from "../../../App";
import Zoom from "react-reveal/Zoom";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		width: "300px",
		padding: "20px;",
		margin: "10px",
	},
	media: {
		height: 140,
	},
});

export default function CategoryDetailsCard({ CategoryResult }) {
	const classes = useStyles();
	const [search, setSearch] = useContext(SearchContext);

	const { strMeal, strMealThumb, idMeal } = CategoryResult;
	const [color, setColor] = useState("");
	const lovaHandle = () => {
		const loveColor = color ? "" : "secondary";
		setColor(loveColor);
	};
	const footerPartStyle = {
		display: "flex",
		justifyContent: "space-between",
	};

	const history = useHistory();
	const foodDetails = (id) => {
		history.push(`/fooddetails/${id}`);
		setSearch("");
	};

	return (
		<Zoom right>
			<Card className={classes.root}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={strMealThumb}
					/>
					<CardContent>
						<Typography
							gutterBottom
							variant="h6"
							component="h2"
						>
							{strMeal}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions
					style={footerPartStyle}
					className="footerPart"
				>
					<IconButton>
						<FavoriteIcon
							onClick={lovaHandle}
							color={color}
							aria-label="FavoriteIcon"
						></FavoriteIcon>
					</IconButton>

					<Button
						size="small"
						color="primary"
						variant="contained"
						onClick={() => foodDetails(idMeal)}
					>
						Show Recipe
					</Button>
				</CardActions>
			</Card>
		</Zoom>
	);
}
