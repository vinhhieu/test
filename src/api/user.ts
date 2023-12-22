import API from './base'
import { Dict } from 'interfaces'

export const UserAPI = {
  createUser: (data: Dict) => {
    return API.post('user', data)
  },
  save: (data: Dict) => {
    return API.put('user', data)
  },
}
