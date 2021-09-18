import React from 'react'

const Page: React.FC = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-blue-100 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}

export default Page
