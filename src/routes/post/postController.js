import * as postRepository from './postRepository'

export const create = async (req, res, next) => {
	try {
		const { title, longTitle, description, tags, coverImg, nodes } = req.body
		req.post = await postRepository.create({ title, longTitle, description, tags, coverImg, nodes })
		return next()
	} catch (err) {
		return next(err)
	}
}

export const get = async (req, res, next) => {
	try {
		const posts = await postRepository.get(req.query)
		req.posts = posts
		// const { title } = req.params
		// const { page } = req.query
		// if (!title) {
		// 	if (page) {
		// 		req.post = await postRepository.getAll({ page })
		// 	}
		// 	if (!page) {
		// 		req.post = await postRepository.getAll({})
		// 	}			
		// }
		// if (title) {
		// 	req.post = await postRepository.getByTitle(title)
		// 	if (!req.post) {
		// 		throw new Error('NOT_FOUND')
		// 	}
		// }
		return next()
	} catch (err) {
		return next(err)
	}
}
