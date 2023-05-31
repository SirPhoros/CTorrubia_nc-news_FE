import { useEffect, useState } from 'react'
import { getArticles } from '../../utils'
import { Link } from 'react-router-dom'


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
		/*Create form with radio buttons (sorting) + ordening (asc, desc) 
		https://reactrouter.com/en/main/hooks/use-search-params-rn
		https://www.makeuseof.com/react-query-params-update-read/
		With that, handle the URL and update it.
		
*/
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
									<h3><Link to={`/articles/${article_id}`}>{title}</Link></h3>
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
