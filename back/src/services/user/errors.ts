import { ApolloError } from 'apollo-server-core'

export class UnauthenticatedError extends ApolloError {
  constructor() {
    super('Unauthenticated', 'UNAUTHENTICATED')
  }
}
