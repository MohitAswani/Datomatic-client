import React, { Fragment, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {chakra} from '@chakra-ui/react'

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const [isAuth, setIsAuth] = useState(true);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("light");

  if (isAuth) {
    return (
      <Fragment>

        <chakra.header>
          <Navbar/>
        </chakra.header>

        <BrowserRouter>
          <Routes>
            <Route path="/home" exact />
            <Route path="/" element={<Navigate replace to="/home" />} />
          </Routes>
        </BrowserRouter>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
