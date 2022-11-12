import React, { useState } from "react";
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

import { useToast } from "@chakra-ui/react";
import PrescriptionInput from "../../components/Form/PrescriptionInput";
import PrescriptionOutput from "../../components/Form/PrescriptionOutput";

const CreatePrescription = () => {
  const [patientName, setPatientName] = useState(null);
  const [patientAge, setPatientAge] = useState(null);
  const [patientGender, setPatientGender] = useState("male");
  const [patientPhNumber, setPatientPhNumber] = useState(null);
  const [medicineList, setMedicineList] = useState([
    // {
    //     RxNORMcode: "",
    //     medicineName: "",
    //     dosage: "",
    //     route: "",
    //     frequency: "",
    // },
    // {
    //     RxNORMcode: "",
    //     medicineName: "",
    //     dosage: "",
    //     route: "",
    //     frequency: "",
    // },
    // {
    //     RxNORMcode: "",
    //     medicineName: "",
    //     dosage: "",
    //     route: "",
    //     frequency: "",
    // },
    // {
    //     RxNORMcode: "",
    //     medicineName: "",
    //     dosage: "",
    //     route: "",
    //     frequency: "",
    // },
    // {
    //     RxNORMcode: "",
    //     medicineName: "",
    //     dosage: "",
    //     route: "",
    //     frequency: "",
    // },
    // {
    //     RxNORMcode: "",
    //     medicineName: "",
    //     dosage: "",
    //     route: "",
    //     frequency: "",
    // },
    // {
    //     RxNORMcode: "",
    //     medicineName: "",
    //     dosage: "",
    //     route: "",
    //     frequency: "",
    // },
    // {
    //     RxNORMcode: "",
    //     medicineName: "",
    //     dosage: "",
    //     route: "",
    //     frequency: "",
    // },
    // {
    //     RxNORMcode: "",
    //     medicineName: "",
    //     dosage: "",
    //     route: "",
    //     frequency: "",
    // },
    // {
    //     RxNORMcode: "",
    //     medicineName: "",
    //     dosage: "",
    //     route: "",
    //     frequency: "",
    // },
    // {
    //     RxNORMcode: "",
    //     medicineName: "",
    //     dosage: "",
    //     route: "",
    //     frequency: "",
    // }
  ]);

  return (
    <Container px={0} m={0} bgColor='#f5f5f5'>
      <Flex h="100vh" w="100vw">
        <PrescriptionInput 
            setPatientName={setPatientName}
            setPatientAge={setPatientAge}
            setPatientGender={setPatientGender}
            setPatientPhNumber={setPatientPhNumber}
            setMedicineList={setMedicineList}
        />
        <PrescriptionOutput 
            patientName={patientName}
            patientAge={patientAge}
            patientGender={patientGender}
            patientPhNumber={patientPhNumber}
            medicineList={medicineList}
            setPatientName={setPatientName}
            setPatientAge={setPatientAge}
            setPatientGender={setPatientGender}
            setPatientPhNumber={setPatientPhNumber}
            setMedicineList={setMedicineList}
        />
      </Flex>
    </Container>
  );
};

export default CreatePrescription;
