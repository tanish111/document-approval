import React, { useState,useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useAppContext } from '../contexts/AppContext';
import axios from 'axios';
function generateRandomThreeDigitNumber() {
  // Math.random() generates a random floating-point number between 0 (inclusive) and 1 (exclusive)
  // We multiply it by 900 to get a number between 0 and 899
  // Then, we add 100 to ensure the number is at least 100 and at most 999
  return Math.floor(Math.random() * 900) + 100;
}

const PAPage = () => {
  const { email, setEmail, psrn, setPSRN,name,setName,designation,setDesignation,profileimage,setprofileimage } = useAppContext();
  const [rows, setRows] = useState([{ slNo: 1, description: "", cashMemoInvoice: "", date: "", travelExpense: "", otherExpense: "" }]);
  const [PANumS,setPaNumS] = useState(0);
  const toast = useToast();

  const createDataPA = async (userPSRN,PANum,Save_status,Submit_status,ApprovalStatus) => {
    try {
      await axios.post('http://127.0.0.1:5000/ins_det_nfa', { userPSRN,PANum,Save_status,Submit_status,ApprovalStatus}).then((res)=>{
        setPaNumS(PANum);
      }).catch((err)=>{
        console.log(err.message);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const insertDataPA = async (userPSRN,PANum,ItemID,ItemDesc,InvoiceNum,Date1,ConferenceAmt,OtherAmt) => {
    try {
      await axios.post('http://127.0.0.1:5000/ins_det', { userPSRN,ItemID,ItemDesc,InvoiceNum,Date1,ConferenceAmt,OtherAmt,PANum}).then((res)=>{
        console.log("Added Successfully")
      }).catch((err)=>{
        console.log(err.message);
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmitBtn = async () => {
    const panum = generateRandomThreeDigitNumber();
    await createDataPA(psrn,panum,1,1,0);
    rows.map(async (row, index) =>{
      await insertDataPA(psrn,panum,row.slNo,row.description,row.cashMemoInvoice,row.date,row.travelExpense,row.otherExpense);
    })

  }
  const handleAddRow = () => {
    const newRow = { slNo: rows.length + 1, description: "", cashMemoInvoice: "", date: "", travelExpense: "", otherExpense: "" };
    setRows([...rows, newRow]);
  };

  const handleInputChange = (index, fieldName, value) => {
    const newRows = [...rows];
    newRows[index][fieldName] = value;
    setRows(newRows);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log(rows);
    handleSubmitBtn();
    toast({
      title: "Form Submitted",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Function to calculate the total of travel expenses
  const calculateTotalTravelExpenses = () => {
    return rows.reduce((acc, row) => acc + parseFloat(row.travelExpense || 0), 0);
  };

  // Function to calculate the total of other expenses
  const calculateTotalOtherExpenses = () => {
    return rows.reduce((acc, row) => acc + parseFloat(row.otherExpense || 0), 0);
  };
insertDataPA(548791,20,2,"Hello",123232,"2/2/23",1222,1332);
  return (
    <Box padding="4">
      <Heading as="h1" size="lg" marginBottom="4">
        Professional Allowance Form
      </Heading>

      {/* Static Text Lines */}
      <Text fontWeight="bold">Name of Faculty:- {name}</Text>
      <Text>Designation:- {designation}</Text>
      <Text>PSRN:- {psrn}</Text>
      <Text>Entitlement Limit:- 1,00,000 INR</Text>

      <Table variant="simple" marginBottom="4">
        <Tbody>
          <Tr>
            <Td>Sl.No.</Td>
            <Td>Description of Item</Td>
            <Td>Cash/Memo/Invoice No</Td>
            <Td>Date</Td>
            <Td>Travel Expenses (Rs)</Td>
            <Td>Other Expenses (Rs)</Td>
            <Td></Td>
          </Tr>
          {rows.map((row, index) => (
            <Tr key={index} bg="teal.50"> {/* Add background color here */}
              <Td>{row.slNo}</Td>
              <Td>
                <Input
                  type="text"
                  value={row.description}
                  onChange={(e) => handleInputChange(index, "description", e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="text"
                  value={row.cashMemoInvoice}
                  onChange={(e) => handleInputChange(index, "cashMemoInvoice", e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="date"
                  value={row.date}
                  onChange={(e) => handleInputChange(index, "date", e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={row.travelExpense}
                  onChange={(e) => handleInputChange(index, "travelExpense", e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={row.otherExpense}
                  onChange={(e) => handleInputChange(index, "otherExpense", e.target.value)}
                />
              </Td>
              <Td>
                <Button colorScheme="red" onClick={() => handleDeleteRow(index)}>Delete</Button>
              </Td>
            </Tr>
          ))}
          {/* Total Rows */}
          <Tr>
            <Td colSpan="4" textAlign="right">Total:</Td>
            <Td>{calculateTotalTravelExpenses()}</Td>
            <Td>{calculateTotalOtherExpenses()}</Td>
            <Td></Td>
          </Tr>
        </Tbody>
      </Table>

      <Button colorScheme="teal" onClick={handleAddRow} marginBottom="4">+ Add Row</Button>

      <form onSubmit={handleSubmit}>
        <Button colorScheme="teal" type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default PAPage;
