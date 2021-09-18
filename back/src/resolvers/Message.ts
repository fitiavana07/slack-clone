import Context from '../context'
import { MessageResolvers } from '../generated/graphql'
import { MessageDoc } from '../services/messages/doc'

const Message: MessageResolvers<Context, MessageDoc> = {
  author: (parent, __, context) => {
    return context.messageService.getAuthor(parent)
  },
  destUser: (parent, __, context) => {
    return context.messageService.getDestUser(parent)
  },
}

export default Message
