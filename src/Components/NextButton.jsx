export default function NextButton({ dispatch, answer, index, numQuestions }) {
	if (answer === null) return;

	const isLastQuestion = index === numQuestions - 1;

	return (
		<button
			className="btn btn-ui btn-next"
			onClick={() =>
				dispatch({ type: isLastQuestion ? "finish" : "nextQuestion" })
			}
		>
			{isLastQuestion ? "Finish 🏁" : "Next →"}
		</button>
	);
}