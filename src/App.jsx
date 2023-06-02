import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import Home from './components/Home'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import Topics from './components/Topics'
import ErrorPage from './components/ErrorPage'
import { UserContext } from './contexts/UserContext'
import Users from './components/Users'
import { useState } from 'react'
import Footer from './components/Footer'

function App() {
	const [user, setUser] = useState({
		username: 'Guest',
		avatar_url: '',
	})
	return (
		<BrowserRouter>
			<UserContext.Provider value={{ user, setUser }}>
				<>
					<Header />
					<Nav />
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/articles"
							element={<Articles />}
						/>
						<Route
							path="/articles/:article_id"
							element={<SingleArticle />}
						/>
						<Route
							path="/topics"
							element={<Topics />}
						/>
						<Route
							path="/*"
							element={<ErrorPage />}
						/>
						<Route
							path="/articles/topics/:topic"
							element={<Articles />}
						/>
						<Route
							path="/users"
							element={<Users />}
						/>
					</Routes>
					<Footer />
				</>
			</UserContext.Provider>
		</BrowserRouter>
	)
}

export default App
