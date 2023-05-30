import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticleById, voteArticle } from '../../utils'
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

	const upVote = (article_id) => {
		setArticle((currArticle) => {
			return currArticle.map((article) => {
				if (article.article_id === +article_id) {
					return { ...article, votes: article.votes + 1 }
				}
				return article
			})
		})
		voteArticle(article_id, 1).catch((err) => {
			console.log(err, '<< API response')
			setArticle((currArticle) => {
				return currArticle.map((article) => {
					if (article.article_id === +article_id) {
						return { ...article, votes: article.votes - 1 }
					}
					return article
				})
			})
		})
	}

	const downVote = (article_id) => {
		setArticle((currArticle) => {
			return currArticle.map((article) => {
				if (article.article_id === +article_id) {
					return { ...article, votes: article.votes - 1 }
				}
				return article
			})
		})
		voteArticle(article_id, -1).catch((err) => {
			console.log(err, '<< API response')
			setArticle((currArticle) => {
				return currArticle.map((article) => {
					if (article.article_id === +article_id) {
						return { ...article, votes: article.votes + 1 }
					}
					return article
				})
			})
		})
	}

	if (isLoading) return <p>Loading Page... wait patiently </p>

	return (
		<main className="articleItem">
			{article.map(({ title, author, body, topic, votes, article_img_url }) => {
				return (
					<article key={article_id}>
						<h2>{title}</h2>
						<img
							src={article_img_url}
							alt={title}
						/>
						<p>
							Author: {author} <br></br> Topic: {topic}
						</p>
						<p>{body}</p>
						<section className="voteBlock">
							<p id="vote">Current votes: {votes}</p>
							<button
								className="upVote"
								onClick={() => upVote(article_id)}
							>
								{' '}
								⬆️{' '}
							</button>
							<button
								className="downVote"
								onClick={() => downVote(article_id)}
							>
								{' '}
								⬇️{' '}
							</button>
						</section>
					</article>
				)
			})}
			<section className="commentsSection">
				<Comments article_id={article_id} />
			</section>
		</main>
	)
}
