import React from "react";
import Information from "../Information/Information";
import Field from "../Field/Field";
import styles from "./../../css/game.module.css";
import { store } from "../../store";

const GameLayout = () => {
	return (
		<div>
			<Information />
			<Field />
			<div
				className={styles["reset-button"]}
				onClick={() => {
					store.dispatch({ type: "SET_CURRENT_PLAYER", payload: "X" });
					store.dispatch({
						type: "SET_FIELD",
						payload: ["", "", "", "", "", "", "", "", ""],
					});
					store.dispatch({ type: "SET_IS_DRAW", payload: false });
					store.dispatch({ type: "SET_IS_GAME_ENDED", payload: false });
				}}
			>
				Начать заново
			</div>
		</div>
	);
};

export default GameLayout;
