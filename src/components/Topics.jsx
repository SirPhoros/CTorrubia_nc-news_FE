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

	if (isLoading)
		return <p className="loading-msg">Loading Topics...</p>

	return (
		<div className="dropdown">
			<button className="dropbtn">
				Topics{' '}
				<i
					className="fa fa-caret-down"
					aria-hidden="true"
				></i>
			</button>
			<div className="dropdown-content">
				{topics.map(({ slug }) => {
					return (
						<p key={slug}>
							<Link to={`/articles/topics/${slug}`}>
								{slug.charAt(0).toUpperCase() + slug.slice(1)}
							</Link>
						</p>
					)
				})}
			</div>
		</div>
	)
}
