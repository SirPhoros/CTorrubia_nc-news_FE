import axios from 'axios'
const NewsApi = axios.create({
	baseURL: `https://nc-news-soloproject-be.onrender.com/api`,
})

export function getArticles(topic, sortBy, order) {
	return NewsApi.get(`/articles`, {
		params: { topic: topic, sort_by: sortBy, order: order },
	})
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
	const postBody = {
		username: 'jessjelly',
		body: newCommentText,
	}

	return NewsApi.post(`/articles/${article_id}/comments`, postBody).then(
		({ data }) => {
			return data.comment
		}
	)
}
export function voteArticle(article_id, num) {
	const patchBody = {
		inc_votes: num,
	}
	return NewsApi.patch(`/articles/${article_id}`, patchBody).then(
		({ data }) => {
			return data.article
		}
	)
}


export function deteleComment(comment_id) {
	return NewsApi.delete(`/comments/${comment_id}`).catch((err) =>
		console.log(err)
	)
}

export function getTopics() {
	return NewsApi.get(`/topics`)
		.then(({ data }) => {
			return data
		})
		.catch((err) => console.log(err))
}
