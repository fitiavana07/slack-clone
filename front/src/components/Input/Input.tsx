import React from 'react'
import InputProps from './Input.props'

const Input: React.FC<InputProps> = (props) => {
  // TODO use clsx to compose classNames
  return (
    <div className="my-2">
      <input
        {...props}
        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
      />
    </div>
  )
}
export default Input
