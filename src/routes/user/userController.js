import bcryptjs from 'bcryptjs'
import crypto from 'crypto'
import * as userRepository from './userRepository'

export const register = async (req, res, next) => {
	try {
		const { username, password } = req.body
		const data = {
			username,
			password: bcryptjs.hashSync(password, bcryptjs.genSaltSync(8)),
			sessionId: crypto.randomBytes(128).toString('base64')
		}
		req.user = await userRepository.create(data)
		return next()
	} catch (err) {
		return next(err)
	}
}

export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body
		req.user = await userRepository.getByUsername(username)
		if (!req.user || !bcryptjs.compareSync(password, req.user.password)) {
			return res.status(400).send({
					message: 'INVALID_CREDENTIALS'
				})
			}
		  req.user = await userRepository.login(username)
		return next()
	} catch (err) {
		return next(err)
	}
}

export const checkSession = async (req, res, next) => {
	try {
		const sessionId = req.signedCookies.sessionId
		if (!sessionId) {
			return res.status(401).send({
					message: 'UNAUTHORIZED'
				})
			}
		req.user = await userRepository.getBySessionId(sessionId)
		if (!req.user) {
			return res.status(401).send({
					message: 'UNAUTHORIZED'
				})
			}
		return next()
	} catch (err) {
		return next(err)
	}
}

export const logout = async (req, res, next) => {
	try {
		const { username } = req.user
		await userRepository.logout(username)
		return next()
	} catch (err) {
		console.log(err)
		return next(err)
	}
}

