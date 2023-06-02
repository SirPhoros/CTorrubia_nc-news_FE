import { Link } from 'react-router-dom'

export default function Footer() {
	return (
		<footer className="nav">
			<p>
				A React project by{' '}
				<Link to={'https://github.com/SirPhoros/CTorrubia_nc-news_FE'}>
					Cristóbal Gutiérrez Torrubia
				</Link>
			</p>
		</footer>
	)
}
