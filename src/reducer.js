export const initialState = {
	currentPlayer: "X",
	field: ["", "", "", "", "", "", "", "", ""],
	isDraw: false,
	isGameEnded: false,
};

export const appReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case "SET_CURRENT_PLAYER":
			return { ...state, currentPlayer: payload };
		case "SET_FIELD":
			return { ...state, field: payload };
		case "SET_IS_DRAW":
			return { ...state, isDraw: payload };
		case "SET_IS_GAME_ENDED":
			return { ...state, isGameEnded: payload };
		case "SET_STATE_GAME_VALUE":
			return { ...state, stateOfGameValue: payload };
		default:
			return state;
	}
};
