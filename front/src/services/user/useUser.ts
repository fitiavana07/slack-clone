export {}
export const getUser = (userID: string) => {
  // TODO
}
export const getUsers = (options: PaginationOptions) => {
  // TODO
}
// TODO move into a common directory, eg: services/common/
interface PaginationOptions {
  first?: number
  after?: string
  before?: string
  last?: number
  // TODO get from Sort enum from graphqlapi
  sort?: Sort
}

enum Sort {}
