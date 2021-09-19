import React, { FC } from 'react'
import { useUser } from 'services/user'
import AuthorView from './AuthorView'
import { MessageViewProps } from './MessageView.props'
import TimeView from './TimeView'

const MessageView: FC<MessageViewProps> = ({ message }) => {
  const authorID = message.author.id

  // will use cache when already queried once
  const [author, { loading: loadingAuthor }] = useUser(authorID)
  return (
    <div className="my-1">
      <div className="flex items-baseline">
        <AuthorView author={author} loading={loadingAuthor} />
        <TimeView time={message.createdAt} />
      </div>
      <p>{message.content}</p>
    </div>
  )
}

export default MessageView
