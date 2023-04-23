import React from 'react';
import {useEffect, useState} from "react";
import Alert from 'react-bootstrap/Alert';
import {useAuth} from "./auth";
import UserService from "../services/UserService";

export function HomePage() {
    const [isFirstLoggedIn, setIsFirstLoggedIn] = useState(localStorage.getItem("isFirstLoggedIn"));
    const {auth} = useAuth()
    const username = auth?.username
    const [user, setUser] = useState()

    useEffect(() => {
        if (isFirstLoggedIn) {
            const timeoutId = setTimeout(() => {
                localStorage.removeItem("isFirstLoggedIn")
                setIsFirstLoggedIn(false)
            }, 10000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isFirstLoggedIn]);

    useEffect(() => {
        const api = async () => {
            setUser((await UserService.getInfo(username)).data)
        }

        api()
    }, [username]);

    const handleClose = () => {
        setIsFirstLoggedIn(false);
    };

    return (
        <section className="container">
            {isFirstLoggedIn && (
                <Alert variant="success" show={isFirstLoggedIn} onClose={handleClose} dismissible>
                    <strong>Login!</strong> Anda berhasil masuk ke sistem.
                </Alert>
            )}

            {user && <h4>Selamat datang, {user.name}!</h4>}

        </section>
    );

}
