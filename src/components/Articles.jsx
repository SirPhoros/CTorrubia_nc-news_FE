import { useEffect, useState } from 'react'
import { getArticles } from '../../utils'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import moment from 'moment'

export default function Items() {
	const [currArticles, setCurrArticles] = useState([])
	const { topic } = useParams()
	const [query, setQuery] = useState('')
	const [orderBy, setOrderBy] = useState('desc')
	const [isLoading, setIsLoading] = useState(true)
	const [searchParams, setSearchParams] = useSearchParams()

	function handleQuery(e) {
		setQuery(e.target.value)
		setSearchParams({ sort_by: e.target.value, order: orderBy })
	}

	function handleOrder(e) {
		setOrderBy(e.target.value)
		setSearchParams({ sort_by: query, order: e.target.value })
	}

	const sortBy = searchParams.get('sort_by') // with no sortBy, the url may look odd
	const order = searchParams.get('order') // with no order, the url may look odd
	useEffect(() => {
		getArticles(topic, sortBy, order).then(({ articles }) => {
			setCurrArticles(articles)
			setIsLoading(false)
		})
	}, [topic, sortBy, order])

	if (isLoading) return <p>Loading Page... wait patiently </p>

	return (
		<main className="articlesList">
			<h2>Articles: </h2>
			<section className="FilterBy">
				<form>
					<fieldset>
						<legend>Filter by: </legend>
						<label htmlFor="date">
							{' '}
							Date:
							<input
								type="radio"
								id="date"
								name="sort_by"
								value="created_at"
								onChange={(e) => handleQuery(e)}
							></input>
							<br></br>
						</label>
						<label htmlFor="comment_count">
							{' '}
							Comment count:
							<input
								type="radio"
								id="comment_count"
								name="sort_by"
								value="comment_count"
								onChange={(e) => handleQuery(e)}
							></input>
							<br></br>
						</label>
						<label htmlFor="votes">
							{' '}
							Votes:
							<input
								type="radio"
								id="votes"
								name="sort_by"
								value="votes"
								onChange={(e) => handleQuery(e)}
							></input>
							<br></br>
						</label>
						<label htmlFor="order">
							{' '}
							Order:
							<select
								id="order-select"
								name="order"
								onChange={handleOrder}
							>
								<option value="asc">Ascendant</option>
								<option value="desc">Descendant</option>
							</select>
						</label>
					</fieldset>
				</form>
			</section>
			<ul>
				{currArticles.map(
					({
						article_id,
						title,
						topic,
						created_at,
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
									<p>
										Posted by {author} on{' '}
										{moment(created_at).format(`DD/MM/YY [at] HH:mm`)}
									</p>
									<img
										src={article_img_url}
										alt={title}
									/>
									<p>
										Subject:{' '}
										<Link to={`/articles/topics/${topic}`}>
											{topic.charAt(0).toUpperCase() + topic.slice(1)}
										</Link>
									</p>
									<p></p>
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
