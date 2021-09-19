import React, { FC } from 'react'
import { UsersIcon } from '@heroicons/react/solid'
import DiscussionLink from './DiscussionLink'

const ChannelDiscussionLink: FC = (props) => (
  <DiscussionLink icon={<UsersIcon className="w-5 h-5" />} {...props} />
)
export default ChannelDiscussionLink
