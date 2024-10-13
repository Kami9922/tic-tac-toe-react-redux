// import React, { useEffect, useState } from "react";
import styles from "./../../css/field.module.css";
import { WIN_PATTERNS } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPlayer } from "../../selectors/select-currentPlayer";
import { selectField } from "../../selectors/select-field";
import { selectIsGameEnded } from "../../selectors/select-isGameEnded";

const FieldLayout = () => {
	const currentPlayer = useSelector(selectCurrentPlayer);
	const field = useSelector(selectField);
	const isGameEnded = useSelector(selectIsGameEnded);

	const dispatch = useDispatch();

	const checkForDraw = (arrayToCheck) => {
		if (!arrayToCheck.includes("")) {
			dispatch({ type: "SET_IS_GAME_ENDED", payload: true });
			dispatch({ type: "SET_IS_DRAW", payload: true });
		}
	};

	return (
		<div className={styles.field}>
			{field.map((item, index) => {
				return (
					<div
						key={index}
						className={styles["game-sector"]}
						onClick={() => {
							if (!isGameEnded && field[index] === "") {
								const newField = [...field];
								newField[index] = currentPlayer;
								dispatch({ type: "SET_FIELD", payload: newField });
								if (
									WIN_PATTERNS.some((pattern) =>
										pattern.every((index) => newField[index] === currentPlayer),
									)
								) {
									dispatch({ type: "SET_IS_GAME_ENDED", payload: true });
								} else {
									dispatch({
										type: "SET_CURRENT_PLAYER",
										payload: currentPlayer === "X" ? "O" : "X",
									});
									checkForDraw(newField);
								}
							}
						}}
					>
						{item}
					</div>
				);
			})}
		</div>
	);
};

export default FieldLayout;
