import clsx from 'clsx'
import React from 'react'
import ActionButtonProps from './ActionButton.props'

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const { children, loading, ...otherProps } = props

  return (
    <div className="my-2">
      <button
        type="submit"
        className={clsx([
          'w-full px-4 py-2 text-sm font-medium font-semibold text-white uppercase rounded-md ',
          loading
            ? 'bg-blue-100 cursor-wait'
            : 'bg-blue-600 transition-colors duration-200 transform hover:bg-blue-500 focus:outline-none focus:bg-blue-500',
        ])}
        {...otherProps}
      >
        {loading ? 'Chargement...' : children}
      </button>
    </div>
  )
}

export default ActionButton
