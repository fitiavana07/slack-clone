import { OperationError } from './error'

export type OperationResult<LoginErrorCodes> = {
  loading: boolean
  error?: OperationError<LoginErrorCodes>
}
// type Result = Omit<MutationResult, 'data' | 'error'> & {
//   error?: OperationError
// }
