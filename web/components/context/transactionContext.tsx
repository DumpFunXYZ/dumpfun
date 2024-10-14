'use client'
import { addUserTransaction } from '@/utils/authUtils'; // Import utility function to log user transactions
import { addTrade } from '@/utils/leaderBoard';
//@ts-nocheck

// Import necessary modules from Solana SPL Token and Web3 libraries
import { TOKEN_PROGRAM_ID, burn, getOrCreateAssociatedTokenAccount, getAssociatedTokenAddress, createBurnInstruction } from '@solana/spl-token';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";

//import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'; // Library to display toast notifications
//import { useGetBalance } from '../account/account-data-access'; // Import custom hook to get balance data
import { useAccountContext } from './accountContext'; // Import context for account data

// Create a new context to manage transaction states
const TransactionContext = createContext({});
const { Provider, Consumer } = TransactionContext;

const TransactionProvider = ({ children, ...props }: {children: React.ReactNode}) => {
    const [animationDone, setAnimationDone] = useState(false); // Manage animation state after token dump
    const [tokenBalance, setTokenBalance] = useState(0); // Hold token balance state
    const [loading, setLoading] = useState(false); // State for transaction loading status
    const [animationStarted, setAnimationStarted] = useState(false); // Track if animation for token dump has started
    const { selectedCoin, selectedTokenStats, amount, restoreData }: any = useAccountContext(); // Use account context to access selected token and restore functionality
    const { connection } = useConnection(); // Get current Solana connection from wallet adapter
    const { publicKey, sendTransaction, wallet }: any = useWallet(); // Get connected wallet information
    
    const [success, setSuccess] = useState(false); // Manage success state of the transaction

    // Function to handle when user enters a number for the amount to burn
    const numberEntered = () => {
      if (amount < selectedCoin?.formatted) {
        setAnimationStarted(true); // Start animation if the entered amount is valid
      } else {
        setAnimationDone(false);
        toast('Insufficient Amount Entered'); // Display a toast if the entered amount is insufficient
      }
    };

    // Function to handle the burn (dump) action once the process starts
    const onDumpClicked = (successFunction: any) => {
        setAnimationDone(false);
        setAnimationStarted(false);

        // Call the function to burn the selected tokens
        burnToken(selectedCoin?.id, amount * 10 ** selectedCoin?.decimals, successFunction);
    };

    // Function to burn tokens (on-chain token burn)
    const burnToken = async (
        mintAddress: PublicKey, // Address of the token mint
        amount: number, // Amount of tokens to burn (adjusted for decimals)
        successFunction: any // Function to run on successful transaction
    ) => {
        if (!publicKey) {
          console.error('Wallet not connected'); // Error handling for when wallet is not connected
          return;
        }
        
        const tokenMint = new PublicKey(mintAddress); // Create a PublicKey object for the mint address
        try {
          // Get the associated token account for the user
          const tokenAccount = await getAssociatedTokenAddress(tokenMint, publicKey);

          setLoading(true); // Set loading state during transaction processing
          
          // Create the burn instruction to destroy tokens
          const burnInstruction = createBurnInstruction(
            tokenAccount, // Token account to burn from
            tokenMint, // Mint of the token being burned
            publicKey, // Owner of the token account
            amount // Amount to burn
          );
          
          // Create a new transaction and add the burn instruction to it
          const transaction = new Transaction().add(burnInstruction);

          // Send the transaction and retrieve the signature
          const signature = await sendTransaction(transaction, connection);

          const { context: { slot: minContextSlot }, value: { blockhash, lastValidBlockHeight } } = await connection.getLatestBlockhashAndContext();

          toast('⌛ Transaction Sent for Confirmation'); // Notify user of sent transaction
          console.log(signature);

          // Call success function on successful transaction
          successFunction();

          // Confirm the transaction with the blockchain
          await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'confirmed').then((res) => {
            console.log('Tokens burned successfully');
          });

          setTimeout(() => {
            setSuccess(true); // Mark the transaction as successful
            setLoading(false); // Remove the loading state
            toast('✅ Transaction Successful'); // Notify user of success
            restoreData(); // Restore the account data after transaction
            // Log the transaction details
            addUserTransaction(
              publicKey?.toString(),
              signature?.toString(),
              amount / 10 ** selectedCoin?.decimals, // Normalize token amount
              (amount / 10 ** selectedCoin?.decimals) * (selectedTokenStats?.priceUsd || 0), // Value of the transaction in USD
              selectedCoin?.name,
              (selectedTokenStats?.fdv || 0), // Fully diluted valuation (FDV)
              tokenMint?.toString()
            );
          }, 2000); 
          addTrade(publicKey?.toString(),(amount / 10 ** selectedCoin?.decimals) * (selectedTokenStats?.priceUsd || 0),selectedTokenStats?.liquidity?.usd || 0)
          
          // Delay to allow final state updates

        } catch (error) {
          setLoading(false); // Reset loading state if error occurs
          toast('❌ Transaction Failed or Low Solana Balance'); // Notify user of failure
          console.error('Error burning tokens:', error); // Log the error details
        }
      };

    // Effect to trigger animation when token dump starts
    useEffect(() => {
        if (animationStarted) {
            setTimeout(() => {
                setAnimationDone(true); // Mark animation as done after a set duration
            }, 3800);
        }
    }, [animationStarted]);

  return (
    <Provider value={{ loading, numberEntered, animationDone, onDumpClicked, animationStarted, success, setSuccess }} {...props}>
      {children}
    </Provider>
  );
};

// Custom hook to access the transaction context
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
  TransactionProvider, // Export provider to wrap components that need access to transaction context
  Consumer as TransactionConsumer, // Export consumer (not used often in hooks-based components)
  useTransactionContext, // Export the custom hook for transaction context
};

export default TransactionContext; // Default export of the transaction context
