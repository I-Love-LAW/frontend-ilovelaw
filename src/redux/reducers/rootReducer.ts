import { combineReducers } from "redux";
import sessionReducer from "./sessionReducer";
import authReducer, {initialState as authState} from "./authReducer";
import fileReducer, {initialState as fileState} from "./fileReducer";

export interface rootState {
    auth: typeof authState
    file: typeof fileState
}

const rootReducer = combineReducers({
    session: sessionReducer,
    auth: authReducer,
    file: fileReducer
})

export default rootReducer