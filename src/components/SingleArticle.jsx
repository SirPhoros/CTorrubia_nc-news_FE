import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticleById } from '../../utils'
import Comments from './Comments'

export default function SingleArticle() {
	const [article, setArticle] = useState([])

	const [isLoading, setIsLoading] = useState(true)
	const { article_id } = useParams()

	useEffect(() => {
		getArticleById(article_id).then(({ article }) => {
			setArticle(article)
			setIsLoading(false)
		})
	}, [])

	if (isLoading) return <p>Loading Page... wait patiently </p>

	return (
		<main className="articleItem">
			{article.map(({ title, author, body, topic, votes, article_img_url }) => {
				return (
					<article>
						<h2>{title}</h2>
						<img
							src={article_img_url}
							alt={title}
						/>
						<p>
							Author: {author} <br></br> Topic: {topic}
						</p>
						<p>{body}</p>
						<p>Votes: {votes}</p>
					</article>
				)
			})}
			<section className="commentsSection">
				<Comments article_id={article_id} />
			</section>
		</main>
	)
}
