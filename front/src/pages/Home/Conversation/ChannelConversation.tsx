import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useChannelMessages } from 'services/messages'
import Conversation from './Conversation'

const ChannelConversation: FC = () => {
  const { channelID } = useParams<{ channelID: string }>()
  const [messages, { loading }] = useChannelMessages(channelID)
  return <Conversation messages={messages} loading={false} />
}

export default ChannelConversation
