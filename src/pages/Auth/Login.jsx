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

const BACKEND_URL = import.meta.env.VITE_SERVER_URL;

export const Login = ({ state, setState, setAutoLogout }) => {
  // useNavigate
  const navigate = useNavigate();

  // useState
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginInfo, setLoginInfo] = useState("");

  const phoneNumberChangeHandler = (event) => {
    setPhoneNumberInput(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPasswordInput(event.target.value);
  };

  const rememberMeChangeHandler = (event) => {
    setRememberMe(event.target.checked);
  };

  const signInOnSubmitHandler = async (event) => {
    event.preventDefault();

    setState({
      ...state,
      authLoading: true,
    });

    const res = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumberInput,
        password: passwordInput,
      }),
    });

    const resData = await res.json();

    console.log(resData);

    if (res.status === 422) {
      setLoginError(resData.data[0].msg || "Invalid phone number or password");
      setState({
        ...state,
        authLoading: false,
      });
      return;
    }
    if (res.status !== 200 && res.status !== 201) {
      setLoginError(resData.data[0].msg || "Something went wrong");
      setState({
        ...state,
        authLoading: false,
      });
      return;
    }

    setLoginError("");

    setLoginInfo("Login successful!");

    console.log(resData);

    setState({
      ...state,
      isAuth: true,
      token: resData.token,
      authLoading: false,
      userId: resData.userId,
      userType: resData.userType,
    });

    if (rememberMe) {
      localStorage.setItem("token", resData.token);
      localStorage.setItem("userId", resData.userId);
      localStorage.setItem("userType", resData.userType);

      const remainingMilliseconds = 10 * 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);

      localStorage.setItem("expiryDate", expiryDate.toISOString());

      setAutoLogout(remainingMilliseconds);
    }

    navigate("/home");
  };

  const signUpLinkHandler = () => {
    navigate("/signup");
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
              Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Button
                variant="link"
                colorScheme="blue"
                onClick={signUpLinkHandler}
              >
                Sign up
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
                <FormLabel htmlFor="phonenumber">Phone number</FormLabel>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumberInput}
                  onChange={phoneNumberChangeHandler}
                />
              </FormControl>
              <PasswordField
                title="Password"
                value={passwordInput}
                onChange={passwordChangeHandler}
              />
            </Stack>
            <HStack justify="space-between">
              <Checkbox value={rememberMe} onChange={rememberMeChangeHandler}>
                Remember me
              </Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password?
              </Button>
            </HStack>

            {loginError && (
              <Stack spacing="2">
                <Alert status="error">
                  <AlertIcon />
                  {loginError}
                </Alert>
              </Stack>
            )}

            {loginInfo && (
              <Stack spacing="2">
                <Alert status="success">
                  <AlertIcon />
                  {loginInfo}
                </Alert>
              </Stack>
            )}

            <Stack spacing="6">
              <Button variant="primary" onClick={signInOnSubmitHandler}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
