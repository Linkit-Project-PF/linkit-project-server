import { randomUUID } from 'crypto'
import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  id: {
    type: String,
    default: randomUUID(),
    required: true
  },
  airTableId: {
    type: String,
    required: false //! Si se requiere, se debe poner en true
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 3000
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
    maxlength: 6,
    enum: ['blog', 'social', 'ebook']
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  }
})

export default model('Post', postSchema)