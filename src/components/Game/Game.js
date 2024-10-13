import { useEffect } from "react";
import GameLayout from "./GameLayout";
import { getRandomNumber } from "../../utils/randomNumber";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPlayer } from "../../selectors/select-currentPlayer";
import { selectIsGameEnded } from "../../selectors/select-isGameEnded";
import { selectIsDraw } from "../../selectors/select-isDraw";

const Game = () => {
	const currentPlayer = useSelector(selectCurrentPlayer);
	const isGameEnded = useSelector(selectIsGameEnded);
	const isDraw = useSelector(selectIsDraw);

	const dispatch = useDispatch();

	//Установка первого игрока
	useEffect(() => {
		const randomNumber = getRandomNumber();
		dispatch({
			type: "SET_CURRENT_PLAYER",
			payload: randomNumber === 1 ? "X" : "O",
		});
	}, [dispatch]);

	// Установка текстового статуса игры
	useEffect(() => {
		const changingGameValue = () => {
			let stateOfGameValue;

			if (isDraw) {
				stateOfGameValue = `Ничья`;
				dispatch({ type: "SET_STATE_GAME_VALUE", payload: stateOfGameValue });
			}
			if (!isDraw && isGameEnded) {
				stateOfGameValue = `Победа ${currentPlayer}`;
				dispatch({
					type: "SET_STATE_GAME_VALUE",
					payload: stateOfGameValue,
				});
			}
			if (!isDraw && !isGameEnded) {
				stateOfGameValue = `Ходит ${currentPlayer}`;
				dispatch({
					type: "SET_STATE_GAME_VALUE",
					payload: stateOfGameValue,
				});
			}
		};
		changingGameValue();
	}, [isDraw, isGameEnded, currentPlayer, dispatch]);

	return <GameLayout />;
};

export default Game;
