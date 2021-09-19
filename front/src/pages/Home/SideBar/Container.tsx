import React, { FC } from 'react'

const Container: FC = ({ children }) => (
  <aside className="sticky top-0 flex flex-col h-screen max-w-2xl px-4 py-8 overflow-y-auto border-r w-72 bg-blue-50 dark:bg-gray-800 dark:border-gray-600">
    {children}
  </aside>
)
export default Container
