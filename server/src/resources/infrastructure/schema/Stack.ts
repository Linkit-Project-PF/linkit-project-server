import { Schema, model } from 'mongoose'

const stackSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: false,
    default: Date()
  }
})

export default model('Stack', stackSchema)
