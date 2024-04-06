import React from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PAPage from './pages/PAPage';
import ForwardingBillingPage from './pages/ForwardingBillingPage';
import PurchasePage from './pages/PurchasePage';
import HODApprovalPage from './pages/HODApprovalPage';
import LoginPage from './pages/Login';

function App() {
  return (
    <BrowserRouter>
    <ChakraProvider>
      <Navbar />
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/paform" element={<PAPage/>} />
      <Route exact path="/forwardbilling" element={<ForwardingBillingPage/>} />
      <Route exact path="/purchase" element={<PurchasePage/>} />
      <Route exact path="/hodapproval" element={<HODApprovalPage/>} />
      <Route exact path="/login" element={<LoginPage/>} />

      </Routes>
      </ChakraProvider>
      </BrowserRouter>
  );
}

export default App;