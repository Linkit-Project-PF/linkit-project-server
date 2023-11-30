import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  description: {
    type: String,
    required: true,
    minlength: 3
  },
  headers: {
    type: Array,
    required: true
  },
  createdDate: {
    type: Date,
    required: false,
    default: Date()
  },
  image: {
    type: String,
    required: false,
    maxlength: 200,
    default: ''
  },
  link: {
    type: String,
    required: false,
    default: ''
  },
  type: {
    type: String,
    required: true,
    enum: ['blog', 'social', 'ebook']
  },
  category: {
    type: String,
    required: true,
    minlength: 4
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  }
})

export default model('Post', postSchema)
