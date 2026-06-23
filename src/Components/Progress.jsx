export default function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
	const progress = ((index + (answer !== null ? 1 : 0)) / numQuestions) * 100;

	return (
		<header className="progress">
			<div className="progress-bar">
				<progress
					max={numQuestions}
					value={index + (answer !== null ? 1 : 0)}
				/>
				<span className="progress-percentage">{Math.round(progress)}%</span>
			</div>
			<div className="progress-info">
				<p>
					Question <strong>{index + 1}</strong> / {numQuestions}
				</p>
				<p>
					Score: <strong>{points}</strong> / {maxPossiblePoints}
				</p>
			</div>
		</header>
	);
}