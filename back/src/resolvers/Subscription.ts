import Context from '../context'
import { SubscriptionResolvers } from '../generated/graphql'
import {
  MessageDoc,
  TOPIC_NEW_CHANNEL_MESSAGE,
  TOPIC_NEW_DM,
} from '../services/messages'
import { withFilter } from 'graphql-subscriptions'

const Subscription: SubscriptionResolvers<Context> = {
  newDM: {
    subscribe: withFilter(
      (_, __, context: Context) => context.pubsub.asyncIterator(TOPIC_NEW_DM),
      (payload: { newDM: MessageDoc }, variables: { destID: string }) =>
        // only messages written by this authorID is sent to the subscription of arg destID
        payload.newDM.authorID.toString() === variables.destID,
    ),
  },
  newChannelMessage: {
    subscribe: withFilter(
      (_, __, context: Context) =>
        context.pubsub.asyncIterator(TOPIC_NEW_CHANNEL_MESSAGE),
      (
        payload: { newChannelMessage: MessageDoc },
        variables: { channelID: string },
      ) => {
        return (
          // only messages written to channel channelID are sent this subscription
          payload.newChannelMessage.destID.toString() === variables.channelID
        )
      },
    ),
  },
}

export default Subscription
