// contexts/AppContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context object
const AppContext = createContext();

// Create a context provider component
export const AppProvider = ({ children }) => {
  // Define your global states
  const [email, setEmail] = useState('');
  const [name,setName] = useState('');
  const [psrn, setPSRN] = useState(-1);
  const [profileimage,setprofileimage] = useState("");
  const backendUrl = 'http://127.0.0.1:5000/psrn';
  const [designation,setDesignation] = useState('');

  return (
    <AppContext.Provider value={{ email, setEmail, psrn, setPSRN,name,setName,designation,setDesignation,profileimage,setprofileimage,backendUrl }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);
