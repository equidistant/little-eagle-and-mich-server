import { Router } from 'express'
import * as userValidator from './userValidator'
import * as userController from './userController'
import { checkIsAdmin } from './userValidator'
import * as cookie from './cookie'
import * as userResponder from './userResponder'
import userCatchErrors from './userCatchErrors'
import { setResponseHeadersAdmin } from '../../utils'

const router = Router()

router.use(setResponseHeadersAdmin)

router.post('/register',
	userValidator.register,
	userController.register,
	cookie.set,
	userResponder.register
)

router.post('/login',
	userValidator.login,
	userController.login,
	cookie.set,
	userResponder.login
)

router.get('/checkSession',
	userController.checkSession,
	userResponder.checkSession
)

router.get('/logout',
	userController.checkSession,
	userController.logout,
	cookie.remove,
	userResponder.logout
)

router.use(userCatchErrors)

export default router

export { checkIsAdmin }