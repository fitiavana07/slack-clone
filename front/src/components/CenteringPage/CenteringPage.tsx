import React from 'react'

const CenteringPage: React.FC = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}

export default CenteringPage
