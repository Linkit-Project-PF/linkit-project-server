import { randomUUID } from 'crypto'
import { Schema, model } from 'mongoose'

const reviewSchema = new Schema({
  id: {
    type: String,
    default: randomUUID(),
    required: true
  },
  airTableId: {
    type: String,
    required: false //! Si se requiere, se debe poner en true
  },
  name: {
    type: String,
    required: true,
    minminlength: 1,
    maxlength: 40
  },
  rol: {
    type: String,
    required: true,
    minminlength: 1,
    maxlength: 7,
    enum: ['company', 'user']
  },
  createdDate: {
    type: Date,
    required: false,
    default: Date()
  },
  image: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 300
  },
  country: {
    type: String,
    required: false,
    minlength: 3,
    maxlenght: 100
  },
  detail: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 3000
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  }
})

export default model('Review', reviewSchema)
