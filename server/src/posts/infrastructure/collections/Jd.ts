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
  code: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40
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
  image: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 200
  },
  type: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40
  },
  location: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 60
  },
  modality: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 9,
    enum: ['full-time', 'part-time', 'freelance']
  },
  stack: {
    type: Array,
    required: true,
    minlength: 0,
    maxlength: 50
  },
  requisites: {
    type: Array,
    required: true,
    minlength: 0,
    maxlength: 20
  },
  aboutUs: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 3000
  },
  aboutClient: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 3000
  },
  responsabilities: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 3000
  },
  requirements: {
    type: Array,
    required: true,
    minlength: 0,
    maxlength: 20
  },
  niceToHave: {
    type: Array,
    required: true,
    minlength: 0,
    maxlength: 20
  },
  benefits: {
    type: Array,
    required: true,
    minlength: 0,
    maxlength: 20
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  },
  company: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  users: {
    type: Array,
    minlength: 0,
    required: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date()
  }
})
//! Revisar estos campos para ver si son los requeridos por el Front
export default model('Jd', jdSchema)
