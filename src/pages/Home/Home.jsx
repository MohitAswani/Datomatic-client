import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Badge,
  Button,
  Center,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Textarea,
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
import {Modal} from 'react-bootstrap';
import { FcLock } from "react-icons/fc";
import { Fragment, useEffect, useRef, useState } from "react";
import React from "react";
import PrescriptionCard from "../../components/Prescription/PrescriptionCard";
import MedicinalRow from "../../components/Form/MedicinalRow.jsx";

const Home = ({ state, setState, setAutoLogout }) => {
  const [username, setUsername] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("male");
  const [patientPhNumber, setPatientPhNumber] = useState("");
  const [medicineList, setMedicineList] = useState([]);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    getUsername();
    getPrescriptions();
  }, []);

  const getUsername = async () => {
    const res = await fetch("https://emids-server.herokuapp.com/data/username", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + state.token,
      },
    });

    const resData = await res.json();

    if (res.status === 401) {
      console.log(resData.message || "Authorization failed");
      return;
    }

    if (res.status === 422) {
      console.log(resData.message || "Validation failed");
      return;
    }

    if (res.status !== 200 && res.status !== 201) {
      console.log(resData.message || "Fetching username failed.");
      return;
    }

    setUsername(resData.username);
  };

  const getPrescriptions = async () => {
    if (state.userType === "patient") {
      console.log("patient");
      const res = await fetch(
        "https://emids-server.herokuapp.com/data/patient-prescriptions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.token,
          },
        }
      );

      const resData = await res.json();

      if (res.status === 401) {
        console.log(resData.message || "Authorization failed");
        return;
      }

      if (res.status === 422) {
        console.log(resData.message || "Validation failed");
        return;
      }

      if (res.status !== 200 && res.status !== 201) {
        console.log(resData.message || "Fetching prescription failed.");
        return;
      }

      setPrescriptions(resData.prescriptions);
    } else if (state.userType === "doctor") {
      console.log("doctor");
      const res = await fetch(
        "https://emids-server.herokuapp.com/data/doctor-prescriptions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.token,
          },
        }
      );

      const resData = await res.json();

      if (res.status === 401) {
        console.log(resData.message || "Authorization failed");
        return;
      }

      if (res.status === 422) {
        console.log(resData.message || "Validation failed");
        return;
      }

      if (res.status !== 200 && res.status !== 201) {
        console.log(resData.message || "Fetching prescription failed.");
        return;
      }

      console.log(resData.prescriptions);
      setPrescriptions(resData.prescriptions);
    }
  };

  const onClickPrescriptionHandler = async (id) => {

    const res = await fetch(
      "https://emids-server.herokuapp.com/data/prescription/" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.token,
        },
      }
    );

    const resData = await res.json();

    if (res.status === 401) {
      console.log(resData.message || "Authorization failed");
      return;
    }

    if (res.status === 422) {
      console.log(resData.message || "Validation failed");
      return;
    }

    if (res.status !== 200 && res.status !== 201) {
      console.log(resData.message || "Fetching prescription failed.");
      return;
    }

    setPatientName(resData.prescription.name);
    setPatientAge(resData.prescription.age);
    setPatientGender(resData.prescription.gender);
    setPatientPhNumber(resData.prescription.phoneNumber);
    setMedicineList(resData.prescription.medications);
    setRemarks(resData.prescription.remarks);
  };




  // const openModal = () => {
  //   onOpen();
  // };

  const [isOpen,setIsOpen]=useState(false);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClose=()=>setIsOpen(false);
  const handleOpen=()=>setIsOpen(true);

  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  const btnRef = React.useRef(null);
  return (
    <Flex flexWrap={"wrap"}>
      {prescriptions.length !== 0 &&
        prescriptions.map((prescription, index) => {
          return (
            <PrescriptionCard
              name={prescription.name}
              date={prescription.createdAt}
              id={prescription._id}
              onOpen={handleOpen}
              // setScrollBehavior={setScrollBehavior}
              // btnRef={btnRef}
              onClickPrescriptionHandler={onClickPrescriptionHandler}
              key={index}
            />
          );
        })}

      <Modal 
      show={isOpen}
      onHide={handleClose}
        size="xl"
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          {/* <ModalHeader>Prescription</ModalHeader> */}
          <div
            style={{
              padding: "2%",
              margin: "2%",
              borderRadius: "8px",
              backgroundColor: "white",
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
                // value={username}
                value={patientName}
                bgColor="#f5f5f5"
                readOnly
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
                  // value={"9873849229"}
                  value={patientPhNumber}
                  bgColor="#f5f5f5"
                  readOnly
                />
              </FormControl>
              <FormControl mt="5%" mr="5%">
                <FormLabel htmlFor="age" fontWeight={"normal"}>
                  Age
                </FormLabel>
                <Input
                  id="age"
                  placeholder="Age"
                  // value={19}
                  value={patientAge}
                  bgColor="#f5f5f5"
                  readOnly
                />
              </FormControl>
              <FormControl mt="5%" mr="5%">
                <FormLabel htmlFor="gender" fontWeight={"normal"}>
                  Gender
                </FormLabel>
                <Input
                  id="gender"
                  placeholder="gender"
                  // value={"Male"}
                  value={patientGender}
                  bgColor="#f5f5f5"
                  readOnly
                />
              </FormControl>
            </Flex>
            <FormControl mt="5%" mr="5%">
              <FormLabel htmlFor="age" fontWeight={"normal"}>
                Description/Instruction
              </FormLabel>
              <Textarea
                id="age"
                placeholder="Description/Instruction"
                // value={"Take 2 tablets twice a day"}
                value={remarks}
                bgColor="#f5f5f5"
                readOnly
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
                  <MedicinalRow medicineInfo={medicine} key={index} readOnly={true} />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
          </div>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </Flex>
  );
};

export default Home;
