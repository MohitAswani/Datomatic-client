import React, { useRef, useState } from "react"
import { Button, ButtonGroup, Flex, FormControl, Heading, Text, VStack } from "@chakra-ui/react"
import { ReactSketchCanvas } from 'react-sketch-canvas';



const Form1 = () => {
    // const canvas = useRef(null);

    // const styles = {
    //     border: '0.0625rem solid #9c9c9c',
    //     borderRadius: '0.25rem',
    // };
    return (
        <FormControl>
            <VStack spacing={0} alignItems='flex-start'>
                <Heading size='md'>Patient's Name</Heading>
                <Text >Write patient's name in Textarea below</Text>
            </VStack>
            {/* <VStack spacing={0} w='500px' h='100px' alignItems='flex-start'>

                <ReactSketchCanvas
                    ref={canvas}
                    style={styles}
                    width="100%"
                    height="100%"
                    strokeWidth={4}
                    strokeColor="black"
                />
            </VStack> */}
        </FormControl>
    );

}

const Form2 = () => {
    // const canvas = useRef(null);

    // const styles = {
    //     border: '0.0625rem solid #9c9c9c',
    //     borderRadius: '0.25rem',
    // };


    return (
        <FormControl>
            <VStack spacing={0} alignItems='flex-start'>
                <Heading size='md'>Phone Number</Heading>
                <Text >Write patient's phone number in Textarea below</Text>
            </VStack>

        </FormControl>
    );

}






const PrescriptionInput = () => {


    const canvas = useRef(null);
    const [step, setStep] = useState(1);

    const exportImage = async () => {
        const dataURL = await canvas.current.exportImage('png')
            .then(data => {
                console.log(data);
                canvas.current.clearCanvas();
            })
            .catch(err => console.log(err.message))
    };
    const styles = {
        border: '0.0625rem solid #9c9c9c',
        borderRadius: '0.25rem',
    };

    return (
        <>
            <VStack spacing={10} w='full' h='full' p={10} alignItems='flex-start'>

                {step === 1 ? <Form1 /> : <Form2 />}
                <VStack spacing={0} w='500px' h='100px' alignItems='flex-start'>

                    <ReactSketchCanvas
                        ref={canvas}
                        style={styles}
                        width="100%"
                        height="100%"
                        strokeWidth={4}
                        strokeColor="black"
                    />
                    {/* <button onClick={exportImage}>Get Image</button> */}
                </VStack>
                <ButtonGroup mt="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1);
                                }}
                                isDisabled={step === 1}
                                colorScheme="teal"
                                variant="solid"
                                w="7rem"
                                mr="5%">
                                Back
                            </Button>
                            <Button
                                onClick={() => {
                                    exportImage();
                                    setStep(step + 1);
                                }}
                                w="7rem"
                                colorScheme="teal"
                                variant="outline">
                                Next
                            </Button>
                        </Flex>

                    </Flex>
                </ButtonGroup>
            </VStack>
        </>
    );
}

export default PrescriptionInput;