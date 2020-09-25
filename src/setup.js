import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { catchErrors } from './utils'
import routes from './routes'

export default (app) => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
  }
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  app.use(bodyParser.json())
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.use(catchErrors)
  app.use(routes)
}