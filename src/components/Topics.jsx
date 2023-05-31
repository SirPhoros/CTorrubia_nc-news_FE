import { useEffect, useState } from 'react'
import { getTopics } from '../../utils'
import { Link } from 'react-router-dom'

export default function Topics() {
	const [topics, setTopics] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getTopics().then(({ topics }) => {
			setTopics(topics)
			setIsLoading(false)
		})
	}, [])

	if (isLoading) return <p>Loading Page... wait patiently </p>

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
