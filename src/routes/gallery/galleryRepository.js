import crypto from 'crypto'
import Gallery from './galleryModel'

export const create = (data) => {
	const gallery = new Gallery(data)
	return gallery.save()
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
		$project: { _id: 0, title: 1, longTitle: 1, tags: 1, coverImg: 1, description: 1, low: 1, high: 1, created: 1}
	})
	return Gallery.aggregate(queries)
}