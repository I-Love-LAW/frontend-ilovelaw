import { combineReducers } from "redux";
import sessionReducer from "./sessionReducer";
import authReducer, {initialState as authState} from "./authReducer";

export interface rootState {
    auth: typeof authState
}

const rootReducer = combineReducers({
    session: sessionReducer,
    auth: authReducer
})

export default rootReducer