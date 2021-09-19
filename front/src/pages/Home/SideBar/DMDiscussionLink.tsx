import React, { FC } from 'react'
import { UserIcon } from '@heroicons/react/solid'
import DiscussionLink, { DiscussionLinkProps } from './DiscussionLink'

const DMDiscussionLink: FC<Omit<DiscussionLinkProps, 'icon'>> = (props) => (
  <DiscussionLink icon={<UserIcon className="w-5 h-5" />} {...props} />
)

export default DMDiscussionLink
