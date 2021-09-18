import { act, renderHook } from '@testing-library/react-hooks'
import { ChangeEvent } from 'react'
import useValueInput from './useValueInput'

test('default value', () => {
  const { result } = renderHook(() => useValueInput())

  const current = result.current

  expect(current.value).toBe('')
  expect(typeof current.handleChange).toBe('function')
  expect(current.state).toStrictEqual({ isDirty: false, isValid: false })
  expect(current.errors).toBeNull
})

test('initial value', () => {
  const initialValue = 'initial value'
  const { result } = renderHook(() => useValueInput(initialValue))
  expect(result.current.value).toBe(initialValue)
})

test('value after change', () => {
  const { result } = renderHook(() => useValueInput('oldValue'))
  expect(result.current.value).toBe('oldValue')
  act(() => {
    result.current.handleChange({
      target: { value: 'newValue' },
    } as ChangeEvent<HTMLInputElement>)
  })
  expect(result.current.value).toBe('newValue')
})
