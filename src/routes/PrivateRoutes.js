import {Route, Routes } from 'react-router-dom'
import NavbarComponent from "../components/Navbar";
import React from "react";

const PrivateRoutes = () => {

  return (
      <>
          <NavbarComponent></NavbarComponent>
          <Routes>
              <Route index path='*' element={<></>} />
          </Routes>
      </>
  )
}

export {PrivateRoutes}
