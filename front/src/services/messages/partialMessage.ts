export type PartialMessage = {
  __typename?: 'Message'
  id: string
  content: string
  createdAt: any
  author: { __typename?: 'User'; id: string }
  destUser?: { __typename?: 'User'; id: string } | null
}
