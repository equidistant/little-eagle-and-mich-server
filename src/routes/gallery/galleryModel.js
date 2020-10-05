import mongoose from 'mongoose'

const Schema = mongoose.Schema
const gallerySchema = new Schema({
  title: {
    type: String
  },
  longTitle: {
    type: String
  },
  description: {
    type: String
  },
  tags: {
    type: [String]
  },
  coverImg: {
    type: String
  },
  low: [],
  high: [],
  created: {
    type: Number,
    default: () => {
      return Date.now()
    }
  },
})

export default mongoose.model('Gallery', gallerySchema)
