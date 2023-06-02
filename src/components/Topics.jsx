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
		<div class="dropdown">
			<button class="dropbtn">
				Topics{' '}
				<i
					class="fa fa-caret-down"
					aria-hidden="true"
				></i>
			</button>
			<div class="dropdown-content">
				{topics.map(({ slug }) => {
					return (
						<li key={slug}>
							<Link to={`/articles/topics/${slug}`}>
								{slug.charAt(0).toUpperCase() + slug.slice(1)}
								<br />
								<br />
							</Link>
						</li>
					)
				})}
			</div>
		</div>
	)
}
