import React, { FC, ReactElement } from 'react'
import clsx from 'clsx'
import { Link, LinkProps, useRouteMatch } from 'react-router-dom'

export type DiscussionLinkProps = {
  icon: ReactElement
} & LinkProps

const DiscussionLink: FC<DiscussionLinkProps> = ({
  children,
  icon,
  to,
  ...props
}) => {
  const match = useRouteMatch({
    path: to as string,
  })
  return (
    <Link
      className={clsx(
        'flex items-center px-4 py-2 text-gray-50 transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100',
        match && 'bg-gray-800',
      )}
      href="#"
      to={to}
      {...props}
    >
      {icon}
      <span className="mx-2 font-medium">{children}</span>
    </Link>
  )
}
export default DiscussionLink
