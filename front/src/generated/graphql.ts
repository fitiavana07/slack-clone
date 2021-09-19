export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
}

export type AddChannelInput = {
  name: Scalars['String']
}

export type AddChannelPayload = {
  __typename?: 'AddChannelPayload'
  channel: Channel
}

export type Channel = Node & {
  __typename?: 'Channel'
  id: Scalars['ID']
  name: Scalars['String']
  private: Scalars['Boolean']
  messages?: Maybe<Array<Message>>
  creator: User
  createdAt: Scalars['Date']
  updatedAt: Scalars['Date']
}

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginPayload = {
  __typename?: 'LoginPayload'
  accessToken: Scalars['String']
}

export type Message = Node & {
  __typename?: 'Message'
  id: Scalars['ID']
  content: Scalars['String']
  author: User
  createdAt: Scalars['Date']
  updatedAt: Scalars['Date']
  /** dm or channel */
  destType: MessageDestinationType
  /** destination if it is a dm */
  destUser?: Maybe<User>
  /** destination if it is a channel message */
  destChannel?: Maybe<Channel>
}

export enum MessageDestinationType {
  DirectMessage = 'DIRECT_MESSAGE',
  ChannelMessage = 'CHANNEL_MESSAGE',
}

export type Mutation = {
  __typename?: 'Mutation'
  signup: SignupPayload
  login: LoginPayload
  sendDM: SendDmPayload
  addChannel: AddChannelPayload
  sendChannelMessage: SendChannelMessagePayload
}

export type MutationSignupArgs = {
  input: SignupInput
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationSendDmArgs = {
  input: SendDmInput
}

export type MutationAddChannelArgs = {
  input: AddChannelInput
}

export type MutationSendChannelMessageArgs = {
  input: SendChannelMessageInput
}

export type Node = {
  id: Scalars['ID']
}

export type Query = {
  __typename?: 'Query'
  currentUser?: Maybe<User>
  users?: Maybe<Array<User>>
  user?: Maybe<User>
  /** Direct messages */
  dms?: Maybe<Array<Message>>
  channels?: Maybe<Array<Channel>>
  channel?: Maybe<Channel>
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export type QueryDmsArgs = {
  destID: Scalars['ID']
}

export type QueryChannelArgs = {
  id: Scalars['ID']
}

export type SendChannelMessageInput = {
  messageContent: Scalars['String']
  /** Channel ID to send the message to */
  destID: Scalars['ID']
}

export type SendChannelMessagePayload = {
  __typename?: 'SendChannelMessagePayload'
  message: Message
}

export type SendDmInput = {
  messageContent: Scalars['String']
  /** userID to send the message to */
  destID: Scalars['ID']
}

export type SendDmPayload = {
  __typename?: 'SendDMPayload'
  message: Message
}

export type SignupInput = {
  username: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
  fullName: Scalars['String']
}

export type SignupPayload = {
  __typename?: 'SignupPayload'
  accessToken: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  newDM?: Maybe<Message>
}

export type SubscriptionNewDmArgs = {
  destID: Scalars['ID']
}

export type User = Node & {
  __typename?: 'User'
  id: Scalars['ID']
  username: Scalars['String']
  email: Scalars['String']
  fullName: Scalars['String']
}

export type ChannelMessagesQueryVariables = Exact<{
  channelID: Scalars['ID']
}>

export type ChannelMessagesQuery = {
  __typename?: 'Query'
  channel?: Maybe<{
    __typename?: 'Channel'
    id: string
    messages?: Maybe<
      Array<{
        __typename?: 'Message'
        id: string
        content: string
        createdAt: any
        author: { __typename?: 'User'; id: string }
      }>
    >
  }>
}

export type ChannelsQueryVariables = Exact<{ [key: string]: never }>

export type ChannelsQuery = {
  __typename?: 'Query'
  channels?: Maybe<Array<{ __typename?: 'Channel'; id: string; name: string }>>
}

export type CreateChannelMutationVariables = Exact<{
  name: Scalars['String']
}>

export type CreateChannelMutation = {
  __typename?: 'Mutation'
  addChannel: {
    __typename?: 'AddChannelPayload'
    channel: { __typename?: 'Channel'; id: string; name: string }
  }
}

export type DMsQueryVariables = Exact<{
  destID: Scalars['ID']
}>

export type DMsQuery = {
  __typename?: 'Query'
  dms?: Maybe<
    Array<{
      __typename?: 'Message'
      id: string
      content: string
      createdAt: any
      author: { __typename?: 'User'; id: string }
      destUser?: Maybe<{ __typename?: 'User'; id: string }>
    }>
  >
}

export type SendChanelMessageMutationVariables = Exact<{
  messageContent: Scalars['String']
  destID: Scalars['ID']
}>

export type SendChanelMessageMutation = {
  __typename?: 'Mutation'
  sendChannelMessage: {
    __typename?: 'SendChannelMessagePayload'
    message: {
      __typename?: 'Message'
      id: string
      content: string
      createdAt: any
      author: { __typename?: 'User'; id: string }
    }
  }
}

export type SendDmMutationVariables = Exact<{
  messageContent: Scalars['String']
  destID: Scalars['ID']
}>

export type SendDmMutation = {
  __typename?: 'Mutation'
  sendDM: {
    __typename?: 'SendDMPayload'
    message: {
      __typename?: 'Message'
      id: string
      content: string
      createdAt: any
      author: { __typename?: 'User'; id: string }
    }
  }
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
  __typename?: 'Query'
  currentUser?: Maybe<{
    __typename?: 'User'
    id: string
    email: string
    username: string
    fullName: string
  }>
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: { __typename?: 'LoginPayload'; accessToken: string }
}

export type SignupMutationVariables = Exact<{
  fullName: Scalars['String']
  username: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}>

export type SignupMutation = {
  __typename?: 'Mutation'
  signup: { __typename?: 'SignupPayload'; accessToken: string }
}

export type UserQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type UserQuery = {
  __typename?: 'Query'
  user?: Maybe<{
    __typename?: 'User'
    id: string
    email: string
    username: string
    fullName: string
  }>
}

export type UsersQueryVariables = Exact<{ [key: string]: never }>

export type UsersQuery = {
  __typename?: 'Query'
  users?: Maybe<
    Array<{
      __typename?: 'User'
      id: string
      email: string
      username: string
      fullName: string
    }>
  >
}
