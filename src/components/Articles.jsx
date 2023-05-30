import { useEffect, useState } from 'react'
import { getArticles } from '../../utils'

export default function Items() {
	const [currArticles, setCurrArticles] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getArticles().then(({ articles }) => {
			setCurrArticles(articles)
			setIsLoading(false)
		})
	}, [])

	if (isLoading) return <p>Loading Page... wait patiently </p>

	return (
		<main className="articlesList">
			<h2>Articles: </h2>
			<ul>
				{currArticles.map(
					({ article_id, title, topic, author, comment_count }) => {
						return (
							<li
								key={article_id}
								className="articleItem"
							>
								<article>
									<h3>{title}</h3>
									<p>{topic}</p>
									<p>{author}</p>
									<p>Comments: {comment_count}</p>
								</article>
							</li>
						)
					}
				)}
			</ul>
		</main>
	)
}
