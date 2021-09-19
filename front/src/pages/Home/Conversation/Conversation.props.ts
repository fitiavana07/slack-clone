import { PartialMessage } from 'services/messages/partialMessage'
import { OperationError } from 'services/operation'

export type ConversationProps = {
  messages: PartialMessage[]
  loading: boolean
  sendMessage: (message: string) => void
  sendMessageLoading: boolean
  sendMessageError?: OperationError<undefined>
}
