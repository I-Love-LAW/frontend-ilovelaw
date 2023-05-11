import { Navigate, Route, Routes } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import React from "react";
import { HomePage } from "../components/HomePage";
import { ConvertPage } from "../components/ConvertPage";
import { HistoryPage } from "../components/HistoryPage";

const PrivateRoutes = () => {
  return (
    <>
      <NavbarComponent></NavbarComponent>
      <Routes>
        <Route index path="" element={<HomePage />} />
        <Route index path="convert" element={<ConvertPage />} />
        <Route index path="history" element={<HistoryPage />} />
        <Route path="*" element={<Navigate to="" />} />
      </Routes>
    </>
  );
};

export { PrivateRoutes };
