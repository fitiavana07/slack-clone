import React from 'react'

const H2: React.FC = ({ children }) => {
  return (
    <h2 className="mb-4 text-3xl font-bold text-center text-gray-700 dark:text-white">
      {children}
    </h2>
  )
}

export default H2
