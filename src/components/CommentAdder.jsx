import { useContext, useState } from 'react'
import { postComment } from '../../utils'
import { UserContext } from '../contexts/UserContext'
import { Link } from 'react-router-dom'

export default function CommentAdder({ setComments, id }) {
	const [newComment, setNewComment] = useState('')
	const [postMsg, setPostMsg] = useState('')
	const {
		user: { username },
	} = useContext(UserContext)
	if (username === 'Guest') {
		return (
			<>
				<p>Please, login to post a comment: </p>
				<button>
					<Link to="/users">Log in</Link>
				</button>
			</>
		)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (newComment.length === 0) {
			return setPostMsg('Your comment cannot be empty!')
		}
		postComment(newComment, id)
			.then((newCommentFromApi) => {
				setNewComment('')
				setComments((currComments) => {
					return [newCommentFromApi, ...currComments]
				})
				setPostMsg('Comment added successfully')
				setTimeout(() => setPostMsg(''), 2000)
			})
			.catch((err) => {
				console.log(err, '<< API response')
				setPostMsg("Couldn't post your comment... try later")
				setTimeout(() => setPostMsg(''), 2000)
			})
	}

	return (
		<>
			<section className="commentAdder">
				<form
					className="CommentAdder"
					onSubmit={handleSubmit}
				>
					<label htmlFor="newComment">
						Add a Comment: <br />
					</label>
					<textarea
						id="newComment"
						multiline="true"
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
					></textarea>
					<br></br>
					<button disabled={!newComment}>Add</button>
				</form>
				<p>{postMsg}</p>
			</section>
		</>
	)
}
