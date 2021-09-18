import { Document } from 'mongoose'
import { User } from '../../generated/graphql'

export type UserDoc = Document &
  User & {
    password: string
  }
