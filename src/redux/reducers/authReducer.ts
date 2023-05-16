import { CustomAction } from "../actions/generalAction"
import { ActionType } from "../actions/actionType"
import { AuthModel } from "../../components/auth"
import decode from "jwt-decode"

interface TokenDecode {
  user_id: number
  token: string
  exp: number
  iat: number
  jti: string
}

interface Token {
  token: string
  exp: number
  iat: number
  jti: string
}

export interface AuthState {
  user_id?: number
  access?: Token
  refresh?: string
  username?: string
  roles?: string[]
}

export const initialState: AuthState = {
  user_id: undefined,
  access: undefined,
  refresh: undefined,
  username: undefined,
  roles: undefined
}

interface AuthAction extends CustomAction {
  setAuth?: AuthModel
  updateAuth?: string
  updateRoles?: string[]
}

let decodedAccess: TokenDecode | undefined
let user_id: number | undefined
let access: Token | undefined
let refresh: string | undefined
let username: string | undefined
let roles: string[] | undefined

const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case ActionType.SET_AUTH_TOKEN:
      if (!action.setAuth) return state
      user_id = action.setAuth.access ? decode<TokenDecode>(action.setAuth.access).user_id : undefined
      decodedAccess = action.setAuth.access ? decode<TokenDecode>(action.setAuth.access) : undefined;
      access = decodedAccess && action.setAuth.access ? {
        token: action.setAuth.access,
        exp: decodedAccess.exp,
        iat: decodedAccess.iat,
        jti: decodedAccess.jti
      } : undefined;
      refresh = action.setAuth.refresh ? action.setAuth.refresh : undefined;
      username = action.setAuth.username ? action.setAuth.username : undefined;
      roles = action.setAuth.roles ? action.setAuth.roles : undefined;
      return {
        ...state,
        user_id,
        access,
        refresh,
        username,
        roles
      }
    case ActionType.UPDATE_ACCESS_TOKEN:
      if (!action.updateAuth) return state
      decodedAccess = action.updateAuth ? decode<TokenDecode>(action.updateAuth) : undefined;
      access = decodedAccess && action.updateAuth ? {
        token: action.updateAuth,
        exp: decodedAccess.exp,
        iat: decodedAccess.iat,
        jti: decodedAccess.jti
      } : undefined;
      return {
        ...state,
        access
      }
    case ActionType.REMOVE_AUTH_TOKEN:
      return {
        ...state,
        user_id: undefined,
        access: undefined,
        refresh: undefined,
        username: undefined,
        roles: undefined
      }
    case ActionType.UPDATE_ROLES_USER:
      if (!action.updateRoles) return state
      roles = action.updateRoles ? action.updateRoles : undefined;
      return {
        ...state,
        roles
      }
    default:
      return state
  }
}

export default authReducer