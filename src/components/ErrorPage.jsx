import { Link } from 'react-router-dom'

export default function ErrorPage({ error }) {
	return error ? (
		<>
			<h1 className="error">
				Error {error.status}: {error.data.msg}
			</h1>
			<p> Press this button to go back to the home page:</p>

			<button>
				<Link to="/">Home </Link>
			</button>
		</>
	) : (
		<>
			<h1 className="error-title">Oops... something went wrong</h1>
			<h2 className="error-text">
				Did you get lost? Do not worry, sometimes it happens...
			</h2>
			<p>We will help you. Press this button to go back to the home page:</p>

			<button>
				<Link to="/">Home </Link>
			</button>
		</>
	)
}
