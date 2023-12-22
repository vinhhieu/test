import { AuthAPI } from 'api'
import { Dict, IUser } from 'interfaces'
import { ACCESS_TOKEN_EXPIRE_DAYS, AUTH_TOKEN } from 'constant'
import CookiesUtils from './cookies'
import { useEffect, useState, createContext, useContext } from 'react'

export const AuthService = {
  login: async (formData: Dict) => {
    try {
      const result: Dict = await AuthAPI.login(formData.email, formData.password)
      const { data } = result
      if (data.access_token) {
        CookiesUtils.set(AUTH_TOKEN, data.access_token, {
          expires: ACCESS_TOKEN_EXPIRE_DAYS,
        })
      }
      return true
    } catch (error) {
      return Promise.reject(error)
    }
  },
  logout() {
    AuthService.clearTokens()
    window.location.href = '/'
  },
  clearTokens() {
    CookiesUtils.remove(AUTH_TOKEN)
  },
  isAuthenticated() {
    return CookiesUtils.get(AUTH_TOKEN)
  },
}

export interface IAuthContext {
  userData: Partial<IUser>
  isLoggedIn: boolean
  error: boolean
  setUser: (data: IUser) => void
  setIsLoggedIn: (data: boolean) => void
  getCurrentUser: () => void
}

const AuthContext = createContext<IAuthContext>({
  userData: {},
  isLoggedIn: false,
  error: false,
  setUser: () => {},
  setIsLoggedIn: () => {},
  getCurrentUser: () => {},
})

type Props = {
  children: React.ReactNode
}
export const AuthProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<Partial<IUser>>({})
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const getCurrentUser = async () => {
    await AuthAPI.getCurrentUser().then(
      (res: Dict) => {
        if (!res) return
        setError(false)
        setUserData(res?.data)
        setIsLoggedIn(true)
      },
      (error) => {
        setError(error ? true : false)
        setUserData({})
        setIsLoggedIn(false)
      },
    )
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  const setUser = (data: IUser) => {
    setUserData(data)
  }

  const stateValues: IAuthContext = {
    userData,
    isLoggedIn,
    error,
    setUser,
    setIsLoggedIn,
    getCurrentUser,
  }
  return <AuthContext.Provider value={stateValues}>{children}</AuthContext.Provider>
}
export function useAuthState() {
  const state = useContext(AuthContext)

  return {
    ...state,
    user: {
      ...state?.userData,
    },
  }
}
