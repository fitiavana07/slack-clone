import React, { useCallback } from 'react'

/**
 * useOnClickHandler returns a React.MouseEvent calling the given function,
 * after calling e.preventDefault()
 */
const useOnClickHandler = (
  f: () => void,
): ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) => {
  return useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      f()
    },
    [f],
  )
}

export default useOnClickHandler
