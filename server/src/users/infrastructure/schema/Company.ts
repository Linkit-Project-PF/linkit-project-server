import { Schema, model } from 'mongoose'

const companySchema = new Schema({
  airTableId: {
    type: String,
    required: false,
    default: ''
  },
  image: {
    type: String,
    required: false,
    minlength: 3,
    default: ''
  },
  companyName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  repName: {
    type: String,
    required: false,
    default: ''
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  country: {
    type: String,
    required: false,
    default: ''
  },
  linkedin: {
    type: String,
    required: false,
    default: ''
  },
  role: {
    type: String,
    required: true,
    enum: ['company']
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  jds: {
    type: Array,
    required: true
  }
})

export default model('Company', companySchema)
