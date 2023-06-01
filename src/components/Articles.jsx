import { useEffect, useState } from 'react'
import { getArticles } from '../../utils'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import moment from 'moment'
import ErrorPage from './ErrorPage'

export default function Items() {
	const [currArticles, setCurrArticles] = useState([])
	const { topic } = useParams()

	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [searchParams, setSearchParams] = useSearchParams()

	function handleSort(e) {
		const newParams = {
			sort_by: searchParams.get('sort_by'),
			order: searchParams.get('order'),
		}

		if (!newParams.order) delete newParams.order
		newParams.sort_by = e.target.value
		setSearchParams(newParams)
	}

	function handleOrder(e) {
		const newParams = {
			sort_by: searchParams.get('sort_by'),
			order: searchParams.get('order'),
		}
		if (!newParams.sort_by) delete newParams.sort_by
		newParams.order = e.target.value
		setSearchParams(newParams)
	}

	const sortBy = searchParams.get('sort_by')
	const order = searchParams.get('order')

	useEffect(() => {
		getArticles(topic, sortBy, order).then(({ articles }) => {
			setCurrArticles(articles)
			setIsLoading(false)
		})
		.catch((err) => {
			setIsLoading(false)
			setError(err.response)
			err.response.data.msg = "Topic not found"
		})
	}, [topic, sortBy, order])

	if (isLoading) return <p>Loading Page... wait patiently </p>

	return error ? (
		<ErrorPage error={error} />
	) : (
		<main className="articlesList">
			<h2>Articles: </h2>
			<section className="FilterBy">
				<form>
					<fieldset>
						<legend>Filter by: </legend>
						<label htmlFor="order">
							{' '}
							<select
								id="order-select"
								name="order"
								defaultValue={'default'}
								onChange={handleSort}
							>
								<option
									value="default"
									disabled
									hidden
								>
									Sort
								</option>
								<option value="created_at">Date</option>
								<option value="comment_count">Comment count</option>
								<option value="votes">Votes</option>
							</select>
						</label>
						<label htmlFor="order">
							{' '}
							<select
								id="order-select"
								name="order"
								defaultValue={'default'}
								onChange={handleOrder}
							>
								<option
									value="default"
									disabled
									hidden
								>
									Order
								</option>
								<option value="asc">Ascendant</option>
								<option value="desc">Descendant</option>
							</select>
						</label>
					</fieldset>
				</form>
			</section>
			<ul className="article-list">
				{currArticles.map(
					({
						article_id,
						title,
						topic,
						created_at,
						author,
						votes,
						comment_count,
						article_img_url,
					}) => {
						return (
							<li
								key={article_id}
								className="articleItem"
							>
								<article className="article-item">
									<h3 className="article-title">
										<Link to={`/articles/${article_id}`}>{title}</Link>
									</h3>
									<img
										src={article_img_url}
										alt={title}
									/>

									<section className="foot-article">
										<p>
											on:{' '}
											<Link to={`/articles/topics/${topic}`}>
												{topic.charAt(0).toUpperCase() + topic.slice(1)}
											</Link>{' '}
											<br />
											Posted by {author} on{' '}
											{moment(created_at).format(`DD/MM/YY [at] HH:mm`)}{' '}
											Comments: {comment_count} Votes: {votes}
										</p>
									</section>
								</article>
							</li>
						)
					}
				)}
			</ul>
		</main>
	)
}
