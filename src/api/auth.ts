import API from './base'

export const AuthAPI = {
  login: (email: string, password: string) => {
    const params = new FormData()
    params.append('email', email)
    params.append('password', password)
    return API.post('auth/login', params)
  },
  getCurrentUser: () => {
    return API.get('auth/profile')
  },
}
