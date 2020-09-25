import mongoose from 'mongoose'

const Schema = mongoose.Schema
const gallerySchema = new Schema({
  title: {
    type: String
  },
  longTitle: {
    type: String
  },
  low: [],
  high: []
})

export default mongoose.model('Gallery', gallerySchema)
