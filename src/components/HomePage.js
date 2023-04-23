import React from 'react';
import {useEffect, useState} from "react";
import Alert from 'react-bootstrap/Alert';

export function HomePage() {
    const [isFirstLoggedIn, setIsFirstLoggedIn] = useState(localStorage.getItem("isFirstLoggedIn"));

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

    const handleClose = () => {
        setIsFirstLoggedIn(false);
    };

    return (
        <section>
            {isFirstLoggedIn && (
                <Alert variant="success" show={isFirstLoggedIn} onClose={handleClose} dismissible>
                    <strong>Login!</strong> Anda berhasil masuk ke sistem.
                </Alert>
            )}
        </section>
    );

}
