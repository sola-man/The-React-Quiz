export  default function Error() {
	return (
		<div className="error">
			<span>💥</span> There was an error fetching questions.
			<button className="btn btn-ui" onClick={() => window.location.reload()}>
				Retry
			</button>
		</div>
	);
}