import Context from '../context'
import { MutationResolvers } from '../generated/graphql'

const Mutation: MutationResolvers<Context> = {
  signup: async (_, { input }, context) => {
    const accessToken = await context.userService.signupAndLogin(input)
    return { accessToken }
  },
  login: async (_, { input }, context) => {
    const accessToken = await context.userService.login(input)
    return { accessToken }
  },
  sendDM: async (_, { input }, context) => {
    const message = await context.messageService.sendDM(input, context)
    return { message }
  },
  addChannel: async (_, { input }, context) => {
    const channel = await context.messageService.addChannel(
      input.name,
      context,
    )
    return { channel }
  },
}

export default Mutation
