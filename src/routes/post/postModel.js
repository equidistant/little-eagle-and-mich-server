import mongoose from 'mongoose'

const Schema = mongoose.Schema
const postSchema = new Schema({
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
  created: {
    type: Number,
    default: () => {
      return Date.now()
    }
  },
  nodes: [{
    name: String,
    data: String
  }],
})

export default mongoose.model('Post', postSchema)
