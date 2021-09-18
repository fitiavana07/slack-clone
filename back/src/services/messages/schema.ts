import { Schema } from 'mongoose'
import { MessageDestinationType } from '../../generated/graphql'

const schema = new Schema(
  {
    content: {
      type: Schema.Types.String,
      required: true,
    },
    authorID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    destType: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(MessageDestinationType),
    },
    // usable for user or channel destination.
    destID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
)

export default schema
