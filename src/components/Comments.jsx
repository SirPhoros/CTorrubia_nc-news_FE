import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { UserContext } from '../contexts/UserContext'
import { deteleComment, getCommentsFromArticle } from '../../utils'
import CommentAdder from './CommentAdder'

export default function Comments(id) {
	const {
		user: { username },
	} = useContext(UserContext)
	const [comments, setComments] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isDeleting, setIsDeleting] = useState(false)
	const [deletedCommentId, setDeletedCommentId] = useState(null)

	function handleDelete(comment_id) {
		setIsDeleting(true)
		deteleComment(comment_id).then(() => {
			setDeletedCommentId(comment_id) //
			setTimeout(() => {
				setDeletedCommentId(null)
				setIsDeleting(false)
			}, 2000)
		})
	}
	useEffect(() => {
		getCommentsFromArticle(id).then(({ comments }) => {
			setComments(comments)
			setIsLoading(false)
		})
	}, [isDeleting])

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
				{comments.map(({ comment_id, author, body, votes, created_at }) => {
					return (
						<li
							key={comment_id}
							className="comment"
						>
							<article>
								<p>{author} commmented on... </p>
								<p>{moment(created_at).fromNow()} </p>
								<p>"{body}"</p>
								<p>votes: {votes}</p>
								{author === username && comment_id === deletedCommentId ? (
									<p className="prompt">Deleting comment... Please Wait. </p>
								) : author === username && !isDeleting ? (
									<>
										<button
											onClick={() => {
												handleDelete(comment_id)
											}}
										>
											✖️
										</button>
									</>
								) : null}
							</article>
						</li>
					)
				})}
			</ul>
		</section>
	)
}
