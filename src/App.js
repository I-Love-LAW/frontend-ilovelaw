import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from
      'react-router-dom'
import User from "./services/User";
import {Logout} from "./components/Logout";
import {ErrorsPage} from "./components/error/ErrorsPage";
import {AuthRoutes} from "./routes/AuthRoutes";
import {PrivateRoutes} from "./routes/PrivateRoutes";

function App() {
  const currentUser = User()
  return (
    <Router>
        <Routes>
            <Route path='error/*' element={<ErrorsPage />} />
            <Route path='logout' element={<Logout />} />
            {currentUser ? (
                <>
                    <Route path='/*' element={<PrivateRoutes />} />
                </>
            ) : (
                <>
                    <Route path='auth/*' element={<AuthRoutes />} />
                    <Route path='*' element={<Navigate to='/auth' />} />
                </>
            )}
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    </Router>
  )
}

export default App;
