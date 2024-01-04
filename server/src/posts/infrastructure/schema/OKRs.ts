import { Schema, model } from 'mongoose'

const OKRsSchema = new Schema({
  OKRtitle: {
    type: String,
    required: true
  },
  specificOKRs: {
    type: [String],
    required: false,
    validate: {
      validator: (array: string[]) => array.length >= 1,
      message: 'specificOKRs array must have at least 1 OKR added'
    }
  },
  archived: {
    type: Boolean,
    required: true,
    default: false
  }
})

export default model('OKRs', OKRsSchema)
