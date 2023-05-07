import {useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import UserService from "../services/UserService";
import {useAuth} from "./auth";

export function Logout() {
    const {auth, logout, saveAuth} = useAuth()
    useEffect(() => {
        const api = async () => {
            localStorage.setItem("isFirstLoggedOut", true)
            UserService.logout(auth.username)
            logout()
            saveAuth(undefined)
        }

        api()
    }, [])

    return (
        <Navigate to='/admin' />
    )
}
