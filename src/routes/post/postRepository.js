import crypto from 'crypto'
import Post from './postModel'

export const create = (data) => {
	const post = new Post(data)
	return post.save()
}

export const getByTitle = (title) => {
	return Post.findOne({
		title
	})
}

export const getAll = ({ page, nPerPage = 10 }) => {
	// const skip = page * nPerPage
	// return Post.find({}).skip(skip).limit(nPerPage)
	const match = {
		$match: {}
	}
	const sort = {
		$sort: {
		  'created': -1
		}
	}
	return Post.aggregate([match, sort])
}

export const get = (query) => {
	let queries = []
	if (query.title) {
		queries.push({ 
			$match: { 
				title: query.title
			}
		})
	}
	if (query.tags) {
		queries.push({ $match: { tags: { $all: query.tags.split(',') } } })
	}
	queries.push({ $sort: { created: -1 } })
	queries.push({
		$project: { _id: 0, title: 1, longTitle: 1, tags: 1, coverImg: 1, description: 1, nodes:  1}
	})
	return Post.aggregate(queries)
}