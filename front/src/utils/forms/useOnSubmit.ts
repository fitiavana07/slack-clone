import { useCallback } from 'react'

const useOnSubmit = (
  f: () => void,
): React.FormEventHandler<HTMLFormElement> => {
  return useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      f()
    },
    [f],
  )
}
export default useOnSubmit
