import {Route, Routes, Navigate} from 'react-router-dom'
import NavbarComponent from "../components/Navbar";
import React from "react";

const PrivateRoutes = () => {

  return (
      <>
          <NavbarComponent></NavbarComponent>
          <Routes>
              <Route>
              </Route>
          </Routes>
      </>
  )
}

export {PrivateRoutes}
