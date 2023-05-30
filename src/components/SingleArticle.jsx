import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getArticleById } from '../../utils'

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
                        <p>Author: {author} <br></br> Topic: {topic}</p>
                        <p>{body}</p>
                        <p>Votes: {votes}</p>
					</article>
				)
			})}
		</main>
	)

	return (
		<main className="itemList">
			<h2>{category_name} Items: </h2>
			<ul>
				{currentCategory.map(
					({
						item_id,
						item_name,
						description,
						img_url,
						price,
						category_name,
					}) => {
						return (
							<li key={item_id}>
								<article>
									<p>{item_name}</p>
									<p>{description}</p>
									<img
										src={img_url}
										alt={item_name}
									/>
									<p>£{price / 100}</p>
									<p>{category_name}</p>
								</article>
							</li>
						)
					}
				)}
			</ul>
		</main>
	)
}
