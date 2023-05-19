import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from "./routes/AppRoutes";
import {AuthProvider, setupAxios} from './components/auth'
import {FileProvider} from "./components/convert";
import axios from 'axios'
import { Provider } from "react-redux"
import { store } from './redux/store'

setupAxios(axios)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AuthProvider>
            <FileProvider>
                <AppRoutes />
            </FileProvider>
        </AuthProvider>
    </Provider>
);


