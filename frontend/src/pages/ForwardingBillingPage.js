import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useToast,
} from "@chakra-ui/react";

const ForwardingBillingPage = () => {
  const [fields, setFields] = useState({ project: "", agency: "", name: "", remarks: "" });
  const [rows, setRows] = useState([{ slNo: 1, partyName: "", poNo: "", billNo: "", billAmount: "", advancePayment: "" }]);
  const [budgetData] = useState([{ budgetHead: "Head 1", budgetAmount: 10000, billAmount: 5000, balance: 5000 }]); // Sample data
  const toast = useToast();

  const handleInputChange = (field, value) => {
    setFields({ ...fields, [field]: value });
  };

  const handleAddRow = () => {
    const newRow = { slNo: rows.length + 1, partyName: "", poNo: "", billNo: "", billAmount: "", advancePayment: "" };
    setRows([...rows, newRow]);
  };

  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
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
    console.log({ ...fields, rows });
    toast({
      title: "Form Submitted",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box padding="4">
      <Heading as="h1" size="lg" marginBottom="4">
        Forwarding Billing
      </Heading>

      <Table variant="simple" marginBottom="4">
        <Tbody>
          <Tr>
            <Td width={"10%"}>Project:</Td>
            <Td width={"80%"}>
              <Input
                type="text"
                value={fields.project}
                onChange={(e) => handleInputChange("project", e.target.value)}
              />
            </Td>
          </Tr>
          <Tr>
            <Td width={"10%"}>Agency:</Td>
            <Td width={"80%"}>
              <Input
                type="text"
                value={fields.agency}
                onChange={(e) => handleInputChange("agency", e.target.value)}
              />
            </Td>
          </Tr>
          <Tr>
            <Td width={"10%"}>Name:</Td>
            <Td width={"80%"}>
              <Input
                type="text"
                value={fields.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </Td>
          </Tr>
          <Tr>
            <Td width={"10%"}>Remarks:</Td>
            <Td width={"80%"}>
              <Input
                type="text"
                value={fields.remarks}
                onChange={(e) => handleInputChange("remarks", e.target.value)}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>

      <Table variant="simple" marginBottom="4">
        <Tbody>
          <Tr>
            <Td>Sl.No.</Td>
            <Td>Name of Party</Td>
            <Td>P.O No.</Td>
            <Td>Bill No.</Td>
            <Td>Bill Amount</Td>
            <Td>Advance Payments</Td>
            <Td></Td>
          </Tr>
          {rows.map((row, index) => (
            <Tr key={index} bg="teal.50">
              <Td>{row.slNo}</Td>
              <Td>
                <Input
                  type="text"
                  value={row.partyName}
                  onChange={(e) => handleRowChange(index, "partyName", e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="text"
                  value={row.poNo}
                  onChange={(e) => handleRowChange(index, "poNo", e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="text"
                  value={row.billNo}
                  onChange={(e) => handleRowChange(index, "billNo", e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={row.billAmount}
                  onChange={(e) => handleRowChange(index, "billAmount", e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={row.advancePayment}
                  onChange={(e) => handleRowChange(index, "advancePayment", e.target.value)}
                />
              </Td>
              <Td>
                <Button colorScheme="red" onClick={() => handleDeleteRow(index)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Button colorScheme="teal" onClick={handleAddRow} marginBottom="4">+ Add Row</Button>
      <Table variant="simple" marginBottom="4">
        <Tbody>
          <Tr>
            <Td>Budget Head</Td>
            <Td>Budget Amount</Td>
            <Td>Bill Amount</Td>
            <Td>Balance</Td>
          </Tr>
          {budgetData.map((item, index) => (
            <Tr key={index}>
              <Td>{item.budgetHead}</Td>
              <Td>{item.budgetAmount}</Td>
              <Td>{item.billAmount}</Td>
              <Td>{item.balance}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <form onSubmit={handleSubmit}>
        <Button colorScheme="teal" type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default ForwardingBillingPage;
