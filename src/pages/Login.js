import { Box, Button, Center, ChakraProvider, Image } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from 'react-router-dom'; 

const LoginPage = () => {
    const navigate = useNavigate(); 

  return (
    <ChakraProvider>
      <Center h="100vh">
        <Box textAlign="center">

          {/* Google login button */}
          <Button
            colorScheme="blue"
            leftIcon={<Image src={'./google-logo.png'} alt="Google Logo" height={"2rem"}/>}
            onClick={()=>{navigate('/')}}
          >
            Sign in with Google
          </Button>
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default LoginPage;
