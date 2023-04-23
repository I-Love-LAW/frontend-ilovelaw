import axios from "axios";
import {AUTH_BACKEND_URL} from "./Config";

const AUTH_URL = AUTH_BACKEND_URL("api/auth")
const USER_URL = AUTH_BACKEND_URL("api/user")

class UserService {
    login(username, password) {
        const LOGIN_URL = AUTH_URL + '/signin'
        const data = {username: username, password: password}

        return axios.post(LOGIN_URL, data)
    }

    refreshToken(refreshToken) {
        const REFRESH_TOKEN_URL = AUTH_URL + '/refresh-token'
        const data = {refresh: refreshToken}

        return axios.post(REFRESH_TOKEN_URL, data)
    }

    register(
        username, name, password
    ) {
        const REGISTER_TOKEN_URL = AUTH_URL + '/signup'
        const data = {
            username: username,
            password: password,
            name: name
        }

        return axios.post(REGISTER_TOKEN_URL, data)
    }

    getInfo(username) {
        const REGISTER_TOKEN_URL = USER_URL + '/' + username

        return axios.get(REGISTER_TOKEN_URL)
    }

    logout(username) {
        const LOGOUT_TOKEN_URL = AUTH_URL + '/signout'
        const data = {
            username: username
        }
        return axios.post(LOGOUT_TOKEN_URL, data)
    }
}

export default new UserService();