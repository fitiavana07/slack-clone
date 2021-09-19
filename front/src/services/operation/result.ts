import { OperationError } from './error'

export type OperationResult<ErrorCodes> = {
  loading: boolean
  error?: OperationError<ErrorCodes>
}
// type Result = Omit<MutationResult, 'data' | 'error'> & {
//   error?: OperationError
// }
