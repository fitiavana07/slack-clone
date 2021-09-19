import React, { FC } from 'react'

const H4: FC = ({ children }) => {
  return (
    <h2 className="mb-4 text-xl font-bold text-center text-gray-700 dark:text-white">
      {children}
    </h2>
  )
}

export default H4
