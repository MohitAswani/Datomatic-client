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
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import React from "react";


const PrescriptionCard = ({ name, date, onOpen, id, onClickPrescriptionHandler }) => {
    
    return (
        <Flex
        // ref={btnRef}
        bgColor={"#cdf6f6"}
        width="500px"
        height="225px"
        p="4"
        boxShadow="lg"
        m="4"
        justifyContent={"space-between"}
        flexDirection={"column"}
        borderWidth="1px"
        borderRadius="lg"
        cursor={"pointer"}
        bg={useColorModeValue("white", "gray.900")}
        onClick={() => {
          onClickPrescriptionHandler(id).then(()=>onOpen());
        }}
      >
        <Flex alignItems={"flex-start"} width="full">
          <Heading fontWeight={"light"} fontSize={"40px"}>
            {name}
          </Heading>
        </Flex>
        <Flex alignContent={"flex-end"} width="full" bottom={"0px"}>
          <div style={{ display: "flex", flexGrow: "2" }}></div>
          <Text fontWeight={"light"} fontSize={"20px"}>
            {date}
          </Text>
        </Flex>
      </Flex>
    );
    };
export default PrescriptionCard;


