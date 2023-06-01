import { Link } from 'react-router-dom'

export default function ErrorPage() {
	return (
		<>
			<h2 className="error-title">Oops... something went wrong</h2>
			<h3 className="error-text">
				Did you get lost? Do not worry, sometimes it happens...
			</h3>
			<p>We will help you. Press this button to go back to the main page:</p>
			<button>
				<Link to="/">Home </Link>
			</button>
		</>
	)
}
