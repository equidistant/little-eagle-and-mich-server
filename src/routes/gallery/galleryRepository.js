import crypto from 'crypto'
import Gallery from './galleryModel'

export const create = (data) => {
	const gallery = new Gallery(data)
	return gallery.save()
}

export const getByTitle = (title) => {
	return Gallery.findOne({
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
		  'title': 1
		}
	}
	return Gallery.aggregate([match, sort])
}

export const getAllTitles = ({ page, nPerPage = 10 }) => {
	// const skip = page * nPerPage
	// return Post.find({}).skip(skip).limit(nPerPage)
	const match = {
		$match: {}
	}
	const sort = {
		$sort: {
		  'title': 1
		}
	}
	const project = {
		$project: {
			title: 1,
			_id: 0
		}
	  }
	return Gallery.aggregate([match, sort, project])
}