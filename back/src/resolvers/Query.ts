import Context from '../context'
import { QueryResolvers } from '../generated/graphql'
import { UnauthenticatedError } from '../services/user'

const Query: QueryResolvers<Context> = {
  currentUser: async (_, __, context) => {
    if (!context.userID) {
      throw new UnauthenticatedError()
    }
    return await context.userService.findByID(context.userID)
  },
  users: async (_, __, context) => {
    return await context.userService.findUsers()
  },
}

export default Query
