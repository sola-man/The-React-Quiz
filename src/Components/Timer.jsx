import { useEffect } from "react";

export default function Timer({ dispatch, secondsRemaining }) {
	const mins = Math.floor(secondsRemaining / 60);
	const seconds = secondsRemaining % 60;
	const isLowTime = secondsRemaining < 30;

	useEffect(() => {
		const id = setInterval(() => {
			dispatch({ type: "tick" });
		}, 1000);
		return () => clearInterval(id);
	}, [dispatch]);

	return (
		<div className={`timer ${isLowTime ? "low-time" : ""}`}>
			⏱️ {mins < 10 && "0"}
			{mins}:{seconds < 10 && "0"}
			{seconds}
			{isLowTime && <span className="warning">⚠️ Hurry up!</span>}
		</div>
	);
}