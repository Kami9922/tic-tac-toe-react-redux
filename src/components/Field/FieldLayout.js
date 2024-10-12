import React, { useEffect, useState } from "react";
import styles from "./../../css/field.module.css";
import { store } from "../../store";
import { WIN_PATTERNS } from "../../constants";

const FieldLayout = () => {
	const [state, setState] = useState(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => setState(store.getState()));
		return unsubscribe;
	}, []);

	const checkForDraw = (arrayToCheck) => {
		if (!arrayToCheck.includes("")) {
			store.dispatch({ type: "SET_IS_GAME_ENDED", payload: true });
			store.dispatch({ type: "SET_IS_DRAW", payload: true });
		}
	};

	return (
		<div className={styles.field}>
			{state.field?.map((item, index) => {
				return (
					<div
						key={index}
						className={styles["game-sector"]}
						onClick={() => {
							if (!state.isGameEnded && state.field[index] === "") {
								const newField = [...state.field];
								newField[index] = state.currentPlayer;
								store.dispatch({ type: "SET_FIELD", payload: newField });
								if (
									WIN_PATTERNS.some((pattern) =>
										pattern.every((index) => newField[index] === state.currentPlayer),
									)
								) {
									store.dispatch({ type: "SET_IS_GAME_ENDED", payload: true });
								} else {
									store.dispatch({
										type: "SET_CURRENT_PLAYER",
										payload: state.currentPlayer === "X" ? "O" : "X",
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
