import { Router } from 'express'
import PostRoute from './post'
import UserRoute from './user'
import GalleryRoute from './gallery'
import RatioRoute from './ratio'

const router = Router()

router.use('/post', PostRoute)
router.use('/user', UserRoute)
router.use('/gallery', GalleryRoute)
router.use('/ratio', RatioRoute)

export default router

