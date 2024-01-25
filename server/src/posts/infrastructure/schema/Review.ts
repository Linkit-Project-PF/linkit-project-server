import { Schema, model } from 'mongoose'

const reviewSchema = new Schema({
  name: {
    type: String,
    required: true,
    minminlength: 1
  },
  role: {
    type: String,
    required: true,
    enum: ['company', 'user']
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date()
  },
  image: {
    type: String,
    required: false,
    maxlength: 300,
    default: ''
  },
  country: {
    type: String,
    required: false,
    default: ''
  },
  detail: {
    type: String,
    required: true
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  },
  createdBy: {
    type: String,
    required: true
  }
})

export default model('Review', reviewSchema)
