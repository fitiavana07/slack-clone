// import { gql, useApolloClient, useSubscription } from '@apollo/client'
// import {
//   DMsQuery,
//   DMsQueryVariables,
//   NewDMsSubscription,
//   NewDMsSubscriptionVariables,
// } from 'generated/graphql'
// import { QUERY_DMS } from './useDMs'

// const useNewDMs = (destID: string): void => {
//   const { data } = useSubscription<
//     NewDMsSubscription,
//     NewDMsSubscriptionVariables
//   >(MESSAGE_SUBSCRIPTION, { variables: { destID } })

//   //   const client = useApolloClient()

//   //   const newMessage = data?.newDM
//   //   if (!newMessage) {
//   //     return
//   //   }

//   //   const messagesData = client.readQuery<DMsQuery, DMsQueryVariables>({
//   //     query: QUERY_DMS,
//   //     variables: { destID },
//   //   })
//   //   const messages = messagesData?.dms || []
//   //   client.writeQuery<DMsQuery, DMsQueryVariables>({
//   //     query: QUERY_DMS,
//   //     variables: { destID },
//   //     data: {
//   //       dms: [...messages, newMessage],
//   //     },
//   //   })
// }

// export default useNewDMs
export default {}
