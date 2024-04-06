import React, { useState } from "react";
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

const HODApprovalPage = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const nfaApplications = [
    { srNo: 1, psrn: "348035803", facultyName: "Ramesh Kumar", amount: 5000 },
    { srNo: 2, psrn: "348035804", facultyName: "Sunita Sharma", amount: 7000 },
    { srNo: 3, psrn: "348035805", facultyName: "Amit Patel", amount: 6000 },
    { srNo: 4, psrn: "348035806", facultyName: "Priya Singh", amount: 8000 },
    { srNo: 5, psrn: "348035807", facultyName: "Deepak Gupta", amount: 5500 },
    { srNo: 6, psrn: "348035808", facultyName: "Anita Verma", amount: 7500 },
    { srNo: 7, psrn: "348035809", facultyName: "Rajesh Tiwari", amount: 6500 },
    { srNo: 8, psrn: "348035810", facultyName: "Neha Sharma", amount: 8500 },
  ];

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

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
  };

  const handleCloseModal = () => {
    setSelectedApplication(null);
  };

  return (
    <Box padding="4">
      <Heading as="h1" size="lg" marginBottom="4">
        HOD Approval
      </Heading>

      <Table variant="simple" marginBottom="4">
        <Tbody>
          <Tr>
            <Td>Sr. No.</Td>
            <Td>PSRN</Td>
            <Td>Faculty Name</Td>
            <Td>Amount</Td>
            <Td>Actions</Td>
          </Tr>
          {nfaApplications.map((application) => (
            <Tr key={application.srNo}>
              <Td>{application.srNo}</Td>
              <Td>{application.psrn}</Td>
              <Td>{application.facultyName}</Td>
              <Td>{application.amount}</Td>
              <Td>
                <Button
                  colorScheme="teal"
                  size="sm"
                  marginRight="2"
                  onClick={() => handleViewDetails(application)}
                >
                  View
                </Button>
                <Button colorScheme="green" size="sm"
                                  marginRight="2"
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
                    <Td>PSRN:</Td>
                    <Td>{selectedApplication.psrn}</Td>
                  </Tr>
                  <Tr>
                    <Td>Description</Td>
                    <Td>Cash Memo/Invoice No</Td>
                    <Td>Date</Td>
                    <Td>Total Travel Expense</Td>
                    <Td>Total Other Expense</Td>
                  </Tr>
                  {conferencesData.map((conference, index) => (
                    <Tr key={index}>
                      <Td>{conference.description}</Td>
                      <Td>{conference.cashMemo}</Td>
                      <Td>{conference.date}</Td>
                      <Td>{conference.totalTravelExpense}</Td>
                      <Td>{conference.totalOtherExpense}</Td>
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
