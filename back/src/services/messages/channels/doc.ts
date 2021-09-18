import { Document, Types } from 'mongoose'
import { Channel } from '../../../generated/graphql'

export type ChannelDoc = Document &
  Channel & {
    creatorID: Types.ObjectId
  }
