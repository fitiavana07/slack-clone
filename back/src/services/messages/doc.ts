import { Document, Types } from 'mongoose'
import { Message } from '../../generated/graphql'

export type MessageDoc = Document &
  Message & {
    authorID: Types.ObjectId
    destID: Types.ObjectId
  }
