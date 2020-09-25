import { Router } from 'express'
import * as postController from './postController'
import * as postResponder from './postResponder'
import postCatchErrors from './postCatchErrors'
import { checkIsAdmin } from '../user'
import { setResponseHeadersAdmin, setResponseHeadersWeb } from '../../utils'

const router = Router()

router.use(setResponseHeadersAdmin)

router.post('/',
	checkIsAdmin,
	postController.create,
	postResponder.create
)

router.use(setResponseHeadersWeb)

router.get('/:title?',
	postController.get,
	postResponder.get
)

router.use(postCatchErrors)

export default router