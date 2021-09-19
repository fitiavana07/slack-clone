import React, { FC } from 'react'

const H4: FC = ({ children }) => {
  return (
    <h4 className="my-2 text-xl font-bold text-gray-700 dark:text-white">
      {children}
    </h4>
  )
}

export default H4
