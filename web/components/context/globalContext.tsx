'use client'

import { useWallet } from "@solana/wallet-adapter-react";
import React, { createContext, useContext, useEffect, useState } from "react"; // React utilities for context and hooks
import { useAccount } from "wagmi";

// Create a new context for account-related data
const GlobalContext = createContext({});
const { Provider, Consumer } = GlobalContext;

// API Key for Helius (default or from environment variable)

// GlobalProvider component to wrap the application with account management logic
const GlobalProvider = ({ children, ...props }: {children: React.ReactNode}) => {

    const { publicKey } = useWallet();
    const {address}=useAccount();
    const [walletAddress,setWalletAddress]:any=useState(null)
    const [accountType,setAccountType]:any=useState(null)
    
    useEffect(()=>{
      console.log(address)
        if(publicKey){
            setWalletAddress(publicKey?.toString())
            setAccountType('Solana')
        }else if(address){
            setWalletAddress(address);
            setAccountType('EVM')
        }
    },[publicKey,address])
 
  // Return the provider that supplies account-related data to the app
  return (
    <Provider value={{walletAddress,accountType}} {...props}>
      {children}
    </Provider>
  );
};

// Hook to use account context in child components
const useGlobalContext = () => {
  const state = useContext(GlobalContext);
  if (state === undefined) {
    throw new Error(
      "useGlobalContext must be called within GlobalProvider"
    );
  }

  return {
    ...state,
  };
};

export {
  GlobalProvider, // Export the provider component
  Consumer as GlobalConsumer, // Export the consumer for more granular control
  useGlobalContext, // Export the custom hook for using the context
};

export default GlobalContext;
