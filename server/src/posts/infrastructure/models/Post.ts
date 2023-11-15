import { randomUUID } from 'crypto'
import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  id: {
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
    maxlength: 6,
    enum: ['blog', 'jd', 'social', 'ebook']
  },
  modality: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 8,
    enum: ['fullTime', 'partTime', 'remote']
  },
  type: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 5
  },
  stack: {
    type: Array,
    required: false,
    minlength: 1,
    maxlength: 10
  },
  location: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 30
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  }
})

export default model('Post', postSchema)
