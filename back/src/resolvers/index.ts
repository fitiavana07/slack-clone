import {
  Resolvers,
  MessageResolvers,
  ChannelResolvers,
} from '../generated/graphql'
import Message from './Message'
import Mutation from './Mutation'
import Query from './Query'
import Context from '../context'
import Channel from './Channel'
import Subscription from './Subscription'

const resolvers: Resolvers<Context> = {
  Mutation,
  Query,
  Message: Message as MessageResolvers,
  Channel: Channel as ChannelResolvers,
  Subscription,
}

export default resolvers
