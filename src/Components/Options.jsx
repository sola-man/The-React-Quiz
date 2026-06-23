export default function Options({ question, dispatch, answer }) {
	const hasAnswered = answer !== null;
	const isSkipped = answer === -1;

	return (
		<div className="options">
			{question.options.map((option, index) => {
				let className = "btn btn-option";
				if (index === answer && !isSkipped) className += " answer";
				if (hasAnswered && !isSkipped) {
					if (index === question.correctOption) className += " correct";
					else if (index === answer) className += " wrong";
				}
				if (isSkipped && index === question.correctOption)
					className += " correct";

				return (
					<button
						className={className}
						key={option}
						disabled={hasAnswered}
						onClick={() => dispatch({ type: "newAnswer", payload: index })}
					>
						<span className="option-letter">
							{String.fromCharCode(65 + index)}.
						</span>
						{option}
						{hasAnswered && !isSkipped && index === question.correctOption && (
							<span className="option-check">✅</span>
						)}
						{hasAnswered &&
							!isSkipped &&
							index === answer &&
							index !== question.correctOption && (
								<span className="option-check">❌</span>
							)}
						{isSkipped && index === question.correctOption && (
							<span className="option-check">✅</span>
						)}
					</button>
				);
			})}
			{isSkipped && <div className="skipped-notice">⏭️ Question skipped</div>}
		</div>
	);
}
