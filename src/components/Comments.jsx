import { useEffect, useState } from 'react'
import { deteleComment, getCommentsFromArticle } from '../../utils'
import CommentAdder from './CommentAdder'

export default function Comments(id) {
	const [comments, setComments] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	const username = 'jessjelly'

	useEffect(() => {
		getCommentsFromArticle(id).then(({ comments }) => {
			setComments(comments)
			setIsLoading(false)
		})
	}, [])

	if (isLoading) return <p>Loading Comments Section... wait patiently </p>
	if (comments.length === 0) return <p>No comments yet</p>

	return (
		<section className="Comments">
			<h3>Comments: </h3>
			<CommentAdder
				setComments={setComments}
				id={id}
			/>
			<ul>
				{comments.map(({ comment_id, author, body, votes }) => {
					return (
						<li
							key={comment_id}
							className="comment"
						>
							<article>
								<p>{author} commments... </p>
								<p>"{body}"</p>
								<p>votes: {votes}</p>
								{author === username ? (
									<button onClick={() => removeComment(comment_id)}>✖️</button>
								) : (
									<></>
								)}
							</article>
						</li>
					)
				})}
			</ul>
		</section>
	)
}
