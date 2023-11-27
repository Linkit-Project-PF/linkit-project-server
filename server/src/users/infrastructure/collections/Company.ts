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
  // TODO Add company Name. name is company administrator, companyName is the name of the company.
  companyName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 40
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
    minlength: 2,
    default: ''
  },
  linkedin: {
    type: String,
    required: false,
    minlength: 3,
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
