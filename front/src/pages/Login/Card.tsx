import React from 'react'

const Card: React.FC = ({ children }) => {
  return (
    <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
      {children}
    </div>
  )
}

export default Card
