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
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { email, setEmail, psrn, setPSRN,name,setName,designation,setDesignation,profileimage,setprofileimage } = useAppContext();
  const [paDetails,setPaDetails] = useState([]);
  const [paItemDetails,setPaItemDetails] = useState([]);
  const ApprovProj = async (userPSRN,userPANUM) => {
    try {
      await axios.post('http://127.0.0.1:5000/approveQuery', { userPSRN,userPANUM }).then((res)=>{
        paDetails.splice(paDetails.findIndex(e => (e.PSRN_n === userPSRN) && (e.PaNum=userPANUM) ),1);
        fetchDataPA(psrn);
      }).catch((err)=>{
        console.log(err.message);
      });
    } catch (error) {
      console.log(error);
    }
  }
  const fetchDataPA = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/get_rej', { }).then((res)=>{
        const paDetailsUnbrach = res.data.map(item => ({
          PaNum: item[0],
          FacultyName: item[2],
          Amount: item[1],
          PSRN_n:item[3]
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
  const conferencesData = [
    {
      description: "Conference A",
      cashMemo: "CM123",
      date: "2022-10-15",
      totalTravelExpense: 500,
      totalOtherExpense: 100,
    },
    {
      description: "Conference B",
      cashMemo: "CM456",
      date: "2022-11-20",
      totalTravelExpense: 600,
      totalOtherExpense: 150,
    },
  ];
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
        HOD Approval
      </Heading>
      <Heading as="h2" size="md" marginBottom="4">
        Personal Allowance Requests
      </Heading>
      <Table variant="simple" marginBottom="4">
        <Tbody>
          <Tr>
            <Td>Sr. No.</Td>
            <Td>PSRN</Td>
            <Td>PaNum</Td>
            <Td>Faculty Name</Td>
            <Td>Amount</Td>
            <Td>Actions</Td>
          </Tr>
          {paDetails.map((application,index) => (
            <Tr key={application.srNo}>
              <Td>{index}</Td>
              <Td>{application.PSRN_n}</Td>
              <Td>{application.PaNum}</Td>
              <Td>{application.FacultyName}</Td>
              <Td>{application.Amount}</Td>
              <Td>
                <Button
                  colorScheme="teal"
                  size="sm"
                  marginRight="2"
                  onClick={() => handleViewDetails(application.PSRN_n,application.PaNum)}
                >
                  View
                </Button>
                <Button colorScheme="green" size="sm"
                                  marginRight="2"
                                  onClick={async () => {
                                    await ApprovProj(application.PSRN_n,application.PaNum)
                                  }}
                >
                  Approve
                </Button>
                <Button colorScheme="red" size="sm"
                                  marginRight="2"
                >
                  Reject
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
