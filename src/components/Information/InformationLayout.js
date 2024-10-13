import { useSelector } from "react-redux";
import styles from "./../../css/information.module.css";

const InformationLayout = () => {
	let stateOfGameValue = useSelector((state) => state.stateOfGameValue);
	return (
		<div
			className={`${styles.information} ${stateOfGameValue === `Победа` ? styles["information-win"] : ""}`}
		>
			{stateOfGameValue}
		</div>
	);
};

export default InformationLayout;
