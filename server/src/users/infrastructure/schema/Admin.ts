import { Schema, model } from 'mongoose'

const adminSchema = new Schema({
  image: {
    type: String,
    required: false,
    default: ''
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 3
  },
  country: {
    type: String,
    required: false,
    default: ''
  },
  role: {
    type: String,
    required: true,
    enum: ['admin']
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  createdDate: {
    type: Date,
    default: Date()
  }
})

export default model('Admin', adminSchema)
