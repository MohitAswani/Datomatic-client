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

import { useState } from "react";

const MedicinalRow = ({medicineInfo, readOnly}) => {

    const [RxNORMcode, setRxNormCode] = useState(medicineInfo.RxNORMcode);
    const [medicationName, setMedicationName] = useState(medicineInfo.medicationName);
    const [dosage, setDosage] = useState(medicineInfo.dosage);
    const [frequency, setFrequency] = useState(medicineInfo.frequency);
    const [route, setRoute] = useState(medicineInfo.route);

  return (
    <>
      <Tr>
        <Td>
          <FormControl mr="5%">
            <Input 
            id="RxNORMcode" 
            placeholder="RxNormCode" 
            value={RxNORMcode} 
            size='sm' 
            onChange={(e)=>{setRxNormCode(e.target.value)}} 
            bgColor="#f5f5f5"
            readOnly={readOnly}
            />
          </FormControl>
        </Td>
        <Td>
          <FormControl mr="5%">
            <Input
              id="medicationName"
              placeholder="medicationName"
              value={medicationName}
              size='sm' 
              onChange={(e)=>{setMedicationName(e.target.value)}}
              bgColor="#f5f5f5"
              readOnly={readOnly}
            />
          </FormControl>
        </Td>
        <Td>
          <FormControl mr="5%">
            <Input id="dosage" placeholder="dosage" value={dosage} size='sm' onChange={(e)=>{setDosage(e.target.value)}} bgColor="#f5f5f5" readOnly={readOnly} />
          </FormControl>
        </Td>
        <Td>
          <FormControl mr="5%">
            <Input id="route" placeholder="route" size='sm' value={route} onChange={(e)=>{setRoute(e.target.value)}} bgColor="#f5f5f5" readOnly={readOnly} />
          </FormControl>
        </Td>
        <Td>
          <FormControl mr="5%">
            <Input id="frequency" placeholder="frequency" size='sm' value={frequency} onChange={(e)=>{setFrequency(e.target.value)}} bgColor="#f5f5f5" readOnly={readOnly} />
          </FormControl>
        </Td>
      </Tr>
    </>
  );
};

export default MedicinalRow;
