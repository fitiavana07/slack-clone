import React, { FC } from 'react'
import { UsersIcon } from '@heroicons/react/solid'
import DiscussionLink, { DiscussionLinkProps } from './DiscussionLink'

const ChannelDiscussionLink: FC<Omit<DiscussionLinkProps, 'icon'>> = (
  props,
) => <DiscussionLink icon={<UsersIcon className="w-4 h-4" />} {...props} />

export default ChannelDiscussionLink
