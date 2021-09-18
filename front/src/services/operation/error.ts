export type OperationError<ErrorCodeType> = {
  code: DefaultErrorCodes | ErrorCodeType
  message?: string
}

export enum DefaultErrorCodes {
  NetworkError = 'NETWORK_ERROR',
  UnknownError = 'UNKNOWN_ERROR',
}
