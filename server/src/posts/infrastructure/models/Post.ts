import { Schema, model } from 'mongoose'

const blogSchema = new Schema({
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
    maxlength: 300
  },
  input: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  }
})

export default model('Blog', blogSchema)
