import { PartialMessage } from 'services/messages/partialMessage'

export type ConversationProps = {
  messages: PartialMessage[]
  loading: boolean
}
