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
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import MedicinalRow from "../../components/Form/MedicinalRow.jsx";

const PrescriptionOutput = ({
  patientName,
  patientAge,
  patientGender,
  patientPhNumber,
  remarks,
  medicineList,
  setPatientName,
  setPatientAge,
  setPatientGender,
  setPatientPhNumber,
  setMedicineList,
  setRemarks,
}) => {
  // const [patientName, setPatientName] = useState("");
  // const [patientAge, setPatientAge] = useState("");
  // const [patientGender, setPatientGender] = useState("");
  // const [patientPhNumber, patientPhNumber] = useState("");
  // const [medicineList, setMedicineList] = useState();

  return (
      <div
      className="prescriptionOutputMainView"
        style={{
          width: "50%",
          height: "90vh",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "2%",
          margin: "2%",
          borderRadius:"8px",
          backgroundColor: "white"
        }}
      >
        <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
          Prescription
        </Heading>
        <FormControl mt="5%" mr="5%">
          {/* {patientName && (
            <> */}
              <FormLabel htmlFor="name" fontWeight={"normal"}>
                Name
              </FormLabel>
              <Input
                id="name"
                placeholder="Patient's Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                bgColor="#f5f5f5"
              />
            {/* </>
          )} */}
        </FormControl>
        <Flex>
          <FormControl mt="5%" mr="5%">
            <FormLabel htmlFor="phnumber" fontWeight={"normal"}>
              Phone Number
            </FormLabel>
            <Input
              id="phnumber"
              placeholder="Phone Number"
              value={patientPhNumber}
              onChange={(e) => setPatientPhNumber(e.target.value)}
              bgColor="#f5f5f5"
            />
          </FormControl>
          <FormControl mt="5%" mr="5%">
            <FormLabel htmlFor="age" fontWeight={"normal"}>
              Age
            </FormLabel>
            <Input id="age" placeholder="Age" value={patientAge} onChange={(e)=>{
              setPatientAge(e.target.value)
            }}
            bgColor="#f5f5f5"
            />
          </FormControl>
          <FormControl mt="5%" mr="5%">
            <FormLabel htmlFor="gender" fontWeight={"normal"}>
              Gender
            </FormLabel>
            <Select
              placeholder="Gender"
              background={"white"}
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
              bgColor="#f5f5f5"
            >
              <option value="male" default>Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
        </Flex>
        <FormControl mt="5%" mr="5%">
            <FormLabel htmlFor="age" fontWeight={"normal"}>
              Description/Instruction
            </FormLabel>
            <Textarea id="age" placeholder="Description/Instruction" value={remarks} onChange={(e)=>{
              setRemarks(e.target.value)
            }}
            bgColor="#f5f5f5"
            />
          </FormControl>

        <TableContainer>
          <Table mt="5%" size="sm" h="full" bg="">
            <Thead>
              <Tr bgColor="white">
                <Th fontWeight="bold" minWidth="10%" maxWidth="10%" bgColor="white">
                  RxNORM code
                </Th>
                <Th fontWeight="bold" minWidth="40%" maxWidth="40%" bgColor="white">
                  Medication Name
                </Th>
                <Th fontWeight="bold" minWidth="10%" maxWidth="10%" bgColor="white">
                  Dosage (in mg)
                </Th>
                <Th fontWeight="bold" minWidth="15%" maxWidth="15%" bgColor="white">
                  Route
                </Th>
                <Th fontWeight="bold" minWidth="15%" maxWidth="15%" bgColor="white">
                  Frequency
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {medicineList &&
                medicineList.map((medicine, index) => (
                  <MedicinalRow medicineInfo={medicine} key={index} readOnly={false} />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
  );
};

export default PrescriptionOutput;
