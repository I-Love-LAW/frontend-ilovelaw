import {useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import UserService from "../services/UserService";
import {useAuth} from "./auth";

export function Logout() {
    const {auth, logout, saveAuth} = useAuth()
    useEffect(() => {
        const api = async () => {
            console.log(auth.username)
            await UserService.logout(auth.username)
            await logout()
            await saveAuth(undefined)
            document.location.reload()
        }

        api()
    }, [])

    return (
        <Navigate to='/admin' />
    )
}
