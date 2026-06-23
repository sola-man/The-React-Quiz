export default function Header({ darkMode, setDarkMode }) {
	return (
		<header className="app-header">
			<div className="header-content">
				<img src="logo512.png" alt="React logo" />
				<h1>The React Quiz</h1>
			</div>
			<button
				className="btn dark-mode-toggle"
				onClick={() => setDarkMode(!darkMode)}
				aria-label="Toggle dark mode"
			>
				{darkMode ? "☀️" : "🌙"}
			</button>
		</header>
	);
}