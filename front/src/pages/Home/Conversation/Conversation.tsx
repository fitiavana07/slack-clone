import React, { FC, useEffect, useRef } from 'react'
import { ConversationProps } from './Conversation.props'
import MessageView from './MessageView'
import TobBar from './TopBar'
import WritingBar from './WritingBar'

const Conversation: FC<ConversationProps> = ({
  loading,
  messages,
  sendMessage,
  sendMessageLoading,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  })
  return (
    <div className="flex flex-col w-full h-screen">
      <TobBar />
      <div className="flex-grow h-screen px-6 py-4 overflow-y-auto">
        {loading ? <p className="text-gray-500">Loading...</p> : null}
        {messages.map((m) => {
          return <MessageView key={m.id} message={m} />
        })}
        {!loading && messages.length === 0 ? (
          <div>
            <h5 className="text-lg font-semibold">
              Welcome to this fresh new conversation
            </h5>
            <p>
              You can start sending messages using the text input at the
              bottom.
            </p>
          </div>
        ) : null}
        <div id="bottom-of-the-screen-to-scroll" ref={bottomRef}></div>
      </div>
      <WritingBar
        sendMessage={sendMessage}
        sendMessageLoading={sendMessageLoading}
      />
    </div>
  )
}

export default Conversation
