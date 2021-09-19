import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import useDMs from 'services/messages/useDMs'
import Conversation from './Conversation'

const DMConversation: FC = () => {
  const { destID } = useParams<{ destID: string }>()
  const [messages, { loading }] = useDMs(destID)
  return <Conversation messages={messages} loading={loading} />
}

export default DMConversation
