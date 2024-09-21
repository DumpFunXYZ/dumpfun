'use client'
import { addUserTransaction } from '@/utils/authUtils';
//@ts-nocheck

import { TOKEN_PROGRAM_ID, burn, getOrCreateAssociatedTokenAccount, getAssociatedTokenAddress, createBurnInstruction } from '@solana/spl-token';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { useGetBalance } from '../account/account-data-access';
import { useAccountContext } from './accountContext';

const TransactionContext = createContext({});
const { Provider, Consumer } = TransactionContext;

const TransactionProvider = ({ children, ...props }: {children: React.ReactNode}) => {
    const [animationDone,setAnimationDone]=useState(false)
    const [tokenBalance,setTokenBalance]=useState(0)
    const [loading,setLoading]=useState(false)
    const [animationStarted,setAnimationStarted]=useState(false)
    const {selectedCoin,selectedTokenStats,amount,restoreData}:any=useAccountContext()
    const { connection } = useConnection(); // Get the current connection to the cluster
    const { publicKey, sendTransaction,wallet }:any = useWallet(); // Get the connected wallet
    //const query = useGetBalance({ address:publicKey });
  //console.log(selectedTokenStats)
  //let audio = new Audio("https://firebasestorage.googleapis.com/v0/b/enclave-74f51.appspot.com/o/product%2Fflush.mp3?alt=media&token=75b2eed4-97de-47b8-a8ed-833395709be7")

  

  

  //console.log('Balance',query?.data)
    
    const [success,setSuccess]=useState(false)
    const numberEntered=()=>{
      if(amount<selectedCoin?.formatted){
        setAnimationStarted(true);
      }else{
        setAnimationDone(false)
        toast('Insufficient Amount Entered')
      }
        
    }
    const onDumpClicked=(successFunction:any)=>{
        setAnimationDone(false);
        setAnimationStarted(false);
        
        burnToken(selectedCoin?.id,amount*10**selectedCoin?.decimals,successFunction)
    }

    //const BurnTokens = () => {
    
    
      const burnToken = async (
        mintAddress: PublicKey,
        amount: number,
        successFunction:any,
      ) => {
        if (!publicKey) {
          console.error('Wallet not connected');
          return;
        }
        const tokenMint = new PublicKey(mintAddress);
        try {
          // Get the token account
          const tokenAccount = await getAssociatedTokenAddress(
            tokenMint,
            publicKey
          );

          setLoading(true)
          // Create the burn instruction
          const burnInstruction = createBurnInstruction(
            tokenAccount,
            tokenMint,
            publicKey,
            amount
          );
          // Create a new transaction and add the burn instruction
          const transaction = new Transaction().add(burnInstruction);
          
          // Send the transaction
          const signature = await sendTransaction(transaction,connection)

          const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();

          toast('⌛ Transaction Sent for Confirmation')  
          console.log(signature)
          successFunction()
          await connection.confirmTransaction({signature,blockhash,lastValidBlockHeight},'confirmed').then((res)=>{
                 //console.log('Tokens burned successfully');
          })
          setTimeout(()=>{
            setSuccess(true)
            setLoading(false)
            toast('✅ Transaction Successful') 
            restoreData()
            addUserTransaction(publicKey?.toString(),signature?.toString(),amount/10**selectedCoin?.decimals,(amount/10**selectedCoin?.decimals)*(selectedTokenStats?.priceUsd || 0),selectedCoin?.name,(selectedTokenStats?.fdv || 0),tokenMint?.toString())
          },2000)  

          
          //console.log(signature?.toString())
            
            // setTimeout(async()=>{
            //   const data = await connection.getSignatureStatuses([signature?.toString()],{
            //     searchTransactionHistory:true
            //   })
            //   console.log('Data',data)
            // },10000)
  
          // Wait for confirmation
//          await connection.getSignatureStatus(signature);



        } catch (error) {
          setLoading(false)
          toast('❌ Transaction Failed or Low Solana Balance') 
          console.error('Error burning tokens:', error);
          //if
          //toast('User Rejected the Request')
        }
      }
      //};

   




    useEffect(()=>{
        if(animationStarted){
            setTimeout(()=>{
                setAnimationDone(true)
            },3800)
        }
    },[animationStarted])

  return (
    <Provider value={{ loading,numberEntered,animationDone,onDumpClicked,animationStarted,success,setSuccess }} {...props}>
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