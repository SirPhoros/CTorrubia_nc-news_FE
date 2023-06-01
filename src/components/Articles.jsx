import { useEffect, useState } from 'react'
import { getArticles } from '../../utils'
import { Link, useSearchParams } from 'react-router-dom'
import ErrorPage from './ErrorPage'

export default function Items() {
	const [currArticles, setCurrArticles] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [searchParams] = useSearchParams()
	const topic = searchParams.get('topic')

	useEffect(() => {
		getArticles(topic)
			.then(({ articles }) => {
				setCurrArticles(articles)
				setIsLoading(false)
			})
			.catch((err) => {
				setIsLoading(false)
				setError(err.response)
				err.response.data.msg = "Topic not found"
			})
	}, [topic])

	if (isLoading) return <p>Loading Page... wait patiently </p>

	return error ? (
		<ErrorPage error={error} />
	) : (
		<main className="articlesList">
			<h2>Articles: </h2>
			<ul>
				{currArticles.map(
					({
						article_id,
						title,
						topic,
						author,
						comment_count,
						article_img_url,
					}) => {
						return (
							<li
								key={article_id}
								className="articleItem"
							>
								<article>
									<h3>
										<Link to={`/articles/${article_id}`}>{title}</Link>
									</h3>
									<img
										src={article_img_url}
										alt={title}
									/>
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
