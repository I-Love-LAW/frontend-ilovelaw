import axios from "axios";
import {AUTH_BACKEND_URL} from "./Config";

const URL = AUTH_BACKEND_URL("api/auth")

class UserService {
    login(username, password) {
        const LOGIN_URL = URL + '/signin'
        const data = {username: username, password: password}

        return axios.post(LOGIN_URL, data)
    }

    refreshToken(refreshToken) {
        const REFRESH_TOKEN_URL = URL + '/refreshtoken'
        const data = {refresh: refreshToken}

        return axios.post(REFRESH_TOKEN_URL, data)
    }

    register(
        username, name, password
    ) {
        const REGISTER_TOKEN_URL = URL + '/signup'
        const data = {
            username: username,
            password: password,
            name: name
        }

        return axios.post(REGISTER_TOKEN_URL, data)
    }

    logout(username) {
        const LOGOUT_TOKEN_URL = URL + '/signout'
        const data = {
            username: username
        }
        return axios.post(LOGOUT_TOKEN_URL, data)
    }
}

export default new UserService();