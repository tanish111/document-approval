import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from 'react-router-dom'; 
import { useAppContext } from '../contexts/AppContext';

const Navbar = () => {
  const navigate = useNavigate(); 
  const { email, setEmail, psrn, setPSRN,name,setName,designation,setDesignation,profileimage,setprofileimage } = useAppContext();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem 2rem"
      bg="#000000" // Dark background color
      color="white" // Text color
    >
      {/* Left Side */}
      <Box width="50%">
        <Flex align="center">
          {/* BITS Pilani Logo */}
          <Box onClick={()=>{navigate('/')}} style={{ cursor: 'pointer' }}> {/* Apply cursor: pointer here */}
            <Image src="/bits_logo.png" alt="BITS Pilani Logo" height="50px" />
          </Box>

          {/* Divider */}
          <Box mx="1rem" height="50px" borderRight="2.5px solid white" />

          {/* CSIS Logo */}
          <Box onClick={()=>{navigate('/')}} style={{ cursor: 'pointer' }}> {/* Apply cursor: pointer here */}
            <Image src="/csis_logo.png" alt="CSIS Logo" height="50px" />
          </Box>
        </Flex>
      </Box>

      {/* Right Side */}
      <Box width="50%" display="flex" alignItems="center" justifyContent="flex-end">
        {/* Profile Photo */}
        <Box mr="1rem">
          <Image src={profileimage=="" ? "/faculty_profile.jpg" : profileimage} alt="Profile Photo" borderRadius="50%" boxSize="50px" />
        </Box>
        {/* Faculty Name */}
        <Box display={"flex"} flexDir={"column"}> 
          <Text width={"100%"} fontSize="lg" textAlign={"center"} margin={0} padding={0}>{name}</Text>
          <Text width={"100%"} fontSize="lg" textAlign={"center"} margin={0} padding={0}>{designation}</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Navbar;
