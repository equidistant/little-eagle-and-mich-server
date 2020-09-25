import * as userRepository from './userRepository'

export const register = (req, res, next) => {
	try {
		const { username, password } = req.body
		if (!username || !password) {
			throw new Error('INVALID_DATA')
		}
		return next()
	} catch (err) {
		return next(err)
	}	
}

export const login = (req, res, next) => {
	try {
		const { username, password } = req.body
		if (!username || !password) {
			throw new Error('INVALID_DATA')
		}
		return next()
	} catch (err) {
		return next(err)
	}	
}

export const checkIsAdmin = async (req, res, next) => {
	try {
		const sessionId = req.signedCookies.sessionId
		req.user = await userRepository.getBySessionId(sessionId)
		if (!req.user) {
		// if (!req.user || !req.user.isAdmin) {
			return res.status(401).send({
					message: 'UNAUTHORIZED'
				})
			}
		return next()
	} catch (err) {
		return next(err)
	}
}