import {
  ReactNode,
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from 'react'
import {LayoutSplashScreen} from '../../metronic/MetronicSplashScreen'
import {AuthModel} from './_models'
import * as authHelper from './AuthHelpers'
import UserService from "../../../services/UserService";
import { AuthState } from '../../../redux/reducers/authReducer'
import { useSelector } from 'react-redux'
import { rootState } from '../../../redux/reducers/rootReducer'

type WithChildren = {
  children?: ReactNode
}

type AuthContextProps = {
  auth: AuthState | undefined,
  username: string | undefined,
  saveAuth: (auth: AuthModel | undefined) => void,
  logout: () => void
}

const initAuthContextPropsState = {
  auth: undefined,
  username: undefined,
  saveAuth: () => {},
  logout: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const auth = useSelector((state: rootState) => state.auth)
  const username = "dummy user"
  const saveAuth = (auth: AuthModel | undefined) => {
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }
  const logout = () => {
    saveAuth(undefined)
  }

  // @ts-ignore
  return (
    <AuthContext.Provider value={{auth, username, saveAuth, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, logout} = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  useEffect(() => {
    const requestUser = async (auth: AuthState) => {
      if (!didRequest.current) {
        // ga ada token
        if (!auth.access || !auth.refresh) logout()
        else {
          if (auth.access.exp && auth.access.exp <= Date.now()/1000) {
            // refresh
            try {
              const {data: authData} = await UserService.refreshToken(auth.refresh)
              authHelper.refreshAuth(authData.access)
            } catch (error) {
              // gagal refresh
              console.log(error)
              logout()
            }
          }
        }
        
      }
      
      setShowSplashScreen(false)

      return () => (didRequest.current = true)
    }

    if (auth) {
      requestUser(auth)
    } else {
      logout()
      setShowSplashScreen(false)
    }
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <div>{children}</div>
}

export {AuthProvider, AuthInit, useAuth}
