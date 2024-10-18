import React from "react";
import Information from "../Information/Information";
import Field from "../Field/Field";
import styles from "./../../css/game.module.css";
import { useDispatch } from "react-redux";

const GameLayout = () => {
	const dispatch = useDispatch();

	return (
		<div>
			<Information />
			<Field />
			<div
				className={styles["reset-button"]}
				onClick={() => {
					dispatch({ type: "SET_CURRENT_PLAYER", payload: "X" });
					dispatch({
						type: "SET_FIELD",
						payload: ["", "", "", "", "", "", "", "", ""],
					});
					dispatch({ type: "SET_IS_DRAW", payload: false });
					dispatch({ type: "SET_IS_GAME_ENDED", payload: false });
				}}
			>
				Начать заново
			</div>
		</div>
	);
};

export default GameLayout;
