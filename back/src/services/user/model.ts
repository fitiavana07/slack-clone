import { Connection, Model } from 'mongoose'
import { UserDoc } from './doc'
import schema from './schema'

export const createUserModel = (conn: Connection): UserModel =>
  conn.model<UserDoc>('user', schema)

export type UserModel = Model<UserDoc>
