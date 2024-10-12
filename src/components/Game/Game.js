import { useEffect, useState } from "react";
import GameLayout from "./GameLayout";
import { store } from "../../store";
import { getRandomNumber } from "../../utils/randomNumber";

const getField = () => ["", "", "", "", "", "", "", "", ""];

const Game = () => {
	const [state, setState] = useState(store.getState());

	useEffect(() => {
		const unsubscribe = store.subscribe(() => setState(store.getState()));
		return unsubscribe;
	}, []);
	//Установка первоначального поля
	useEffect(() => {
		const field = getField();

		store.dispatch({ type: "SET_FIELD", payload: field });
	}, []);
	//Установка первого игрока
	useEffect(() => {
		const randomNumber = getRandomNumber();
		store.dispatch({
			type: "SET_CURRENT_PLAYER",
			payload: (state.currentPlayer = randomNumber === 1 ? "X" : "O"),
		});
	}, []);
	//Установка текстового статуса игры
	useEffect(() => {
		const changingGameValue = () => {
			let stateOfGameValue;

			if (state.isDraw) {
				stateOfGameValue = `Ничья`;
				store.dispatch({ type: "SET_STATE_GAME_VALUE", payload: stateOfGameValue });
			}
			if (!state.isDraw && state.isGameEnded) {
				stateOfGameValue = `Победа ${state.currentPlayer}`;
				store.dispatch({
					type: "SET_STATE_GAME_VALUE",
					payload: stateOfGameValue,
				});
			}
			if (!state.isDraw && !state.isGameEnded) {
				stateOfGameValue = `Ходит ${state.currentPlayer}`;
				store.dispatch({
					type: "SET_STATE_GAME_VALUE",
					payload: stateOfGameValue,
				});
			}
		};
		changingGameValue();
	}, [state.isDraw, state.isGameEnded, state.currentPlayer]);

	return <GameLayout />;
};

export default Game;
