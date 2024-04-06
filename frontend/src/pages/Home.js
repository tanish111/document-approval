import { Box, Button, Heading, VStack, Image } from "@chakra-ui/react";
import React from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate(); 
  return (
    <Box padding="4">
      <Heading as="h1" size="lg" marginBottom="4">Home</Heading>


      {/* Navigation Options */}
      <VStack spacing="4" align="stretch">
        {/* Sections */}
        {/* Professional Allowance */}
        <Box borderWidth="1px" rounded="lg" padding="4" bg="gray.100">
          <Heading as="h2" size="md" marginBottom="2">Professional Allowance</Heading>
          <VStack spacing="2" align="stretch">
            <Button colorScheme="teal" variant="outline" onClick={() => navigate('/paform')}>Apply</Button>
            <Button colorScheme="teal" variant="outline">View Applied</Button>
          </VStack>
        </Box>

        {/* Forwarding Bills for SRCD */}
        <Box borderWidth="1px" rounded="lg" padding="4" bg="gray.100">
          <Heading as="h2" size="md" marginBottom="2">Forwarding Bills for SRCD</Heading>
          <VStack spacing="2" align="stretch">
            <Button colorScheme="teal" variant="outline" onClick={() => navigate('/forwardbilling')} >Apply</Button>
            <Button colorScheme="teal" variant="outline">View Applied</Button>
          </VStack>
        </Box>

        {/* Purchase */}
        <Box borderWidth="1px" rounded="lg" padding="4" bg="gray.100">
          <Heading as="h2" size="md" marginBottom="2">Purchase</Heading>
          <VStack spacing="2" align="stretch">
            <Button colorScheme="teal" variant="outline" onClick={() => navigate('/purchase')}>Apply</Button>
            <Button colorScheme="teal" variant="outline">View Applied</Button>
          </VStack>
        </Box>

      </VStack>
    </Box>
  );
};

export default Home;
