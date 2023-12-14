import { Schema, model } from 'mongoose'

const postulationSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  cv: {
    type: String,
    required: true,
    minlength: 10
  },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  linkedin: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  country: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  englishlevel: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  salary: {
    type: Number,
    required: true,
    minlength: 3,
    maxlength: 7
  },
  searchreasons: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  noticeperiod: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  techstack: {
    type: Array,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  recruiter: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  rol: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  code: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  }
})
export default model('Postulations', postulationSchema)
