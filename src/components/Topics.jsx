import { useEffect, useState } from 'react'
import { getTopics } from '../../utils'
import { Link } from 'react-router-dom'

export default function Topics() {
	const [topics, setTopics] = useState([])

	useEffect(() => {
		getTopics().then(({ topics }) => {
			setTopics(topics)
		})
	}, [])

	return (
		<main>
			<h2>Topics: </h2>
			<ul>
				{topics.map(({ slug }) => {
					return (
						<li key={slug}>
							<Link to={`/articles?topic=${slug}`}>{slug}</Link>
						</li>
					)
				})}
			</ul>
		</main>
	)
}
