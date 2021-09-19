import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} & { [P in K]-?: NonNullable<T[P]> }
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
  createdAt: Scalars['Date']
  creator: User
  id: Scalars['ID']
  messages?: Maybe<Array<Message>>
  name: Scalars['String']
  private: Scalars['Boolean']
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
  author: User
  content: Scalars['String']
  createdAt: Scalars['Date']
  /** destination if it is a channel message */
  destChannel?: Maybe<Channel>
  /** dm or channel */
  destType: MessageDestinationType
  /** destination if it is a dm */
  destUser?: Maybe<User>
  id: Scalars['ID']
  updatedAt: Scalars['Date']
}

export enum MessageDestinationType {
  ChannelMessage = 'CHANNEL_MESSAGE',
  DirectMessage = 'DIRECT_MESSAGE',
}

export type Mutation = {
  __typename?: 'Mutation'
  addChannel: AddChannelPayload
  login: LoginPayload
  sendChannelMessage: SendChannelMessagePayload
  sendDM: SendDmPayload
  signup: SignupPayload
}

export type MutationAddChannelArgs = {
  input: AddChannelInput
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationSendChannelMessageArgs = {
  input: SendChannelMessageInput
}

export type MutationSendDmArgs = {
  input: SendDmInput
}

export type MutationSignupArgs = {
  input: SignupInput
}

export type Node = {
  id: Scalars['ID']
}

export type Query = {
  __typename?: 'Query'
  channel?: Maybe<Channel>
  channels?: Maybe<Array<Channel>>
  currentUser?: Maybe<User>
  /** Direct messages */
  dms?: Maybe<Array<Message>>
  user?: Maybe<User>
  users?: Maybe<Array<User>>
}

export type QueryChannelArgs = {
  id: Scalars['ID']
}

export type QueryDmsArgs = {
  destID: Scalars['ID']
}

export type QueryUserArgs = {
  id: Scalars['ID']
}

export type SendChannelMessageInput = {
  /** Channel ID to send the message to */
  destID: Scalars['ID']
  messageContent: Scalars['String']
}

export type SendChannelMessagePayload = {
  __typename?: 'SendChannelMessagePayload'
  message: Message
}

export type SendDmInput = {
  /** userID to send the message to */
  destID: Scalars['ID']
  messageContent: Scalars['String']
}

export type SendDmPayload = {
  __typename?: 'SendDMPayload'
  message: Message
}

export type SignupInput = {
  email: Scalars['String']
  fullName: Scalars['String']
  password: Scalars['String']
  username: Scalars['String']
}

export type SignupPayload = {
  __typename?: 'SignupPayload'
  accessToken: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  newChannelMessage?: Maybe<Message>
  newDM?: Maybe<Message>
}

export type SubscriptionNewChannelMessageArgs = {
  channelID: Scalars['ID']
}

export type SubscriptionNewDmArgs = {
  destID: Scalars['ID']
}

export type User = Node & {
  __typename?: 'User'
  email: Scalars['String']
  fullName: Scalars['String']
  id: Scalars['ID']
  username: Scalars['String']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<
  TResult,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddChannelInput: AddChannelInput
  AddChannelPayload: ResolverTypeWrapper<AddChannelPayload>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Channel: ResolverTypeWrapper<Channel>
  Date: ResolverTypeWrapper<Scalars['Date']>
  ID: ResolverTypeWrapper<Scalars['ID']>
  LoginInput: LoginInput
  LoginPayload: ResolverTypeWrapper<LoginPayload>
  Message: ResolverTypeWrapper<Message>
  MessageDestinationType: MessageDestinationType
  Mutation: ResolverTypeWrapper<{}>
  Node:
    | ResolversTypes['Channel']
    | ResolversTypes['Message']
    | ResolversTypes['User']
  Query: ResolverTypeWrapper<{}>
  SendChannelMessageInput: SendChannelMessageInput
  SendChannelMessagePayload: ResolverTypeWrapper<SendChannelMessagePayload>
  SendDMInput: SendDmInput
  SendDMPayload: ResolverTypeWrapper<SendDmPayload>
  SignupInput: SignupInput
  SignupPayload: ResolverTypeWrapper<SignupPayload>
  String: ResolverTypeWrapper<Scalars['String']>
  Subscription: ResolverTypeWrapper<{}>
  User: ResolverTypeWrapper<User>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddChannelInput: AddChannelInput
  AddChannelPayload: AddChannelPayload
  Boolean: Scalars['Boolean']
  Channel: Channel
  Date: Scalars['Date']
  ID: Scalars['ID']
  LoginInput: LoginInput
  LoginPayload: LoginPayload
  Message: Message
  Mutation: {}
  Node:
    | ResolversParentTypes['Channel']
    | ResolversParentTypes['Message']
    | ResolversParentTypes['User']
  Query: {}
  SendChannelMessageInput: SendChannelMessageInput
  SendChannelMessagePayload: SendChannelMessagePayload
  SendDMInput: SendDmInput
  SendDMPayload: SendDmPayload
  SignupInput: SignupInput
  SignupPayload: SignupPayload
  String: Scalars['String']
  Subscription: {}
  User: User
}

export type AddChannelPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AddChannelPayload'] = ResolversParentTypes['AddChannelPayload'],
> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type ChannelResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel'],
> = {
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  messages?: Resolver<
    Maybe<Array<ResolversTypes['Message']>>,
    ParentType,
    ContextType
  >
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  private?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export type LoginPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LoginPayload'] = ResolversParentTypes['LoginPayload'],
> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message'],
> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  destChannel?: Resolver<
    Maybe<ResolversTypes['Channel']>,
    ParentType,
    ContextType
  >
  destType?: Resolver<
    ResolversTypes['MessageDestinationType'],
    ParentType,
    ContextType
  >
  destUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  addChannel?: Resolver<
    ResolversTypes['AddChannelPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationAddChannelArgs, 'input'>
  >
  login?: Resolver<
    ResolversTypes['LoginPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'input'>
  >
  sendChannelMessage?: Resolver<
    ResolversTypes['SendChannelMessagePayload'],
    ParentType,
    ContextType,
    RequireFields<MutationSendChannelMessageArgs, 'input'>
  >
  sendDM?: Resolver<
    ResolversTypes['SendDMPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationSendDmArgs, 'input'>
  >
  signup?: Resolver<
    ResolversTypes['SignupPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationSignupArgs, 'input'>
  >
}

export type NodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node'],
> = {
  __resolveType: TypeResolveFn<
    'Channel' | 'Message' | 'User',
    ParentType,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  channel?: Resolver<
    Maybe<ResolversTypes['Channel']>,
    ParentType,
    ContextType,
    RequireFields<QueryChannelArgs, 'id'>
  >
  channels?: Resolver<
    Maybe<Array<ResolversTypes['Channel']>>,
    ParentType,
    ContextType
  >
  currentUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType
  >
  dms?: Resolver<
    Maybe<Array<ResolversTypes['Message']>>,
    ParentType,
    ContextType,
    RequireFields<QueryDmsArgs, 'destID'>
  >
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'id'>
  >
  users?: Resolver<
    Maybe<Array<ResolversTypes['User']>>,
    ParentType,
    ContextType
  >
}

export type SendChannelMessagePayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SendChannelMessagePayload'] = ResolversParentTypes['SendChannelMessagePayload'],
> = {
  message?: Resolver<ResolversTypes['Message'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SendDmPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SendDMPayload'] = ResolversParentTypes['SendDMPayload'],
> = {
  message?: Resolver<ResolversTypes['Message'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SignupPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SignupPayload'] = ResolversParentTypes['SignupPayload'],
> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription'],
> = {
  newChannelMessage?: SubscriptionResolver<
    Maybe<ResolversTypes['Message']>,
    'newChannelMessage',
    ParentType,
    ContextType,
    RequireFields<SubscriptionNewChannelMessageArgs, 'channelID'>
  >
  newDM?: SubscriptionResolver<
    Maybe<ResolversTypes['Message']>,
    'newDM',
    ParentType,
    ContextType,
    RequireFields<SubscriptionNewDmArgs, 'destID'>
  >
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  AddChannelPayload?: AddChannelPayloadResolvers<ContextType>
  Channel?: ChannelResolvers<ContextType>
  Date?: GraphQLScalarType
  LoginPayload?: LoginPayloadResolvers<ContextType>
  Message?: MessageResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Node?: NodeResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  SendChannelMessagePayload?: SendChannelMessagePayloadResolvers<ContextType>
  SendDMPayload?: SendDmPayloadResolvers<ContextType>
  SignupPayload?: SignupPayloadResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
  User?: UserResolvers<ContextType>
}
