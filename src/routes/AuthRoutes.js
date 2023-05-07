import {Navigate, Route, Routes} from 'react-router-dom'
import {LoginPage, RegistrationPage} from '../components/auth'
import React from "react";

const AuthRoutes = () => (
    <>
        <Routes>
            <Route index path='login' element={<LoginPage />} />
            <Route path='registration' element={<RegistrationPage />} />
            <Route path='*' element={<Navigate to='login' />} />
        </Routes>
    </>
)

export {AuthRoutes}
