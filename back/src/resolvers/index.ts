import { Resolvers, MessageResolvers } from '../generated/graphql'
import Message from './Message'
import Mutation from './Mutation'
import Query from './Query'
import Context from '../context'

const resolvers: Resolvers<Context> = {
  Mutation,
  Query,
  Message: Message as MessageResolvers,
}

export default resolvers
