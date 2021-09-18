import { PubSubEngine } from 'graphql-subscriptions'
import { Types } from 'mongoose'
import { MessageService } from './services/messages'
import { UserService } from './services/user'
type Context = {
  userID?: Types.ObjectId
  userService: UserService
  messageService: MessageService
  pubsub: PubSubEngine
}

export default Context
