import React, { FC } from 'react'

const Container: FC = ({ children }) => (
  <div className="flex flex-col w-64 h-screen px-4 py-8 border-r bg-blue-50 dark:bg-gray-800 dark:border-gray-600">
    {children}
  </div>
)
export default Container
