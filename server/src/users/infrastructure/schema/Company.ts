import { Schema, model } from 'mongoose'

const companySchema = new Schema({
  firebaseId: {
    type: String,
    required: false,
    default: ''
  },
  airTableId: {
    type: String,
    required: false,
    default: ''
  },
  image: {
    type: String,
    required: false,
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
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Invalid email address format'
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
  interested: {
    type: String,
    required: false,
    default: '',
    enum: ['payroll', 'recruiting', 'staff-aug', '']
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  createdDate: {
    type: Date,
    default: Date()
  },
  provider: {
    type: String,
    required: true,
    enum: ['email', 'google', 'github']
  }
})

export default model('Company', companySchema)
