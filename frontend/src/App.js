import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PAPage from './pages/PAPage';
import ForwardingBillingPage from './pages/ForwardingBillingPage';
import PurchasePage from './pages/PurchasePage';
import HODApprovalPage from './pages/HODApprovalPage';
import LoginPage from './pages/Login';
import ViewPAPage from './pages/ViewPAPage'
import { AppProvider } from './contexts/AppContext';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
      <AppProvider>
        <Routes>
          <Route
            path="/*"
            element={<AppLayout />}
          />
        </Routes>
        </AppProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
}

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <React.Fragment>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/paform" element={<PAPage />} />
        <Route exact path="/forwardbilling" element={<ForwardingBillingPage />} />
        <Route exact path="/purchase" element={<PurchasePage />} />
        <Route exact path="/hodapproval" element={<HODApprovalPage />} />
        <Route exact path="/viewpaform" element={<ViewPAPage />} />
        <Route exact path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
