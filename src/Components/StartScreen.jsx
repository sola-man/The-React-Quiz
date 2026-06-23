export default function StartScreen({ numQuestions, dispatch, selectedCategory, difficulty }) {
	const categories = ["all", "react", "javascript", "css", "html"];
	const difficulties = ["all", "easy", "medium", "hard"];

	return (
		<div className="start">
			<h2>Welcome to The React Quiz!</h2>
			<h3>{numQuestions} questions to test your mastery</h3>

			<div className="filter-container">
				<div className="filter-group">
					<label>Category:</label>
					<select
						value={selectedCategory}
						onChange={(e) =>
							dispatch({
								type: "filterQuestions",
								payload: { category: e.target.value, difficulty },
							})
						}
						className="select"
					>
						{categories.map((cat) => (
							<option key={cat} value={cat} className="category">
								{cat.charAt(0).toUpperCase() + cat.slice(1)}
								
							</option>
						))}
					</select>
				</div>

				<div className="filter-group">
					<label>Difficulty:</label>
					<select
						value={difficulty}
						onChange={(e) =>
							dispatch({
								type: "filterQuestions",
								payload: {
									category: selectedCategory,
									difficulty: e.target.value,
								},
							})
						}
					>
						{difficulties.map((diff) => (
							<option key={diff} value={diff}>
								{diff.charAt(0).toUpperCase() + diff.slice(1)}
							</option>
						))}
					</select>
				</div>
			</div>

			<button
				className="btn btn-ui btn-start"
				onClick={() => dispatch({ type: "start" })}
				disabled={numQuestions === 0}
			>
				{numQuestions === 0 ? "No questions available" : "Let's start 🚀"}
			</button>

			{numQuestions === 0 && (
				<p className="no-questions">Try selecting different filters</p>
			)}
		</div>
	);
}