import {Navigate, Route, Routes} from 'react-router-dom'
import NavbarComponent from "../components/Navbar";
import React from "react";
import {HomePage} from "../components/HomePage";
import {ProfilePage} from "../components/ProfilePage";

const PrivateRoutes = () => {

  return (
      <>
          <NavbarComponent></NavbarComponent>
          <Routes>
              <Route index path='' element={<HomePage />} />
              <Route index path='/profile' element={<ProfilePage />} />
              <Route path='*' element={<Navigate to='' />} />
          </Routes>
      </>
  )
}

export {PrivateRoutes}
