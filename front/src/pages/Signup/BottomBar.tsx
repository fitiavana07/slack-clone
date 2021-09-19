import React, { FC } from 'react'

const BottomBar: FC = ({ children }) => {
  return (
    <div className="flex items-center justify-center py-4 text-center bg-gray-100 dark:bg-gray-700">
      {children}
    </div>
  )
}

export default BottomBar
