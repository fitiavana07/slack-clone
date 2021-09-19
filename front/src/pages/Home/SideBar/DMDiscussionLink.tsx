import React, { FC } from 'react'
import { UserIcon } from '@heroicons/react/solid'
import DiscussionLink, { DiscussionLinkProps } from './DiscussionLink'

const DMDiscussionLink: FC<Omit<DiscussionLinkProps, 'icon'>> = (props) => (
  <DiscussionLink icon={<UserIcon className="w-4 h-4" />} {...props} />
)

export default DMDiscussionLink
