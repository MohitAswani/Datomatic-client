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
import Navbar from "../Navbar/Navbar";

const HomeWrapper = ({ state,logoutHandler,children }) => {
  return (
    <Fragment>
      <chakra.header>
        <Navbar state={state} logoutHandler={logoutHandler} />
      </chakra.header>
      {state.userType === "doctor" && (
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
      )}
      <chakra.main>{children}</chakra.main>
      <chakra.footer></chakra.footer>
    </Fragment>
  );
};

export default HomeWrapper;
