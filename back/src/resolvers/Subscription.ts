import Context from '../context'
import { SubscriptionResolvers } from '../generated/graphql'
import { MessageDoc, TOPIC_NEW_DM } from '../services/messages'
import { withFilter } from 'graphql-subscriptions'

const Subscription: SubscriptionResolvers<Context> = {
  newDM: {
    subscribe: withFilter(
      (_, __, context) => context.pubsub.asyncIterator(TOPIC_NEW_DM),
      (payload: { newDM: MessageDoc }, variables: { destID: string }) => {
        return payload.newDM.authorID.toString() === variables.destID
      },
    ),
  },
}

export default Subscription
