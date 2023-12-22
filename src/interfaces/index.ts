export type Dict = {
  [key: string]: any
}

export interface IUser {
  id: number
  email: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
}
