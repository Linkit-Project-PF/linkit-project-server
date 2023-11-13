import { randomUUID } from 'crypto'
import { Schema, model } from 'mongoose'

const blogSchema = new Schema({
  _id: {
    type: String,
    default: randomUUID(),
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  image: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 30
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 3000
  },
  link: {
    type: String,
    required: false,
    minlength: 5
  },
  input: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 5,
    enum: ['blog', 'jd', 'social', 'ebook']
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  }
})

export default model('Blog', blogSchema)
