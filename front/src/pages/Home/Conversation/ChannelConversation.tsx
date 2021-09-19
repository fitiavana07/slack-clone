import React, { FC } from 'react'
import Conversation from './Conversation'

const ChannelConversation: FC = () => {
  return <Conversation messages={[]} loading={false} />
}

export default ChannelConversation
