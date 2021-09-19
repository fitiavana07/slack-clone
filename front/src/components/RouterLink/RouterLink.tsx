import React, { FC } from 'react'
import { Link, LinkProps } from 'react-router-dom'

const RouterLink: FC<LinkProps> = (props) => {
  return (
    <Link
      {...props}
      className="mx-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500"
    />
  )
}

export default RouterLink
