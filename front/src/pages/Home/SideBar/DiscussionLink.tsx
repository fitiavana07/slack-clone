import React, { FC, ReactElement } from 'react'

type DiscussionLinkProps = {
  icon: ReactElement
}

const DiscussionLink: FC<DiscussionLinkProps> = ({ children, icon }) => {
  return (
    <a
      className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700"
      href="#"
    >
      {icon}
      <span className="mx-4 font-medium">{children}</span>
    </a>
  )
}
export default DiscussionLink
