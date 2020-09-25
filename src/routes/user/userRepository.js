import crypto from 'crypto'
import User from './userModel'

export const create = (data) => {
	const user = new User(data)
	return user.save()
}

export const getByUsername = (username) => {
	return User.findOne({
		username: username
	})
}

export const getBySessionId = (sessionId) => {
	return User.findOne({
		sessionId: sessionId
	})
}

export const login = (username) => {
	const query = {
		username: username
	}
	const update = {
		sessionId: crypto.randomBytes(128).toString('base64')
	}
	const options = {
		new: true
	}
	return User.findOneAndUpdate(query,update,options)
}

export const logout = (username) => {
	const filter = {
		username: username
	}
	const update = {
		$unset: {
			sessionId: ''
		}
	}
	const options = {
		new: true
	}
	return User.updateOne(filter,update,options)
}