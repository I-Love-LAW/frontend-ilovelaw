import {Navigate, Route, Routes} from 'react-router-dom'
import NavbarComponent from "../components/Navbar";
import React from "react";
import {HomePage} from "../components/HomePage";

const PrivateRoutes = () => {

  return (
      <>
          <NavbarComponent></NavbarComponent>
          <Routes>
              <Route index path='' element={<HomePage />} />
              <Route path='*' element={<Navigate to='' />} />
          </Routes>
      </>
  )
}

export {PrivateRoutes}
