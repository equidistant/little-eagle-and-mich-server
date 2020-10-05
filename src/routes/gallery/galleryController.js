import * as galleryRepository from './galleryRepository'

export const create = async (req, res, next) => {
	try {
		const { title, longTitle, baseUrl, ratios, coverImg, tags, description } = req.body
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
		req.gallery = await galleryRepository.create({ title, longTitle, low, high, coverImg, tags, description })
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
		req.galleries = await galleryRepository.get(req.query)
		return next()
	} catch (err) {
		return next(err)
	}
}