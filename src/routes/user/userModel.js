import mongoose from 'mongoose'

const Schema = mongoose.Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('User', userSchema)
