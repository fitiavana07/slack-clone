import { Message } from '../../generated/graphql'

export type MessageDoc = Message & {
  authorID: string
  destID: string
}
