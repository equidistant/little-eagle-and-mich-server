export const create = async (req, res, next) => {
	try {
		return res.status(200).send({
			message: 'GALLERY_CREATED'
		})
	} catch (err) {
		return next(err)
	}
}

export const get = async (req, res, next) => {
	try {
		return res.status(200).send(req.gallery)
	} catch (err) {
		return next(err)
	}
}
