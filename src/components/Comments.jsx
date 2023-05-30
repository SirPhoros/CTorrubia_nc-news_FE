import { useEffect, useState } from 'react'
import { getCommentsFromArticle } from '../../utils'

export default function Comments(id) {
	const [comments, setComments] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getCommentsFromArticle(id).then(({ comments }) => {
			setComments(comments)
			setIsLoading(false)
		})
	}, [])

    console.log(comments)

	if (isLoading) return <p>Loading Comments Section... wait patiently </p>

    return (
        <section className="Comments">
            <h3>Comments: </h3>
			<ul>
				{comments.map(
					({
						comment_id,
						author,
						body,
						votes,
					}) => {
						return (
							<li
								key={comment_id}
								className="Comment"
							>
								<article>
									<p>{author} commments: </p>
									<p>{body}</p>
									<p>Votes: {votes}</p>
								</article>
							</li>
						)
					}
				)}
			</ul>
        </section>
        
        )

}