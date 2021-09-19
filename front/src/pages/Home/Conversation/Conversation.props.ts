import { PartialMessage } from 'services/messages/useDMs'

export type ConversationProps = {
  messages: PartialMessage[]
  loading: boolean
}
