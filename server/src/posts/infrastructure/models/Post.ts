import { Schema, model } from 'mongoose'

const blogSchema = new Schema({
  id: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  image: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  input: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  }
})

export default model('Blog', blogSchema)
