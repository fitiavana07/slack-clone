import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import useDMs from 'services/messages/useDMs'
import useSendDM from 'services/messages/useSendDM'
import Conversation from './Conversation'

const DMConversation: FC = () => {
  const { destID } = useParams<{ destID: string }>()
  const [messages, { loading }] = useDMs(destID)
  const [sendDM, { loading: sendDMLoading, error: sendDMError }] =
    useSendDM(destID)
  return (
    <Conversation
      messages={messages}
      loading={loading}
      sendMessage={sendDM}
      sendMessageLoading={sendDMLoading}
      sendMessageError={sendDMError}
    />
  )
}

export default DMConversation
