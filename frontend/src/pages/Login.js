/*App.js*/
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom"
import { useAppContext } from '../contexts/AppContext';
import { Button, Box } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

import axios from 'axios';

function App() {
    const { email, setEmail, psrn, setPSRN,name,setName,designation,setDesignation,profileimage,setprofileimage,backendUrl } = useAppContext();
    const fetchDataDetails = async (userPSRN) => {
      try {
        await axios.post('http://127.0.0.1:5000/name_designation', { userPSRN }).then((res)=>{
          setName(res.data[0][0]);
          setDesignation(res.data[0][1]);
        }).catch((err)=>{
          console.log(err.message);
        });
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDataPSRN = async () => {
      try {
        const userEmail = "ashwin.srinivasan@goa.bits-pilani.ac.in";
        await axios.post('http://127.0.0.1:5000/psrn', { userEmail }).then((res)=>{
          setPSRN(res.data);
          fetchDataDetails(res.data);
        }).catch((err)=>{
          console.log(err.message);
        });
      } catch (error) {
        console.log(error);
      }
    };
    const navigate = useNavigate();
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
          axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
              headers: {
                  Authorization: `Bearer ${codeResponse.access_token}`,
                  Accept: 'application/json'
              }
          })
          .then((res) => {
              setEmail(res.data.email);
              setprofileimage(res.data.picture);
              fetchDataPSRN();
              navigate('/home');
          })
          .catch((err) => console.log(err));
                  },
        onError: (error) => console.log('Login Failed:', error)
    });

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setEmail(null);
    };
        return (
          <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Button
            leftIcon={<FaGoogle />}
            colorScheme="red"
            onClick={login}
          >
            Sign in with Google
          </Button>
        </Box>
    );
}
export default App;