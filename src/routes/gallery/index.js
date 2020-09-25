import { Router } from 'express'
import * as galleryController from './galleryController'
import * as galleryResponder from './galleryResponder'
import galleryCatchErrors from './galleryCatchErrors'
import { checkIsAdmin } from '../user'
import { setResponseHeadersAdmin, setResponseHeadersWeb } from '../../utils'

const router = Router()

router.use(setResponseHeadersAdmin)

router.post('/',
	checkIsAdmin,
	galleryController.create,
	galleryResponder.create
)

router.use(setResponseHeadersWeb)

router.get('/titles',
	galleryController.getTitles,
	galleryResponder.get
)

router.get('/:title?',
	galleryController.get,
	galleryResponder.get
)

router.use(galleryCatchErrors)

export default router