import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useChannelMessages } from 'services/messages'
import useSendChannelMessage from 'services/messages/useSendChannelMessage'
import Conversation from './Conversation'

const ChannelConversation: FC = () => {
  const { channelID } = useParams<{ channelID: string }>()
  const [messages, { loading }] = useChannelMessages(channelID)
  const [
    sendChannelMessage,
    { loading: sendChannelMessageLoading, error: sendChannelMessageError },
  ] = useSendChannelMessage(channelID)
  return (
    <Conversation
      messages={messages}
      loading={loading}
      sendMessage={sendChannelMessage}
      sendMessageLoading={sendChannelMessageLoading}
      sendMessageError={sendChannelMessageError}
    />
  )
}

export default ChannelConversation
