import Context from '../context'
import { ChannelResolvers } from '../generated/graphql'
import { ChannelDoc } from '../services/messages/channels'

const Channel: ChannelResolvers<Context, ChannelDoc> = {
  messages: (parent, __, context) => {
    return context.messageService.findChannelMessages(parent, context)
  },
}

export default Channel
