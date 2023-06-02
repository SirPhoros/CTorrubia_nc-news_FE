import { useState, useEffect } from 'react'
import { getUsers } from '../../utils'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export default function Users() {
	const [users, setUsers] = useState([])
	const { setUser } = useContext(UserContext)

	useEffect(() => {
		getUsers().then(({ users }) => {
			setUsers(users)
		})
	}, [])

	return (
		<main>
			<h2>Users</h2>
			<ul className="User-list">
				{users.map((user) => {
					return (
						<li
							className="user-card"
							key={user.username}
						>
							<img
								src={user.avatar_url}
								alt={user.username}
							/>
							<h2>{user.username}</h2>
							<button onClick={() => setUser(user)}>Select</button>
						</li>
					)
				})}
			</ul>
		</main>
	)
}
