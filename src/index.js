import express from 'express'
import setup from './setup'
import { logStart } from './utils'

const app = express()
setup(app)

app.listen(process.env.PORT || 3000, () => logStart())