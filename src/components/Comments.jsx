import { useEffect, useState } from 'react'
import { getCommentsFromArticle, patchComment } from '../../utils'

export default function Comments(id) {
	const [comments, setComments] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getCommentsFromArticle(id).then(({ comments }) => {
			setComments(comments)
			setIsLoading(false)
		})
	}, [])

	const upVote = (comment_id) => {
		setComments((currComments) => {
			return currComments.map((comment) => {
				if (comment.comment_id === comment_id) {
					return { ...comment, votes: comment.votes + 1 }
				}
				return comment
			})
		})
		patchComment(comment_id, 1).catch((err) => {
			console.log(err, '<< API response')
			setComments((currComments) => {
				return currComments.map((comment) => {
					if (comment.comment_id === comment_id) {
						return { ...comment, votes: comment.votes - 1 }
					}
					return comment
				})
			})
		})
	}

	const downVote = (comment_id) => {
		setComments((currComments) => {
			return currComments.map((comment) => {
				if (comment.comment_id === comment_id) {
					return { ...comment, votes: comment.votes - 1 }
				}
				return comment
			})
		})
		patchComment(comment_id, -1).catch((err) => {
			console.log(err, '<< API response')

			setComments((currComments) => {
				return currComments.map((comment) => {
					if (comment.comment_id === comment_id) {
						return { ...comment, votes: comment.votes + 1 }
					}
					return comment
				})
			})
		})
	}

	if (isLoading) return <p>Loading Comments Section... wait patiently </p>
	if (comments.length === 0) return <p>No comments yet</p>

	return (
		<section className="Comments">
			<h3>Comments: </h3>
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
								<section className="voteBlock">
									<p id="vote">Current votes: {votes}</p>
									<button
										className="upVote"
										onClick={() => upVote(comment_id)}
									>
										{' '}
										⬆️{' '}
									</button>
									<button
										className="downVote"
										onClick={() => downVote(comment_id)}
									>
										{' '}
										⬇️{' '}
									</button>
								</section>
							</article>
						</li>
					)
				})}
			</ul>
		</section>
	)
}
