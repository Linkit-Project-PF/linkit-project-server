import { Schema, model } from 'mongoose'

const postulationSchema = new Schema({
  reason: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true,
    enum: ['now', 'one-month', 'negotiate']
  },
  salary: {
    type: Number,
    required: true,
    validate: {
      validator: function (value: number) {
        return value > 0 && value < 1000000
      },
      message: 'Not valid number for salary expectation'
    }
  },
  techStack: {
    type: Array,
    required: true,
    default: []
  },
  stack: {
    type: Array,
    required: true,
    default: []
  },
  recruiter: {
    type: String,
    required: true
  },
  jd: {
    type: Schema.Types.ObjectId,
    ref: 'Jd',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true
  }
})
export default model('Postulation', postulationSchema)
