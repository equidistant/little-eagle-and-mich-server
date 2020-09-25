import * as galleryRepository from './galleryRepository'

export const create = async (req, res, next) => {
	try {
		const { title, longTitle, baseUrl, ratios } = req.body
		const low = bindRatiosToUrls({ 
			baseUrl,
			dir: `/gallery/low/${title}`, 
			ratios
		})
		const high = bindRatiosToUrls({ 
			baseUrl,
			dir: `/gallery/high/${title}`, 
			ratios
		})
		req.gallery = await galleryRepository.create({ title, longTitle, low, high })
		return next()
	} catch (err) {
		return next(err)
	}
}

export const bindRatiosToUrls = ({ baseUrl, dir, ratios }) => {
	return ratios.map((ratio, index) => {
		return {
			url: `${baseUrl}${dir}/img${index}.jpg`,
			ratio,
			id: index
		}
	})
  }

export const buildImageUrls = ({ baseUrl, dir, length }) =>
	[...Array(length)].map((img, index) => `${baseUrl}/${dir}/img${index}.jpg`)

export const get = async (req, res, next) => {
	try {
		const { title } = req.params
		const { page } = req.query
		if (!title) {
			if (page) {
				req.gallery = await galleryRepository.getAll({ page })
			}
			if (!page) {
				req.gallery = await galleryRepository.getAll({})
			}			
		} else if (title) {
			req.gallery = await galleryRepository.getByTitle(title)
			if (!req.gallery) {
				throw new Error('NOT_FOUND')
			}
		}
		return next()
	} catch (err) {
		return next(err)
	}
}

export const getTitles = async (req, res, next) => {
	try {
		const { page } = req.query
		if (page) {
			req.gallery = await galleryRepository.getAllTitles({ page })
		}
		if (!page) {
			req.gallery = await galleryRepository.getAllTitles({})
		}			
		return next()
	} catch (err) {
		return next(err)
	}
}
