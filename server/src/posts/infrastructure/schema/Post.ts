import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200
  },
  headers: {
    type: Array,
    required: false,
    minlength: 0,
    maxlength: 200
  },
  createdDate: {
    type: Date,
    required: false,
    default: Date()
  },
  image: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 200
  },
  link: {
    type: String,
    required: false,
    minlength: 5
  },
  type: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 8,
    enum: ['blog', 'social', 'ebook']
  },
  category: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 30
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  }
})

export default model('Post', postSchema)