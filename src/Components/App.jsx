import { useEffect, useReducer, useState } from "react";
import FinishScreen from "./FinishScreen";
import NextButton from "./NextButton";
import SkipButton from "./SkipButton";
import Timer from "./Timer";
import Footer from "./Footer";
import Question from "./Questions";
import Progress from "./Progress";
import StartScreen from "./StartScreen";
import Loader from "./Loader";
import Main from "./Main";
import Header from "./Header";
import questionsData from "../../data/questionsData.json";

const SECS_PER_QUESTION = 30;

const initialState = {
	questions: [],
	status: "loading", // 'loading', 'error', 'ready', 'active', 'finished'
	index: 0,
	answer: null,
	points: 0,
	highscore: JSON.parse(localStorage.getItem("quizHighScore")) || 0,
	secondsRemaining: null,
	selectedCategory: "all",
	difficulty: "all",
	quizHistory: JSON.parse(localStorage.getItem("quizHistory")) || [],
	skippedQuestions: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return {
				...state,
				questions: action.payload,
				status: "ready",
			};
		case "dataFailed":
			return {
				...state,
				status: "error",
			};
		case "start":
			return {
				...state,
				status: "active",
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case "newAnswer": {
			const question = state.questions.at(state.index);
			const isCorrect = action.payload === question.correctOption;
			return {
				...state,
				answer: action.payload,
				points: isCorrect ? state.points + question.points : state.points,
			};
		}
		case "nextQuestion":
			return { ...state, index: state.index + 1, answer: null };
		case "finish": {
			const newHighScore = Math.max(state.points, state.highscore);
			localStorage.setItem("quizHighScore", JSON.stringify(newHighScore));

			const quizResult = {
				date: new Date().toISOString(),
				score: state.points,
				totalQuestions: state.questions.length,
				totalPossiblePoints: state.questions.reduce(
					(prev, cur) => prev + cur.points,
					0,
				),
				skipped: state.skippedQuestions,
				percentage:
					(state.points /
						state.questions.reduce((prev, cur) => prev + cur.points, 0)) *
					100,
			};
			const updatedHistory = [quizResult, ...state.quizHistory].slice(0, 10);
			localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));

			return {
				...state,
				status: "finished",
				highscore: newHighScore,
				quizHistory: updatedHistory,
			};
		}
		case "restart":
			return {
				...initialState,
				questions: state.questions,
				status: "ready",
				highscore: state.highscore,
				quizHistory: state.quizHistory,
				selectedCategory: state.selectedCategory,
				difficulty: state.difficulty,
			};
		case "tick":
			if (state.secondsRemaining <= 1) {
				const newHighScore = Math.max(state.points, state.highscore);
				localStorage.setItem("quizHighScore", JSON.stringify(newHighScore));
				return {
					...state,
					secondsRemaining: 0,
					status: "finished",
					highscore: newHighScore,
				};
			}
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
			};
		case "filterQuestions":
			return {
				...state,
				selectedCategory: action.payload.category,
				difficulty: action.payload.difficulty,
			};
		case "skipQuestion":
			return {
				...state,
				answer: -1,
				skippedQuestions: state.skippedQuestions + 1,
			};
		default:
			throw new Error("Action unknown");
	}
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [darkMode, setDarkMode] = useState(false);

	const {
		questions,
		status,
		index,
		answer,
		points,
		highscore,
		secondsRemaining,
		selectedCategory,
		difficulty,
		quizHistory,
		skippedQuestions,
	} = state;

	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		0,
	);
	const currentQuestion = questions[index];

	useEffect(() => {
		setTimeout(() => {
			let filteredData = questionsData.questions || questionsData;

			if (selectedCategory !== "all") {
				filteredData = filteredData.filter(
					(q) =>
						q.category &&
						q.category.toLowerCase() === selectedCategory.toLowerCase(),
				);
			}

			if (difficulty !== "all") {
				filteredData = filteredData.filter(
					(q) =>
						q.difficulty &&
						q.difficulty.toLowerCase() === difficulty.toLowerCase(),
				);
			}

			dispatch({ type: "dataReceived", payload: filteredData });
		}, 500);
	}, [selectedCategory, difficulty]);

	// Keyboard shortcuts
	useEffect(() => {
		const handleKeyPress = (e) => {
			if (status === "active" && currentQuestion) {
				if (e.key >= "1" && e.key <= "4") {
					const optionIndex = parseInt(e.key) - 1;
					if (optionIndex < currentQuestion.options.length && answer === null) {
						dispatch({ type: "newAnswer", payload: optionIndex });
					}
				}
				if (e.key === "Enter" && answer !== null) {
					if (index < numQuestions - 1) {
						dispatch({ type: "nextQuestion" });
					} else {
						dispatch({ type: "finish" });
					}
				}
				if ((e.key === "s" || e.key === "S") && answer === null) {
					dispatch({ type: "skipQuestion" });
					setTimeout(() => dispatch({ type: "nextQuestion" }), 300);
				}
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [status, answer, index, numQuestions, currentQuestion, dispatch]);

	return (
		<div className={`app ${darkMode ? "dark-mode" : ""}`}>
			<Header darkMode={darkMode} setDarkMode={setDarkMode} />
			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen
						numQuestions={numQuestions}
						dispatch={dispatch}
						selectedCategory={selectedCategory}
						difficulty={difficulty}
					/>
				)}
				{status === "active" && currentQuestion && (
					<>
						<Progress
							index={index}
							numQuestions={numQuestions}
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}
						/>
						<Question
							question={currentQuestion}
							dispatch={dispatch}
							answer={answer}
							questionNumber={index + 1}
							totalQuestions={numQuestions}
						/>
						<Footer>
							<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
							<div className="footer-buttons">
								<SkipButton dispatch={dispatch} answer={answer} />
								<NextButton
									dispatch={dispatch}
									answer={answer}
									index={index}
									numQuestions={numQuestions}
								/>
							</div>
						</Footer>
					</>
				)}
				{status === "finished" && (
					<FinishScreen
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						highscore={highscore}
						dispatch={dispatch}
						questions={questions}
						quizHistory={quizHistory}
						skippedQuestions={skippedQuestions}
					/>
				)}
			</Main>
		</div>
	);
}
