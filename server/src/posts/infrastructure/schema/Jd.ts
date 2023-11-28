import { Schema, model } from 'mongoose'

const jdSchema = new Schema({
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
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  },
  type: {
    type: String,
    required: true,
    enum: ['full-time', 'part-time', 'freelance']
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
    enum: ['remote', 'specific-remote', 'on-site', 'hybrid']
  },
  stack: {
    type: Array,
    required: true,
    minlength: 0,
    maxlength: 50
  },
  aboutUs: {
    type: String,
    required: false,
    default: ''
  },
  aboutClient: {
    type: String,
    required: false,
    default: ''
  },
  responsabilities: {
    type: String,
    required: false,
    default: ''
  },
  requirements: {
    type: Array,
    required: true
  },
  niceToHave: {
    type: Array,
    required: true
  },
  benefits: {
    type: Array,
    required: true
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
  status: {
    type: String,
    required: true,
    enum: ['open', 'first-interview', 'second-interview', 'closed']
  },
  users: {
    type: Array,
    required: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date()
  }
})
export default model('Jd', jdSchema)
