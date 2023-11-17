import { randomUUID } from 'crypto'
import { Schema, model } from 'mongoose'

const jdSchema = new Schema({
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
    required: true,
    default: Date()
  },
  image: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 200
  },
  requisites: {
    type: Array,
    required: true,
    minlength: 0,
    maxlength: 20
  },
  modality: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 9,
    enum: ['In-person', 'Remote', 'Hybrid']
  },
  location: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 60
  },
  stack: {
    type: Array,
    required: true,
    minlength: 0,
    maxlength: 20
  },
  schedule: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 9,
    enum: ['full-time', 'part-time']
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  }
})
//! Revisar estos campos para ver si son los requeridos por el Front
export default model('Jd', jdSchema)
