import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'

export default function Nav() {
	const {
		user: { username },
	} = useContext(UserContext)
	return (
		<nav className="nav">
			<Link to="/">Home </Link>
			<Link to="/articles">Articles </Link>
			<Link to="/topics">Topics </Link>

			<section className="profile">
				Welcome: <Link to="/users">{username} </Link>{' '}
			</section>
		</nav>
	)
}
