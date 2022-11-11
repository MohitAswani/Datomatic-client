import React, { useState } from 'react';
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
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import PrescriptionInput from '../../components/Form/PrescriptionInput';
import PrescriptionOutput from '../../components/Form/PrescriptionOutput';


const CreatePrescription2 = () => {
    return (
        <Container maxW='container.xl'>
            <Flex h='100vh' py={20}>
                <PrescriptionInput />
                <PrescriptionOutput />
            </Flex>
        </Container>

    );
}

export default CreatePrescription2;