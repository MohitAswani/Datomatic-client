import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { chakra } from "@chakra-ui/react";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const [state, setState] = useState({
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
    theme: "light",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");

    if (!token && !expiryDate) {
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }

    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setState({
      ...state,
      isAuth: true,
      token: token,
      userId: userId,
    });
    setAutoLogout(remainingMilliseconds);
  }, []);

  const logoutHandler = () => {
    setState({
      ...state,
      isAuth: false,
      token: null,
      userId: null,
    });

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  if (state.isAuth) {
    return (
      <Fragment>
        <chakra.header>
          <Navbar logoutHandler={logoutHandler}/>
        </chakra.header>

        <BrowserRouter>
          <Routes>
            <Route path="/home" exact />
            <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        </BrowserRouter>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            exact
            element={
              <Login
                state={state}
                setState={setState}
                setAutoLogout={setAutoLogout}
              />
            }
          />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
