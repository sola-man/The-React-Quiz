export default function FinishScreen({
	points,
	maxPossiblePoints,
	highscore,
	dispatch,
	questions,
	quizHistory,
	skippedQuestions,
}) {
	const percentage = (points / maxPossiblePoints) * 100;
	const answeredQuestions = questions.length - skippedQuestions;

	let emoji;
	if (percentage === 100) emoji = "🥇";
	else if (percentage >= 80) emoji = "🎉";
	else if (percentage >= 50) emoji = "😊";
	else if (percentage >= 20) emoji = "😔";
	else emoji = "🤦‍♂️";

	return (
		<div className="finish-screen">
			<div className="result-card">
				<h2>Quiz Complete! {emoji}</h2>
				<p className="result">
					You scored <strong>{points}</strong> out of {maxPossiblePoints} (
					{Math.ceil(percentage)}%)
				</p>
				<p className="highscore">🏆 Highscore: {highscore} points</p>
				<div className="stats-grid">
					<div className="stat-item">
						<span className="stat-label">Questions</span>
						<span className="stat-value">{questions.length}</span>
					</div>
					<div className="stat-item">
						<span className="stat-label">Total Answered Questions</span>
						<span className="stat-value">{answeredQuestions}</span>
					</div>
					<div className="stat-item">
						<span className="stat-label">Total Skipped Questions</span>
						<span className="stat-value">{skippedQuestions}</span>
					</div>
					<div className="stat-item">
						<span className="stat-label">Accuracy</span>
						<span className="stat-value">{Math.round(percentage)}%</span>
					</div>
				</div>
			</div>

			{quizHistory.length > 0 && (
				<div className="history-section">
					<h3>Recent Quiz History</h3>
					<div className="history-list">
						{quizHistory.slice(0, 5).map((attempt, i) => (
							<div key={i} className="history-item">
								<span className="history-date">
									{new Date(attempt.date).toLocaleDateString()}
								</span>
								<span className="history-score">
									{attempt.score} pts ({Math.round(attempt.percentage)}%)
								</span>
								<span className="history-skipped">
									⏭️ {attempt.skipped || 0}
								</span>
							</div>
						))}
					</div>
				</div>
			)}

			<div className="finish-actions">
				<button
					className="btn btn-ui"
					onClick={() => dispatch({ type: "restart" })}
				>
					🔄 Restart Quiz
				</button>
				<button
					className="btn btn-ui btn-secondary"
					onClick={() => window.location.reload()}
				>
					New Quiz &rArr;
				</button>
			</div>
		</div>
	);
}