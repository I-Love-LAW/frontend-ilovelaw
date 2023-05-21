import { Navigate, Route, Routes } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import React, {useEffect, useState} from "react";
import { HomePage } from "../components/HomePage";
import { ConvertPage } from "../components/convert/ConvertPage";
import { HistoryPage } from "../components/HistoryPage";
import { ProfilePage } from "../components/ProfilePage";
import FooterComponent from "../components/Footer";
import { PaymentPage } from "../components/PaymentPage";
import NotifierPage from "../components/notifier/NotifierPage";
import SockJS from "sockjs-client";
import {NOTIFIER_BACKEND_URL} from "../services/Config";
import {over} from "stompjs";
import NotifierService from "../services/NotifierService";

const PrivateRoutes = ({username}) => {
    var stompClient = null;
    const [notifier, setNotifier] = useState([]);
    const [newNotifier, serNewNotifier] = useState([]);

    useEffect(() => {
        const getNotification = async () => {
            const notif = await NotifierService.getNotification(username)
            setNotifier(notif.data)
        }

        getNotification()
        connect()
    }, [username])

    const connect = () => {
        let socket = new SockJS(NOTIFIER_BACKEND_URL("notifier-app"));
        stompClient = over(socket);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        stompClient.subscribe('/user/' + username + '/notification', onPrivateMessage);
    }

    const onPrivateMessage = (payload) => {
        let payloadData = JSON.parse(payload.body);
        newNotifier.push(payloadData);
        serNewNotifier([...newNotifier]);
    }

    const onError = (err) => {
        console.log(err);
    }

  return (
    <>
        <NavbarComponent notifier={notifier} newNotifier={newNotifier}></NavbarComponent>
        <Routes>
            <Route index path="" element={<HomePage />} />
            <Route index path="convert" element={<ConvertPage />} />
            <Route index path="history" element={<HistoryPage />} />
            <Route index path="profile" element={<ProfilePage />} />
            <Route index path="payment" element={<PaymentPage/>} />
            <Route index path="notification" element={<NotifierPage notifier={notifier} newNotifier={newNotifier}/>} />
            <Route path="*" element={<Navigate to="" />} />
        </Routes>
        <FooterComponent></FooterComponent>
    </>
  );
};

export { PrivateRoutes };
