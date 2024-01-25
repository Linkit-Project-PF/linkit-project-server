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
  headers: [{
    head: {
      type: String,
      required: false,
      default: ''
    },
    body: {
      type: String,
      required: false,
      default: ''
    },
    sectionImage: {
      type: String,
      required: false,
      default: ''
    }
  }],
  createdDate: {
    type: Date,
    required: true,
    default: Date()
  },
  image: {
    type: String,
    required: false,
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

export default model('Post', postSchema)
