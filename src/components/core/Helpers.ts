import {AuthModel, FileModel} from './_models'
import { store } from '../../redux/store'
import { removeTokenAction, setAuthTokenAction, updateAccessTokenAction, updateRolesAction } from '../../redux/actions/authActions'
import { setFileAction, removeFileAction } from '../../redux/actions/fileActions'

const setAuth = (auth: AuthModel) => {
    store.dispatch(setAuthTokenAction(auth))
}

const refreshAuth = (access: string) => {
    store.dispatch(updateAccessTokenAction(access))
}

const removeAuth = () => {
    store.dispatch(removeTokenAction())
}

const updateRoles = (roles: string[]) => {
    store.dispatch(updateRolesAction(roles))
}

const setFile = (file: FileModel) => {
    store.dispatch(setFileAction(file))
}

const removeFile = () => {
    store.dispatch(removeFileAction())
}

const getAuth = () => {
    const state = store.getState();
    const authState = state.auth;

    if (!authState.access || !authState.refresh) {
        return
    }

    return authState
}

export function setupAxios(axios: any) {
    axios.defaults.headers.Accept = 'application/json'
    axios.interceptors.request.use(
        (config: {headers: {Authorization: string}}) => {
            const auth = getAuth()
            if (auth && auth.access) {
                config.headers.Authorization = `Bearer ${auth.access.token}`
            }

            return config
        },
        (err: any) => Promise.reject(err)
    )
}

export {getAuth, setAuth, refreshAuth, removeAuth, updateRoles, setFile, removeFile}
