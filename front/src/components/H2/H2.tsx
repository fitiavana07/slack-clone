import clsx from 'clsx'
import React from 'react'
import { H2Props } from './H2.props'

const H2: React.FC<H2Props> = ({ children, className }) => {
  console.log(className)
  return (
    <h2
      className={clsx([
        'mb-4 text-3xl font-bold text-center dark:text-white',
        className,
      ])}
    >
      {children}
    </h2>
  )
}

export default H2
