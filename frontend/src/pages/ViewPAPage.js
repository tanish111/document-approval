import React, { useState,useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { useAppContext } from '../contexts/AppContext';
import axios from 'axios';

const HODApprovalPage = () => {
  const { email, setEmail, psrn, setPSRN,name,setName,designation,setDesignation,profileimage,setprofileimage } = useAppContext();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [paDetails,setPaDetails] = useState([]);
  const [paItemDetails,setPaItemDetails] = useState([]);
  const fetchDataPA = async (userPSRN) => {
    try {
      await axios.post('http://127.0.0.1:5000/pa_details', { userPSRN }).then((res)=>{
        const paDetailsUnbrach = res.data.map(item => ({
          PaNum: item[1],
          SubmissionStatus: "Submitted",
          ApprovalStatus: item[3] === 0 ? "Under Review" : "Approved"
      }));
      setPaDetails(paDetailsUnbrach);
      }).catch((err)=>{
        console.log(err.message);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetails = async (userPSRN,userPANUM) => {
    setSelectedApplication(userPANUM);
    try {
      await axios.post('http://127.0.0.1:5000/nfadet', { userPSRN,userPANUM }).then((res)=>{

        const setPaItemDetailsUnb = res.data.map(item => ({
          ItemID: item[0],
          ItemDesc: item[1],
          InvoiceNum: item[2],
          ConferenceAmt: item[4],
          OtherAmt:item[5]

      }));
      setPaItemDetails(setPaItemDetailsUnb);
      }).catch((err)=>{
        console.log(err.message);
      });
    } catch (error) {
      console.log(error);
    }

  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
  };
  useEffect(() => {
    console.log(psrn)
    fetchDataPA(psrn);
  }, []);
  return (
    <Box padding="4">
      <Heading as="h1" size="lg" marginBottom="4">
            Your Professional Allowance
      </Heading>

      <Table variant="simple" marginBottom="4">
        <Tbody>
          <Tr>
            <Td>PA. No.</Td>
            <Td>Submission Status</Td>
            <Td>Approval Status</Td>
            <Td>Actions</Td>
          </Tr>
          {paDetails.map((application) => (
            <Tr key={application.PaNum}>
              <Td>{application.PaNum}</Td>
              <Td>{application.SubmissionStatus}</Td>
              <Td>{application.ApprovalStatus}</Td>
              <Td>
                <Button
                  colorScheme="teal"
                  size="sm"
                  marginRight="2"
                  onClick={async () => {
                    handleViewDetails(psrn,application.PaNum)
                    console.log(application.PaNum)
                  }}
                >
                  View
                </Button>
                <Button colorScheme="red" size="sm"
                                  marginRight="2"
                                  isDisabled = {application.ApprovalStatus=="Approved"}
                >
                  Withdraw
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={!!selectedApplication} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent maxW="90vw" maxH="90vh">
          <ModalHeader>
            {selectedApplication && selectedApplication.facultyName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedApplication && (
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>PSRN:{psrn}</Td>
                    <Td>PaNum:{selectedApplication}</Td>
                  </Tr>
                  <Tr>
                    <Td>ItemID</Td>
                    <Td>ItemDesc</Td>
                    <Td>InvoiceNum</Td>
                    <Td>ConferenceAmt</Td>
                    <Td>OtherAmt</Td>
                  </Tr>
                  {paItemDetails.map((conference, index) => (
                    <Tr key={index}>
                      <Td>{conference.ItemID}</Td>
                      <Td>{conference.ItemDesc}</Td>
                      <Td>{conference.InvoiceNum}</Td>
                      <Td>{conference.ConferenceAmt}</Td>
                      <Td>{conference.OtherAmt}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HODApprovalPage;
