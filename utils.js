import axios from 'axios'
const NewsApi = axios.create({
	baseURL: `https://nc-news-soloproject-be.onrender.com/api`,
})

export function getArticles() {
	return NewsApi.get(`/articles`)
		.then(({data}) => {
			return data
		})
		.catch((err) => console.log(err))
}

export function getArticleById(id) {
	return NewsApi.get(`/articles/${id}`)
		.then(({data}) => {
			return data
		})
		.catch((err) => console.log(err))
}

export function getCommentsFromArticle({article_id}) {
	return NewsApi.get(`/articles/${article_id}/comments`)
		.then(({data}) => {
			console.log(data)
			return data
		})
		.catch((err) => console.log(err))
}