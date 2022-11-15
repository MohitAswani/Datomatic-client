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
  Radio,
  RadioGroup,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/Image/Logo";
import { PasswordField } from "../../components/Form/PasswordField";

const BACKEND_URL = import.meta.env.VITE_SERVER_URL;

export const SignUp = ({ state, setState, setAutoLogout }) => {
  // useNavigate
  const navigate = useNavigate();

  // useStates
  const [nameInput, setNameInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpInfo, setSignUpInfo] = useState("");
  const [userType, setUserType] = useState("patient");
  const [hospitalName, setHospitalName] = useState("");
  const [pharmacyName, setPharmacyName] = useState("");

  const nameChangeHandler = (event) => {
    setNameInput(event.target.value);
  };

  const phoneNumberChangeHandler = (event) => {
    setPhoneNumberInput(event.target.value);
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

    console.log(nameInput);

    const res = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput,
        phoneNumber: phoneNumberInput,
        password: passwordInput,
        confirmPassword: confirmPasswordInput,
        userType: userType,
        hospitalName: hospitalName,
        pharmacyName: pharmacyName,
      }),
    });

    const resData = await res.json();

    if (res.status === 422) {
      setSignUpError(resData.data[0].msg || "Validation failed. Please try again.");
      setState({
        ...state,
        authLoading: false,
      });
      return;
    }

    if (res.status !== 200 && res.status !== 201) {
      setSignUpError(resData.data[0].msg || "Something went wrong.");
      setState({
        ...state,
        authLoading: false,
      });
      return;
    }

    setSignUpError("");
    setSignUpInfo("User created successfully!");
    setNameInput("");
    setPhoneNumberInput("");
    setPasswordInput("");
    setConfirmPasswordInput("");
    setUserType("patient");
    setHospitalName("");
    setPharmacyName("");

    setState({
      ...state,
      isAuth: false,
      authLoading: false,
    });
  };

  const loginLinkHandler = () => {
    navigate("/login");
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
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={nameInput}
                  onChange={nameChangeHandler}
                />
              </FormControl>
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
              <PasswordField
                title="Confirm password"
                value={confirmPasswordInput}
                onChange={confirmPasswordChangeHandler}
              />
              <RadioGroup
                spacing={6}
                defaultValue="patient"
                value={userType}
                onChange={(e) => {
                  setUserType(e);
                }}
              >
                <Stack direction="row">
                  <Radio value="patient">Patient</Radio>
                  <Radio value="doctor">Doctor</Radio>
                  <Radio value="pharmacy">Pharmacy</Radio>
                </Stack>
              </RadioGroup>
              {userType === "doctor" && (
                <FormControl>
                  <FormLabel htmlFor="hospitalname">Hospital name</FormLabel>
                  <Input
                    id="hospitalName"
                    type="text"
                    value={hospitalName}
                    onChange={(e) => {
                      setHospitalName(e.target.value);
                    }}
                  />
                </FormControl>
              )}
              {userType === "pharmacy" && (
                <FormControl>
                  <FormLabel htmlFor="pharmacyname">Pharmacy name</FormLabel>
                  <Input
                    id="pharmacyName"
                    type="text"
                    value={pharmacyName}
                    onChange={(e) => {
                      setPharmacyName(e.target.value);
                    }}
                  />
                </FormControl>
              )}
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
