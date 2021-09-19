import { User } from 'generated/graphql'

export type AuthorViewProps = {
  author: User | null // null for author not found
  loading: boolean
}
