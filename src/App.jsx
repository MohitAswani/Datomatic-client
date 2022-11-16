import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Link,
  Navigate,
} from "react-router-dom";
import { chakra, Button, Stack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import Navbar from "./components/Navbar/Navbar";
import CreatePrescription from "./pages/Home/CreatePrescription";
import Home from "./pages/Home/Home";
import "./App.css";
import PrivateRoutes from "./components/Navigation/PrivateRoutes";
import HomeWrapper from "./components/Layout/HomeWrapper";

const App = () => {
  const [state, setState] = useState({
    isAuth: false,
    token: null,
    userId: null,
    authLoading: true,
    error: null,
    theme: "light",
    userType: null,
  });

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    const userType = localStorage.getItem("userType");

    if (!token && !expiryDate) {
      setState({
        ...state,
        isAuth: false,
        authLoading: false,
      });
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }

    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

    console.log(state);
    setState({
      ...state,
      isAuth: true,
      authLoading: false,
      token: token,
      userId: userId,
      userType: userType,
    });

    setState((prevState) => ({
      ...prevState,
      authLoading: false,
    }));
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
    localStorage.removeItem("userType");
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  return (
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
        <Route
          path="/signup"
          exact
          element={
            <SignUp
              state={state}
              setState={setState}
              setAutoLogout={setAutoLogout}
            />
          }
        />
        <Route
          element={
            <PrivateRoutes
              isAuth={state.isAuth}
              AuthLoading={state.authLoading}
            />
          }
        >
          <Route
            path="/home"
            exact
            element={
              <HomeWrapper state={state} logoutHandler={logoutHandler}>
                <Home
                  state={state}
                  setState={setState}
                  setAutoLogout={setAutoLogout}
                />
              </HomeWrapper>
            }
          />
          <Route
            path="/create-prescription"
            exact
            element={
              <CreatePrescription
                state={state}
                setState={setState}
                setAutoLogout={setAutoLogout}
              />
            }
          />
          <Route path="*" element={<Navigate to={"/home"} />} />
        </Route>
        <Route path="*" element={<Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
