import { AuthModel } from "../../components/auth"
import { ActionType } from "./actionType"

export function setAuthTokenAction(payload: AuthModel) {
  return {
    type: ActionType.SET_AUTH_TOKEN,
    setAuth: payload
  }
}

export function updateAccessTokenAction(payload: string) {
  return {
    type: ActionType.UPDATE_ACCESS_TOKEN,
    updateAuth: payload
  }
}

export function removeTokenAction() {
  return {
    type: ActionType.REMOVE_AUTH_TOKEN,
  }
}

export function updateRolesAction(payload: string[]) {
  return {
    type: ActionType.UPDATE_ROLES_USER,
    updateRoles: payload
  }
}
