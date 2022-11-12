import React, { useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactSketchCanvas } from "react-sketch-canvas";

const Form1 = () => {
  return (
    <FormControl>
      <VStack spacing={0} alignItems="flex-start">
        <Heading size="md">Patient's Name</Heading>
        <Text>Write patient's name in Textarea below</Text>
      </VStack>
    </FormControl>
  );
};

const Form2 = () => {
  return (
    <FormControl>
      <VStack spacing={0} alignItems="flex-start">
        <Heading size="md">Phone Number</Heading>
        <Text>Write patient's phone number in Textarea below</Text>
      </VStack>
    </FormControl>
  );
};
const Form3 = () => {
  return (
    <FormControl>
      <VStack spacing={0} alignItems="flex-start">
        <Heading size="md">Patient's Age</Heading>
        <Text>Write patient's age in Textarea below</Text>
      </VStack>
    </FormControl>
  );
};
const Form4 = () => {
  return (
    <FormControl>
      <VStack spacing={0} alignItems="flex-start">
        <Heading size="md">Patient's Gender</Heading>
        <Text>Write patient's gender in Textarea below</Text>
      </VStack>
    </FormControl>
  );
};
const Form5 = () => {
  return (
    <FormControl>
      <VStack spacing={0} alignItems="flex-start">
        <Heading size="md">Patient's medicine</Heading>
        <Text>
          Write patient's medicine with medicine name, dosage, route and
          frequency in seperate lines{" "}
        </Text>
      </VStack>
    </FormControl>
  );
};

const PrescriptionInput = ({
  setPatientName,
  setPatientAge,
  setPatientGender,
  setPatientPhNumber,
  setMedicineList,
}) => {
  const canvas = useRef(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const exportImage = async () => {
    const dataURL = await canvas.current.exportImage("jpeg");
    const clearCanvas = canvas.current.clearCanvas();

    const res = await fetch("http://localhost:5000/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: dataURL.split("64,")[1],
      }),
    });

    const resData = await res.json();

    if (res.status !== 200 && res.status !== 201) {
      setError(resData.message || "Something went wrong");
      return;
    }

    if (step === 1) {
      setPatientName(resData.data);
    }
    if (step === 2) {
      setPatientPhNumber(resData.data);
    }
    if (step === 3) {
      setPatientAge(resData.data);
    }
    if (step === 4) {
      if (
        resData.data === "male" ||
        resData.data[0] === "m" ||
        resData.data[0] === "M"
      ) {
        setPatientGender("male");
      } else if (
        resData.data === "female" ||
        resData.data[0] === "f" ||
        resData.data[0] === "F"
      ) {
        setPatientGender("female");
      } else {
        setPatientGender("other");
      }
    }
  };

  const exportMedicationImage = async () => {
    const dataURL = await canvas.current.exportImage("jpeg");
    const clearCanvas = canvas.current.clearCanvas();

    const res = await fetch("http://localhost:5000/scan-med", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: dataURL.split("64,")[1],
      }),
    });

    const resData = await res.json();

    if (res.status !== 200 && res.status !== 201) {
      setError(resData.message || "Something went wrong");
      return;
    }

    setMedicineList((prev) => [...prev, resData.data]);
  };

  const styles = {
    border: "0.0625rem solid #9c9c9c",
  };

  return (
    <div style={{
        width: "50%",
        height: "80%",
        padding: "2%",
        borderRadius:"8px",
      }}>
      <VStack
        spacing={10}
        w="full"
        h="full"
        p={5}
        paddingTop={2}
        paddingBottom={2}
        alignItems="flex-start"
        boxShadow="md"
        borderRadius={'8px'}
        height={"100vh"}
        bgColor={"white"}
      >
        {step === 1 ? (
          <Form1 />
        ) : step === 2 ? (
          <Form2 />
        ) : step === 3 ? (
          <Form3 />
        ) : step === 4 ? (
          <Form4 />
        ) : (
          <Form5 />
        )}
        <VStack spacing={0} w="100%" h="500px" alignItems="flex-start">
          <ReactSketchCanvas
            ref={canvas}
            style={styles}
            width="100%"
            height="100%"
            strokeWidth={4}
            strokeColor="black"
          />
        </VStack>
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                }}
                isDisabled={step === 1}
                variant="secondary"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  step <= 4 ? exportImage() : exportMedicationImage();
                  setStep(step + 1);
                }}
                w="7rem"
                variant="primary"
              >
                Next
              </Button>
            </Flex>
          </Flex>
        </ButtonGroup>
      </VStack>
    </div>
  );
};

export default PrescriptionInput;
