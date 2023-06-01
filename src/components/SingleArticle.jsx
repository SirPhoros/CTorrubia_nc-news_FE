import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticleById, voteArticle } from '../../utils'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import ErrorPage from './ErrorPage'
import moment from 'moment'

export default function SingleArticle() {
	const [error, setError] = useState(null)
	const [article, setArticle] = useState([])
	const [upClicked, setUpClicked] = useState(false)
	const [downClicked, setDownClicked] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const { article_id } = useParams()

	useEffect(() => {
		getArticleById(article_id)
			.then(({ article }) => {
				setArticle(article)
				setIsLoading(false)
			})
			.catch((err) => {
				setIsLoading(false)
				setError(err.response)
			})
	}, [])

	const handleUpVote = (article_id) => {
		if (!upClicked) {
			setUpClicked(true)
			upVote(article_id)
		} else {
			setUpClicked(false)
			downVote(article_id)
		}
	}
	const handleDownVote = (article_id) => {
		if (!downClicked) {
			setDownClicked(true)
			downVote(article_id)
		} else {
			setDownClicked(false)
			upVote(article_id)
		}
	}

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

	return error ? (
		<ErrorPage error={error} />
	) : (
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
								onClick={() => handleUpVote(article_id)}
							>
								{' '}
								⬆️{' '}
							</button>
							<button
								className="downVote"
								onClick={() => handleDownVote(article_id)}
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
