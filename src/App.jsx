import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Nav from './components/Nav'
import Home from './components/Home'
import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'

function App() {
	return (
		<>
			<BrowserRouter>
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
							element={ <SingleArticle/>}
						/>
					</Routes>
				</>
			</BrowserRouter>
		</>
	)
}

export default App
