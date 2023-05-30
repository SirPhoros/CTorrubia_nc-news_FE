import { Link } from 'react-router-dom'

export default function Nav() {
	return (
	<nav className="nav">
			<Link to="/">Home </Link>
			<Link to="/articles">Articles </Link>
		</nav>
	)
}