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
  Flex,
  Checkbox
} from "@chakra-ui/react";

const PurchasePage = () => {
    const [fields, setFields] = useState({ nfaNo: "", date: "", userName: "" });
    const [rows, setRows] = useState([{ srNo: 1, itemDetails: "", qty: "", unitPrice: "" }]);    const [justification, setJustification] = useState("");
    const [userSignature, setUserSignature] = useState(false);
    const toast = useToast();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic
      console.log({ ...fields, justification, userSignature });
      toast({
        title: "Form Submitted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    };

  const handleInputChange = (field, value) => {
    setFields({ ...fields, [field]: value });
  };

  const handleAddRow = () => {
    const newRow = { srNo: rows.length + 1, item: "", qty: 0, unitPrice: 0 };
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

  const calculateTotalCost = (qty, unitPrice) => {
    return qty * unitPrice;
  };

  const calculateSubTotal = () => {
    return rows.reduce((acc, curr) => acc + calculateTotalCost(curr.qty, curr.unitPrice), 0);
  };

  const calculateGrandTotal = () => {
    const subTotal = calculateSubTotal();
    const gst = (subTotal * 18) / 100;
    return subTotal + gst;
  };

  return (
    <Box padding="4">
      <Heading as="h1" size="lg" marginBottom="4">
        Purchase
      </Heading>

      <Table variant="simple" marginBottom="4">
        <Tbody>
          <Tr>
            <Td width={"10%"}>NFA No.:</Td>
            <Td width={"80%"}>
              <Input
                type="text"
                value={fields.nfaNo}
                onChange={(e) => handleInputChange("nfaNo", e.target.value)}
              />
            </Td>
          </Tr>
          <Tr>
            <Td width={"10%"}>Date:</Td>
            <Td width={"80%"}>
              <Input
                type="date"
                value={fields.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
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
        </Tbody>
      </Table>

      <Text fontSize="lg" fontWeight="bold" marginBottom="4">
        Details of Equipments
      </Text>

      <Table variant="simple" marginBottom="4">
        <Tbody>
          <Tr>
            <Td>SR. No.</Td>
            <Td>Details of Items</Td>
            <Td>Qty. Reqd</Td>
            <Td>Unit Price</Td>
            <Td>Total Cost</Td>
            <Td></Td>
          </Tr>
          {rows.map((row, index) => (
            <Tr key={index}>
              <Td>{row.srNo}</Td>
              <Td>
                <Input
                  type="text"
                  value={row.item}
                  onChange={(e) => handleRowChange(index, "item", e.target.value)}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={row.qty}
                  onChange={(e) => handleRowChange(index, "qty", parseInt(e.target.value))}
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={row.unitPrice}
                  onChange={(e) => handleRowChange(index, "unitPrice", parseFloat(e.target.value))}
                />
              </Td>
              <Td>{calculateTotalCost(row.qty, row.unitPrice)}</Td>
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
            <Td>Sub. Total</Td>
            <Td>{calculateSubTotal()}</Td>
          </Tr>
          <Tr>
            <Td>Add. GST @ 18%</Td>
            <Td>{((calculateSubTotal() * 18) / 100).toFixed(2)}</Td>
          </Tr>
          <Tr>
            <Td>Grand Total</Td>
            <Td>{calculateGrandTotal().toFixed(2)}</Td>
          </Tr>
        </Tbody>
      </Table>

      <Text fontSize="lg" fontWeight="bold" marginBottom="4">
        Justification:
      </Text>
      <Input
        type="text"
        value={justification}
        onChange={(e) => setJustification(e.target.value)}
        marginBottom="4"
      />
      <Flex flexDir={"row"} justifyContent={"space-around"}>
      <Flex alignItems="center" marginBottom="4">
        <Checkbox
          iconColor="green.500"
          isChecked={userSignature}
          onChange={(e) => setUserSignature(e.target.checked)}
          marginRight="2"
        />
        <Text>User Signature</Text>
      </Flex>

      <Flex alignItems="center" marginBottom="4">
        <Checkbox
          iconColor="green.500"
          isChecked={false}
          isDisabled
          marginRight="2"
        />
        <Text>HOD Signature (Auto-Approval)</Text>
      </Flex>
      </Flex>
      <Table variant="simple" marginBottom="4">
        <Tbody>
          <Tr>
            <Td>Budget Head</Td>
            <Td>Budget Code</Td>
            <Td>Sanctioned Amount</Td>
            <Td>Amount Spend So Far</Td>
            <Td>Requisition Amount</Td>
          </Tr>
          <Tr>
            <Td>Education</Td>
            <Td>EDU001</Td>
            <Td>100000</Td>
            <Td>50000</Td>
            <Td>20000</Td>
          </Tr>
        </Tbody>
      </Table>
      <Flex flexDir={"row"} justifyContent={"space-around"}>
      <Flex alignItems="center" marginBottom="4">
  <Checkbox
    iconColor="green.500"
    isChecked={false}
    isDisabled
    marginRight="2"
  />
  <Text>Purchase Manager (Auto-Approval)</Text>
</Flex>
<Flex alignItems="center" marginBottom="4">
  <Checkbox
    iconColor="green.500"
    isChecked={false}
    isDisabled
    marginRight="2"
  />
  <Text>Head, Accounts and Finance (Auto-Approval)</Text>
</Flex>
</Flex>
<Flex marginBottom="4" justifyContent={"center"} width={"100%"}>
  <Checkbox
    iconColor="green.500"
    isChecked={false}
    isDisabled
    marginRight="2"
  />
  <Text>Dean, Administration (Auto-Approval)</Text>
</Flex>
      <Button colorScheme="teal" onClick={handleSubmit} marginBottom="4">
        Submit
      </Button>
    </Box>
  );
};

export default PurchasePage;
