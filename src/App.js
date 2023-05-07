import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import {
    ErrorsPage,
    Logout
} from "./components";
import { useAuth } from './components/auth';
import {PrivateRoutes} from "./routes/PrivateRoutes";
import {AuthRoutes} from "./routes/AuthRoutes";


function App() {
    const {auth} = useAuth()
    const currentUser = auth?.username

    return (
        <Router>
            <Routes>
                <Route path='error/*' element={<ErrorsPage />} />
                <Route path='logout' element={<Logout />} />
                {currentUser ? (
                    <>
                        <Route path='*' element={<PrivateRoutes />} />
                    </>
                ) : (
                    <>
                        <Route path='auth/*' element={<AuthRoutes />} />
                        <Route path='*' element={<Navigate to='/auth' />} />
                    </>
                )}
                <Route path='*' element={<Navigate to='' />} />
            </Routes>
        </Router>
    )
}

export default App;
