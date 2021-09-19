import React, { FC } from 'react'
import { ConversationProps } from './Conversation.props'
import MessageView from './MessageView'
import TobBar from './TopBar'

const Conversation: FC<ConversationProps> = ({ loading, messages }) => {
  return (
    <div className="flex flex-col w-full">
      <TobBar />
      <div className="flex-grow px-6 py-4">
        {loading ? <p className="text-gray-500">Loading...</p> : null}
        {messages.map((m) => {
          return <MessageView key={m.id} message={m} />
        })}
      </div>
    </div>
  )
}

export default Conversation
