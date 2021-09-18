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
}

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginPayload = {
  __typename?: 'LoginPayload'
  accessToken: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  signup: SignupPayload
  login: LoginPayload
}

export type MutationSignupArgs = {
  input: SignupInput
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type Node = {
  id: Scalars['ID']
}

export type Query = {
  __typename?: 'Query'
  currentUser?: Maybe<User>
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

export type User = Node & {
  __typename?: 'User'
  id: Scalars['ID']
  username: Scalars['String']
  email: Scalars['String']
  fullName: Scalars['String']
}

export type LoginMutationVariables = Exact<{
  email: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login: { __typename?: 'LoginPayload'; accessToken: string }
}
