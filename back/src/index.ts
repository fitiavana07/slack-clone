import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import Context from './context'
import {
  JWT_EXP_DELTA,
  JWT_SECRET_KEY,
  MONGODB_URI,
  PORT,
  REDIS_HOST,
  REDIS_PORT,
} from './config'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core/dist/plugin/landingPage/graphqlPlayground'
import { createDBConnection } from './services/db'
import { createUserModel, UserService } from './services/user'
import { MessageService, createMessageModel } from './services/messages'
import { Types } from 'mongoose'
import { createChannelModel } from './services/messages/channels'
import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { RedisPubSub } from 'graphql-redis-subscriptions'

const start = async () => {
  const app = express()
  app.use(cors())

  const dbConnection = createDBConnection(MONGODB_URI)

  const userModel = createUserModel(dbConnection)
  const userService = new UserService(userModel, JWT_SECRET_KEY, JWT_EXP_DELTA)

  const messageModel = createMessageModel(dbConnection)
  const channelModel = createChannelModel(dbConnection)
  const messageService = new MessageService(
    messageModel,
    userService,
    channelModel,
  )

  const pubsub = new RedisPubSub({
    connection: {
      host: REDIS_HOST,
      port: REDIS_PORT,
    },
  })

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const server = new ApolloServer({
    schema,
    context: async ({ req }): Promise<Context> => {
      const accessToken = req.headers.authorization
      let userID
      if (accessToken) {
        const jwtPayload = await userService.parseJWT(accessToken)
        userID = jwtPayload.id
      }
      return {
        userID: new Types.ObjectId(userID),
        userService,
        messageService,
        pubsub,
      }
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
  })

  await server.start()
  server.applyMiddleware({ app })

  const httpServer = createServer(app)
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      async onConnect(connectionParams: {
        authorization?: string
      }): Promise<Context> {
        const accessToken = connectionParams.authorization
        let userID
        if (accessToken) {
          const jwtPayload = await userService.parseJWT(accessToken)
          userID = jwtPayload.id
        }
        return {
          userID: new Types.ObjectId(userID),
          userService,
          messageService,
          pubsub,
        }
      },
    },
    {
      server: httpServer,
      path: server.graphqlPath,
    },
  )

  httpServer.listen(PORT, () => {
    console.log(`Server ready, listening at port :${PORT}`)
  })
}

start()
