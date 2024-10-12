import React, { useEffect, useState } from "react";
import styles from "./../../css/information.module.css";
import { store } from "../../store";

const InformationLayout = () => {
	const [state, setState] = useState(store.getState());
	useEffect(() => {
		const unsubscribe = store.subscribe(() => setState(store.getState()));
		return unsubscribe;
	}, []);
	return (
		<div
			className={`${styles.information} ${state.stateOfGameValue === `Победа` ? styles["information-win"] : ""}`}
		>
			{state.stateOfGameValue}
		</div>
	);
};

export default InformationLayout;
