import React, { FC } from 'react'
import { ReplyIcon } from '@heroicons/react/solid'
import { useOnSubmit, useValueInput } from 'utils/forms'
import { WritingBarProps } from './WritingBar.props'
import clsx from 'clsx'

const WritingBar: FC<WritingBarProps> = ({
  sendMessage,
  sendMessageLoading,
}) => {
  const {
    value: message,
    handleChange: handleChangeMessage,
    reset: resetMessage,
  } = useValueInput('')

  const onSubmit = useOnSubmit(() => {
    sendMessage(message)
    resetMessage()
  })
  return (
    <div className="px-6 py-4">
      <form onSubmit={onSubmit}>
        <div
          className={clsx(
            'flex w-full px-2 py-2 border border-gray-600 rounded-sm bg-white',
            sendMessageLoading && 'bg-gray-100',
          )}
        >
          <input
            type="text"
            className={clsx(
              'flex-grow text-black placeholder-gray-400 focus:outline-none',
              sendMessageLoading && 'bg-gray-100',
            )}
            placeholder="Write something"
            value={message}
            onChange={handleChangeMessage}
            disabled={sendMessageLoading}
          />
          <button
            type="submit"
            className={clsx(
              'flex items-center content-center px-2 ml-2 hover:bg-gray-200 rounded-lg',
              sendMessageLoading && 'text-gray-400',
            )}
          >
            <ReplyIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default WritingBar
