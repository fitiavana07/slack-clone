import React from 'react'

const Alert: React.FC = ({ children }) => {
  return <p className="px-4 py-2 text-red-800 bg-red-100">{children}</p>
}

export default Alert
