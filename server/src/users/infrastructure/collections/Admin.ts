import { Schema, model } from 'mongoose'

const adminSchema = new Schema({
  image: {
    type: String,
    required: false,
    minlength: 3
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  phone: {
    type: String,
    required: true,
    minlength: 5
  },
  country: {
    type: String,
    required: true,
    minlength: 2
  },
  linkedin: {
    type: String,
    required: false,
    minlength: 3,
    maxlength: 30
  },
  role: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    enum: ['admin']
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
})

export default model('Admin', adminSchema)