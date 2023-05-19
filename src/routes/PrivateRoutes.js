import { Navigate, Route, Routes } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import React from "react";
import { HomePage } from "../components/HomePage";
import { ConvertPage } from "../components/convert/ConvertPage";
import { HistoryPage } from "../components/HistoryPage";
import { ProfilePage } from "../components/ProfilePage";
import FooterComponent from "../components/Footer";
import { PaymentPage } from "../components/PaymentPage";

const PrivateRoutes = () => {
  return (
    <>
        <NavbarComponent></NavbarComponent>
        <Routes>
            <Route index path="" element={<HomePage />} />
            <Route index path="convert" element={<ConvertPage />} />
            <Route index path="history" element={<HistoryPage />} />
            <Route index path="profile" element={<ProfilePage />} />
            <Route index path="payment" element={<PaymentPage/>} />
            <Route index path="notification" element={<></>} />
            <Route path="*" element={<Navigate to="" />} />
        </Routes>
        <FooterComponent></FooterComponent>
    </>
  );
};

export { PrivateRoutes };
