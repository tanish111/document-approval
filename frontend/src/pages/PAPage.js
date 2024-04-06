import React, { useState } from "react";
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

const PAPage = () => {
  const [rows, setRows] = useState([{ slNo: 1, description: "", cashMemoInvoice: "", date: "", travelExpense: "", otherExpense: "" }]);
  const toast = useToast();

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

  return (
    <Box padding="4">
      <Heading as="h1" size="lg" marginBottom="4">
        Professional Allowance Form
      </Heading>

      {/* Static Text Lines */}
      <Text fontWeight="bold">Name of Faculty:- Santonu Sarkar</Text>
      <Text>Designation:- Head of Department</Text>
      <Text>PSRN:- 348035803</Text>
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
