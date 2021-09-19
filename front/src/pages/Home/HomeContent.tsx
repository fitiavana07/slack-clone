import React, { FC } from 'react'
import H4 from 'components/H4'

const HomeContent: FC = () => (
  <div className="flex flex-col w-full h-screen px-8 py-8">
    <H4>Welcome to Slack Clone</H4>
    <p>
      Open one of the <b className="font-semibold">conversations</b> in the
      sidebar and start sending messages.
    </p>
    <p>
      Only signed up users are listed in{' '}
      <b className="font-semibold">DIRECT MESSAGES</b>.
    </p>
    <p>
      Created channels are listed under{' '}
      <b className="font-semibold">CHANNELS</b>.
    </p>
    <p className="mt-8 text-gray-600">
      Slack Clone made by{' '}
      <a
        className="font-semibold hover:underline"
        href="https://github.com/fitiavana07"
      >
        Fitiavana Ramanandafy
      </a>
    </p>
  </div>
)

export default HomeContent
