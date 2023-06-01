import { useState } from 'react'
import { postComment } from '../../utils'
import { useFetcher } from 'react-router-dom'

export default function CommentAdder({ setComments, id }) {
	const [newComment, setNewComment] = useState('')
	const [postMsg, setPostMsg] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		if (newComment.length === 0) {
			return setPostMsg('Your comment cannot be empty!')
		}
		postComment(newComment, id).then((newCommentFromApi) => {
			setNewComment('')
			setComments((currComments) => {
				return [newCommentFromApi, ...currComments]
			})
			setPostMsg('Comment added successfully')
			setTimeout(() => setPostMsg(''), 2000)
		})
	}

	return (
		<>
			<form
				className="CommentAdder"
				onSubmit={handleSubmit}
			>
				<label htmlFor="newComment">Add a Comment</label>
				<textarea
					id="newComment"
					multiline="true"
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
				></textarea>
				<button>Add</button>
			</form>
			<p>{postMsg}</p>
		</>
	)
}
