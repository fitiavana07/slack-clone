import { User } from '../../generated/graphql'

export type UserDoc = User & {
  password: string
}
