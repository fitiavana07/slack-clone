import { Connection, Model } from 'mongoose'
import { MessageDoc } from './doc'
import schema from './schema'

export const createMessageModel = (conn: Connection): MessageModel =>
  conn.model('message', schema)

export type MessageModel = Model<MessageDoc>
