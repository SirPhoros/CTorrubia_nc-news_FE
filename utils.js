import axios from 'axios'
const NewsApi = axios.create({
	baseURL: `https://nc-news-soloproject-be.onrender.com/api`,
})

export function getArticles() {
	return NewsApi.get(`/articles`)
		.then(({ data }) => {
			return data
		})
		.catch((err) => console.log(err))
}

export function getArticleById(id) {
	return NewsApi.get(`/articles/${id}`)
		.then(({ data }) => {
			return data
		})
		.catch((err) => console.log(err))
}

export function getCommentsFromArticle({ article_id }) {
	return NewsApi.get(`/articles/${article_id}/comments`)
		.then(({ data }) => {
			return data
		})
		.catch((err) => console.log(err))
}
export const postComment = (newCommentText, { article_id }) => {
	// assembling the POST body
	const postBody = {
		//Hardcoded an username, TODO create an user interace
		username: 'jessjelly',
		body: newCommentText,
	}

	return NewsApi.post(`/articles/${article_id}/comments`, postBody).then(
		({ data }) => {
			return data.comment
		}
	)
}
