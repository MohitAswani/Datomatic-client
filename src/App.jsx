import React, { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import { chakra, Button, Stack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import Navbar from "./components/Navbar/Navbar";
import CreatePrescription from "./pages/Home/CreatePrescription";
import Home from "./pages/Home/Home";

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

  return (
    <Fragment>
      <BrowserRouter>
        {state.isAuth ? (
          <Fragment>
            <Routes>
              <Route
                path="/create-prescription"
                element={<CreatePrescription />}
              />
              <Route
                element={
                  <Fragment>
                    <chakra.header>
                      <Navbar logoutHandler={logoutHandler} />
                    </chakra.header>
                    <Stack
                      direction="row"
                      spacing={4}
                      position={"absolute"}
                      bottom={"5%"}
                      right={"2%"}
                    >
                      <Link as={Link} to="/create-prescription">
                        <Button leftIcon={<AddIcon />} variant="primary">
                          Create Prescription
                        </Button>
                      </Link>
                    </Stack>
                    <chakra.footer></chakra.footer>
                  </Fragment>
                }
              >
                <Route path="/home" element={<Home />} />
              </Route>
            </Routes>
          </Fragment>
        ) : (
          <Fragment>
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
            </Routes>
          </Fragment>
        )}
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
