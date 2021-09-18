import { Connection, Model } from 'mongoose'
import { ChannelDoc } from './doc'
import schema from './schema'

export const createChannelModel = (conn: Connection): ChannelModel =>
  conn.model('channel', schema)

export type ChannelModel = Model<ChannelDoc>
