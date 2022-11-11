import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Alert,
  AlertIcon,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/Image/Logo";
import { PasswordField } from "../../components/Form/PasswordField";

export const SignUp = ({ state, setState, setAutoLogout }) => {
  // useNavigate
  const navigate = useNavigate();

  // useStates
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpInfo, setSignUpInfo] = useState("");

  const usernameChangeHandler = (event) => {
    setUsernameInput(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    setConfirmPasswordInput(event.target.value);
  };

  const signUpOnSubmitHandler = async (event) => {
    event.preventDefault();

    setState({
      ...state,
      authLoading: true,
    });

    const res = await fetch("http://localhost:5000/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
        confirmPassword: confirmPasswordInput,
      }),
    });

    const resData = await res.json();

    console.log(resData);

    if (res.status === 422) {
      setSignUpError(
        resData.message || "Validation failed. Please try again."
      );
      setState({
        ...state,
        authLoading: false,
      });
      return;
    }

    if (res.status !== 200 && res.status !== 201) {
      setSignUpError(resData.message || "Something went wrong.");
      setState({
        ...state,
        authLoading: false,
      });
      return;
    }

    setSignUpError("");
    setSignUpInfo("User created successfully!");
    setUsernameInput("");
    setPasswordInput("");
    setConfirmPasswordInput("");

    setState({
      ...state,
      isAuth: false,
      authLoading: false,
    });
  };

  const loginLinkHandler = () => {
    navigate("/");
  };

  return (
    <Container
      maxW="lg"
      py={{
        base: "12",
        md: "24",
      }}
      px={{
        base: "0",
        sm: "8",
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <HStack justify="center">
            <Logo width="48px" height="48px" />
          </HStack>
          <Stack
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={useBreakpointValue({
                base: "xs",
                md: "sm",
              })}
            >
              Create a new account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already have an account?</Text>
              <Button
                variant="link"
                colorScheme="blue"
                onClick={loginLinkHandler}
              >
                Sign in
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={useBreakpointValue({
            base: "transparent",
            sm: "bg-surface",
          })}
          boxShadow={{
            base: "none",
            sm: useColorModeValue("md", "md-dark"),
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  value={usernameInput}
                  onChange={usernameChangeHandler}
                />
              </FormControl>
              <PasswordField
                title="Password"
                value={passwordInput}
                onChange={passwordChangeHandler}
              />
              <PasswordField
                title="Confirm password"
                value={confirmPasswordInput}
                onChange={confirmPasswordChangeHandler}
              />
            </Stack>

            {signUpError && (
              <Stack spacing="2">
                <Alert status="error">
                  <AlertIcon />
                  {signUpError}
                </Alert>
              </Stack>
            )}

            {signUpInfo && (
              <Stack spacing="2">
                <Alert status="success">
                  <AlertIcon />
                  {signUpInfo}
                </Alert>
              </Stack>
            )}

            <Stack spacing="6">
              <Button variant="primary" onClick={signUpOnSubmitHandler}>
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default SignUp;
