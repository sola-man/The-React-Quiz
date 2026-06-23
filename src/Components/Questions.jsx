import Options from "./Options";

export default function Question({ question, dispatch, answer, questionNumber, totalQuestions,}) {
	return (
		<div className="question-container">
			<div className="question-header">
				<span className="question-counter">
					Question {questionNumber} of {totalQuestions}
				</span>
				{question.category && (
					<span className="question-category">📚 {question.category[0].toUpperCase() + question.category.slice(1)}</span>
				)}
				{question.difficulty && (
					<span className={`question-difficulty ${question.difficulty}`}>
						{question.difficulty === "easy" && "🟢"}
						{question.difficulty === "medium" && "🟡"}
						{question.difficulty === "hard" && "🔴"}
						{question.difficulty.toUpperCase()}
					</span>
				)}
			</div>
			<h4 className="question-text">{question.question}</h4>
			<Options question={question} dispatch={dispatch} answer={answer} />
			{answer === null && (
				<div className="keyboard-hint">
					Press 1-4 to select answer, S to skip
				</div>
			)}
		</div>
	);
}