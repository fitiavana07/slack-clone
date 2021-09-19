import React, { FC } from 'react'

const Container: FC = ({ children }) => (
  <aside className="sticky top-0 flex flex-col w-64 h-screen px-4 py-8 border-r bg-blue-50 dark:bg-gray-800 dark:border-gray-600">
    {children}
  </aside>
)
export default Container
