import { Navigate, Route, Routes } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import React from "react";
import { HomePage } from "../components/HomePage";
import { ConvertPage } from "../components/ConvertPage";
import { HistoryPage } from "../components/HistoryPage";
import { ProfilePage } from "../components/ProfilePage";

const PrivateRoutes = () => {
  return (
    <>
        <NavbarComponent></NavbarComponent>
        <Routes>
            <Route index path="" element={<HomePage />} />
            <Route index path="convert" element={<ConvertPage />} />
            <Route index path="history" element={<HistoryPage />} />
            <Route index path="profile" element={<ProfilePage />} />
            <Route index path="payment" element={<></>} />
            <Route index path="notification" element={<></>} />
            <Route path="*" element={<Navigate to="" />} />
        </Routes>
    </>
  );
};

export { PrivateRoutes };
