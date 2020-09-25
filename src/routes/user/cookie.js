export const set = async (req, res, next) => {
	try {
		const cookieOptions = {
			httpOnly: true,
			// secure: true,
			// maxAge: 0,
			// maxAge: constants.response.COOKIE_MAX_AGE, // ttl in ms (remove this option and cookie will die when browser is closed),
			signed: true,
			sameSite: 'strict',
			path: '/'
		}
		const { sessionId } = req.user
		res.cookie('sessionId', sessionId, cookieOptions)
		return next()
	} catch (err) {
		return next(err)
	}
}

export const remove = async (req, res, next) => {
	res.cookie('sessionId', '', { maxAge: 0 })
	return next()
}