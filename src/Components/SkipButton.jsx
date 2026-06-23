export default function SkipButton({ dispatch, answer }) {
	if (answer !== null) return null;

	return (
		<button
			className="btn btn-ui btn-skip"
			onClick={() => {
				dispatch({ type: "skipQuestion" });
				setTimeout(() => dispatch({ type: "nextQuestion" }), 300);
			}}
		>
			Skip ⏭️
		</button>
	);
}