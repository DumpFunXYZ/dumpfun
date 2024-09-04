'use client'
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext({});
const { Provider, Consumer } = TransactionContext;

const TransactionProvider = ({ children, ...props }: {children: React.ReactNode}) => {
    const [animationDone,setAnimationDone]=useState(false)
    const [animationStarted,setAnimationStarted]=useState(false)
    const [success,setSuccess]=useState(false)
    const numberEntered=()=>{
        setAnimationStarted(true);
    }
    const onDumpClicked=()=>{
        setAnimationDone(false);
        setAnimationStarted(false);
        setTimeout(()=>{
          setSuccess(true)
        },500)
    }





    useEffect(()=>{
        if(animationStarted){
            setTimeout(()=>{
                setAnimationDone(true)
            },3800)
        }
    },[animationStarted])

  return (
    <Provider value={{ numberEntered,animationDone,onDumpClicked,animationStarted,success,setSuccess }} {...props}>
      {children}
    </Provider>
  );
};

const useTransactionContext = () => {
  const state = useContext(TransactionContext);
  if (state === undefined) {
    throw new Error(
      "useTransactionContext must be called within TransactionProvider"
    );
  }

  return {
    ...state,
  };
};

export {
  TransactionProvider,
  Consumer as TransactionConsumer,
  useTransactionContext,
};

export default TransactionContext;