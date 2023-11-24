import { Schema, model } from 'mongoose'

const jdSchema = new Schema({
  airTableId: {
    type: String,
    required: false
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
  aboutUs: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3000
  },
  aboutClient: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 3000
  },
  responsabilities: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 20
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
export default model('Jd', jdSchema)
