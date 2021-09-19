import { useCallback, useState } from 'react'
import { HandleChangeType } from './types'

/**
 * useValueInput
 */
const useValueInput = (
  initialValue: string | (() => string) = '',
): {
  value: string
  handleChange: HandleChangeType
  reset: () => void
  state: {
    isDirty: boolean
    isValid: boolean
  }
  errors: null // TODO errors, many errors to be returned
} => {
  const [value, setValue] = useState(initialValue)
  // TODO isDirty
  const [isDirty, setIsDirty] = useState(false)
  // TODO isValid
  const [isValid, setIsValid] = useState(false)

  const handleChange = useCallback<HandleChangeType>(
    (e) => setValue(e.target.value),
    [setValue],
  )
  const reset = () => setValue('')
  return {
    value,
    handleChange,
    state: { isDirty, isValid },
    errors: null,
    reset,
  }
}

export default useValueInput
