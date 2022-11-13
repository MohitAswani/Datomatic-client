import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Container,
  VStack,
} from "@chakra-ui/react";
import PrescriptionInput from "../../components/Form/PrescriptionInput";
import PrescriptionOutput from "../../components/Form/PrescriptionOutput";

const CreatePrescription = ({ state, setState, setAutoLogout }) => {
  // useNavigate
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("male");
  const [patientPhNumber, setPatientPhNumber] = useState("");
  const [medicineList, setMedicineList] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [prescriptionError, setPrescriptionError] = useState("");

  const submitButtonHandler = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:5000/data/save-prescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + state.token,
      },
      body: JSON.stringify({
        patientName: patientName,
        patientPhoneNumber: patientPhNumber,
        patientAge: patientAge,
        patientGender: patientGender,
        patientMedications: medicineList,
        patientRemarks: remarks,
        doctorId: state.userId,
      }),
    });

    const resData = await res.json();

    if (res.status === 401) {
      setPrescriptionError(resData.message || "Authorization failed");
      return;
    }

    if (res.status === 422) {
      setPrescriptionError(resData.message || "Validation failed");
      return;
    }

    if (res.status !== 200 && res.status !== 201) {
      setPrescriptionError(resData.message || "Saving prescription failed.");
      return;
    }

    setPrescriptionError("");

    navigate("/home");
  };

  return (
    <Flex h="100%" w="100%">
      <PrescriptionInput
        setPatientName={setPatientName}
        setPatientAge={setPatientAge}
        setPatientGender={setPatientGender}
        setPatientPhNumber={setPatientPhNumber}
        setMedicineList={setMedicineList}
        setRemarks={setRemarks}
        submitButtonHandler={submitButtonHandler}
      />
      <PrescriptionOutput
        patientName={patientName}
        patientAge={patientAge}
        patientGender={patientGender}
        patientPhNumber={patientPhNumber}
        remarks={remarks}
        medicineList={medicineList}
        setPatientName={setPatientName}
        setPatientAge={setPatientAge}
        setPatientGender={setPatientGender}
        setPatientPhNumber={setPatientPhNumber}
        setRemarks={setRemarks}
        setMedicineList={setMedicineList}
      />
    </Flex>
  );
};

export default CreatePrescription;
