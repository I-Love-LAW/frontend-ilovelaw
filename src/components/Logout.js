import {useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import UserService from "../services/UserService";
import {useAuth} from "./auth";

export function Logout() {
    const {auth} = useAuth()

    useEffect(() => {
        const api = async () => {
            await UserService.logout(auth.username)
            document.location.reload()
        }

        api()
    }, [])

    return (
        <Navigate to='/admin' />
    )
}
