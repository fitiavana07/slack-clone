import React, { FC } from 'react'
import { PlusCircleIcon } from '@heroicons/react/solid'
import clsx from 'clsx'
import { Link, useRouteMatch } from 'react-router-dom'

const NewChannelButton: FC = () => {
  const match = useRouteMatch({
    path: '/new-channel' as string,
  })
  return (
    <Link
      className={clsx(
        'flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700',
        match && 'bg-gray-300',
      )}
      href="#"
      to="/new-channel"
    >
      <PlusCircleIcon className="w-4 h-4" />
      <span className="mx-2 font-medium">new channel</span>
    </Link>
  )
}

export default NewChannelButton
