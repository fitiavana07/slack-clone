import { Types } from 'mongoose'
import Context from '../context'
import { QueryResolvers } from '../generated/graphql'

const Query: QueryResolvers<Context> = {
  currentUser: async (_, __, context) => {
    return context.userService.getMe(context)
  },
  users: async (_, __, context) => {
    return await context.userService.findUsers()
  },
  dms: async (_, { destID }, context) => {
    return await context.messageService.findMyDMs(
      new Types.ObjectId(destID),
      context,
    )
  },
  channels: async (_, __, context) => {
    return await context.messageService.findChannels(context)
  },
}

export default Query
