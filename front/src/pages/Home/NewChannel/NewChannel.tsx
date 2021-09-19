import ActionButton from 'components/ActionButton'
import H4 from 'components/H4'
import React, { FC } from 'react'
import useCreateChannel from 'services/messages/useCreateChannel'
import { useOnSubmit, useValueInput } from 'utils/forms'

const NewChannel: FC = () => {
  const {
    value: channelName,
    handleChange: handleChangeChannelName,
    reset: resetChannelName,
  } = useValueInput('')
  const [createChannel, { loading }] = useCreateChannel()
  const onSubmit = useOnSubmit(() => {
    createChannel(channelName)
    resetChannelName()
  })

  return (
    <div className="w-full h-screen px-6 py-4">
      <form onSubmit={onSubmit}>
        <H4>Create a new channel</H4>
        <p>Please enter the name of the new channel:</p>
        <div className="flex">
          <input
            type="text"
            placeholder="random"
            value={channelName}
            onChange={handleChangeChannelName}
            className="px-2 my-2 mr-4 border border-gray-400 focus:outline-none"
            disabled={loading}
          />
          <ActionButton loading={loading}>Create</ActionButton>
        </div>
      </form>
    </div>
  )
}

export default NewChannel
