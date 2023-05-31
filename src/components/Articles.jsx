import { useEffect, useState } from 'react'
import { getArticles } from '../../utils'
import { Link, useParams, useSearchParams } from 'react-router-dom'

export default function Items() {
	const [currArticles, setCurrArticles] = useState([])
	const { topic } = useParams()

	const [isLoading, setIsLoading] = useState(true)
	const [searchParams, setSearchParams] = useSearchParams()

	function handleSubmit() {
		setSearchParams({ sortBy })
		setSearchParams({ order })
	}

	const sortBy = searchParams.get('sort_by')
	const order = searchParams.get('order')

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
				<form onSubmit={handleSubmit}>
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
								defaultChecked
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
							></input>
							<br></br>
						</label>
						<label htmlFor="order">
							{' '}
							Order:
							<select
								id="order-select"
								name="order"
							>
								<option value="asc">Ascendant</option>
								<option value="desc">Descendant</option>
							</select>
						</label>
						<br></br>

						<button>Filter</button>
					</fieldset>
				</form>
			</section>
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
