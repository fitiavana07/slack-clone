import { Schema } from 'mongoose'

const schema = new Schema(
  {
    creatorID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    private: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export default schema
