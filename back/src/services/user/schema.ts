import { Schema } from 'mongoose'

const schema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  fullName: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
})

schema.index({ username: 1 })
schema.index({ email: 1 })

export default schema
