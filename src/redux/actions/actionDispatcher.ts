import { ActionType } from "./actionType"
import { Dispatch } from "redux"
import { Action } from "./sessionAction"

const dispatchSession = (sessionID: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SESSION,
            payload: sessionID
        })
    }
}