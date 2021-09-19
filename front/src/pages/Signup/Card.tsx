import React from 'react'

const Card: React.FC = ({ children }) => {
  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-md">
      {children}
    </div>
  )
}

export default Card
