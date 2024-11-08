'use client'
import { addUserNFTTransaction, addUserTransaction } from '@/utils/authUtils'; // Import utility function to log user transactions
import { addTrade } from '@/utils/leaderBoard';
//@ts-nocheck

// Import necessary modules from Solana SPL Token and Web3 libraries
import { TOKEN_PROGRAM_ID, burn, getOrCreateAssociatedTokenAccount, getAssociatedTokenAddress, createBurnInstruction,createCloseAccountInstruction } from '@solana/spl-token';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { BlockheightBasedTransactionConfirmationStrategy, clusterApiUrl, Connection, PublicKey, sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import axios from 'axios';

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
    const [earnedPoints,setEarnedPoints]=useState(0)
    const [earnedSolana,setEarnedSolana]=useState(0.0016)
    const [success, setSuccess] = useState(false); // Manage success state of the transaction
    const [soundOn,setSoundOn]=useState(true);

    // Function to handle when user enters a number for the amount to burn
    const numberEntered = () => {
      if(amount>0){
        if (amount <= selectedCoin?.formatted) {
          setAnimationStarted(true); // Start animation if the entered amount is valid
        } else {
          setAnimationDone(false);
          toast('Insufficient Amount Entered'); // Display a toast if the entered amount is insufficient
        }
      }else{
        toast.error('Cannot Dump Zero Coins')
      }
      
    };

    const fetchDexData=async()=>{
      //console.log(selectedCoin)
      const dexData:any= await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${selectedCoin?.id}`).catch((err)=>{
        return {
          usd:0,
          marketCap:0,
          liquidity:0,
          volume:0
        }
      })
      console.log(dexData?.data)
      if(dexData?.data?.pairs?.length>0){
        let dt=dexData?.data?.pairs?.[0]
        return {
          usd:dt?.priceUsd,
          marketCap:dt?.marketCap,
          liquidity:dt?.liquidity?.usd,
          volume:dt?.volume?.[`h24`]
        }
      }
      else{
        return {
          usd:0,
          marketCap:0,
          liquidity:0,
          volume:0
        }
      }
    }

    // Function to handle the burn (dump) action once the process starts
    const onDumpClicked = (successFunction: any) => {
        setAnimationDone(false);
        setAnimationStarted(false);
        if(selectedCoin?.type=='nft'){
          burnNFTWithRent(selectedCoin?.id, successFunction);
        }
        else{
          if(amount === selectedCoin?.formatted){
           
              burnTokenWithRent(selectedCoin?.id, amount * 10 ** selectedCoin?.decimals, successFunction);
            
            
          }
          else{
            burnToken(selectedCoin?.id, amount * 10 ** selectedCoin?.decimals, successFunction);
          }
        }
        // Call the function to burn the selected tokens
        
       
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
          let {usd,marketCap,liquidity,volume}=await fetchDexData();
          //console.log(usd,marketCap,liquidity,volume)
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
          
          

          // Confirm the transaction with the blockchain
          await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'confirmed').then((res) => {
            //console.log('Tokens burned successfully');
            connection.getTransaction(signature).then((transaction) => {
              //console.log('Tx',transaction)
              if (transaction && transaction.meta && transaction.meta.err) {
                setLoading(false);
                toast.error(`Transaction Failed onchain`)  
                //console.log("Transaction failed:", transaction.meta.err);
              } else if (transaction) {
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
                    (amount / 10 ** selectedCoin?.decimals) * ( usd || 0), // Value of the transaction in USD
                    selectedCoin?.name,
                    ( marketCap || 0), // Fully diluted valuation (FDV)
                    tokenMint?.toString(),
                    0
                  );
                }, 500); 
                addTrade(publicKey?.toString(),(amount / 10 ** selectedCoin?.decimals) * ( usd || 0),liquidity || 0,signature?.toString(),10)
                //setEarnedPoints((amount / 10 ** selectedCoin?.decimals) * ( usd || 0)*10)
                setEarnedPoints(10)
                //console.log(signature);
              setEarnedSolana(0)
              // Call success function on successful transaction
              if(soundOn){
                successFunction();
              }
              } else {
                  console.log("Transaction not found.");
              }
          });

          
          }).catch((err)=>{
            setLoading(false); // Reset loading state if error occurs
            toast('❌ Transaction Failed or Low Solana Balance'); // Notify user of failure
            console.error('Error burning tokens:', err); 
          })

          
          // Delay to allow final state updates

        } catch (error) {
          setLoading(false); // Reset loading state if error occurs
          toast('❌ Transaction Failed or Low Solana Balance'); // Notify user of failure
          console.error('Error burning tokens:', error); // Log the error details
        }
      };

      const burnTokenWithRent = async (
        mintAddress: PublicKey, // Address of the token mint
        amount: number, // Amount of tokens to burn (adjusted for decimals)
        successFunction: () => void // Function to run on successful transaction
    ) => {
        if (!publicKey) {
            console.error('Wallet not connected'); // Error handling for when wallet is not connected
            return;
        }
    
        try {
            setLoading(true); // Set loading state during transaction processing
    
            const tokenMint = new PublicKey(mintAddress); // Create a PublicKey object for the mint address
            let { usd, marketCap, liquidity, volume } = await fetchDexData();
            //console.log(usd,marketCap,liquidity,volume)
            // Get the associated token account for the user
            const tokenAccount = await getAssociatedTokenAddress(tokenMint, publicKey);
            const balanceBefore = await connection.getBalance(publicKey);
            // Create the burn instruction to destroy tokens
            const burnInstruction = createBurnInstruction(
                tokenAccount,  // Token account to burn from
                tokenMint,     // Mint of the token being burned
                publicKey,     // Owner of the token account
                selectedCoin?.balance        // Amount to burn
            );
    
            // Create the close account instruction to reclaim rent
            const closeAccountInstruction = createCloseAccountInstruction(
                tokenAccount,  // Account to close
                publicKey,     // Account receiving the rent
                publicKey      // Owner of the account
            );
    
            // Create a new transaction and add the burn and close account instructions
            const transaction = new Transaction()
                .add(burnInstruction)
                .add(closeAccountInstruction);
    
            // Get the latest blockhash and context
            const { context: { slot: minContextSlot }, value: { blockhash, lastValidBlockHeight } } = await connection.getLatestBlockhashAndContext();
    
            // Send the transaction and retrieve the signature
            const signature = await sendTransaction(transaction, connection);
            console.log('⌛ Transaction Sent for Confirmation');
            toast('⌛ Transaction Sent for Confirmation');
    
            // Confirm the transaction with the blockchain
            await connection.confirmTransaction(
                { signature, blockhash, lastValidBlockHeight },
                'confirmed'
            )
            const balanceAfter = await connection.getBalance(publicKey);
            
            connection.getTransaction(signature).then((transaction) => {
              //console.log('Tx',transaction)
              if (transaction && transaction.meta && transaction.meta.err) {
                setLoading(false);
                toast.error(`Transaction Failed onchain`)  
                //console.log("Transaction failed:", transaction.meta.err);
              } else if (transaction) {
                console.log('Tokens burned and rent reclaimed successfully');
                toast('✅ Transaction Successful');
        
                // Success handling
                if(soundOn){
                  successFunction();
                }
               
                setSuccess(true);
                setLoading(false);
        
                // Fetch market data and log transaction details
                
                setEarnedPoints(100)
                const receivedSol = (balanceAfter - balanceBefore) / 1e9;
                setEarnedSolana(receivedSol || earnedSolana)
                addUserTransaction(
                    publicKey.toString(),
                    signature.toString(),
                    amount / 10 ** selectedCoin?.decimals,   // Normalize token amount
                    (amount / 10 ** selectedCoin?.decimals) * (usd || 0), // Value of the transaction in USD
                    selectedCoin?.name,
                    marketCap || 0,                          // Fully diluted valuation (FDV)
                    tokenMint.toString(),
                    receivedSol || earnedSolana
                );
               
                addTrade(
                    publicKey.toString(),
                    (amount / 10 ** selectedCoin?.decimals) * (usd || 0),
                    liquidity || 0,
                    signature.toString(),
                    100
                );
        
                restoreData(); 
               
              } else {
                  console.log("Transaction not found.");
              }
          });
            
           // Restore account data
    
        } catch (error) {
            setLoading(false); // Reset loading state if error occurs
            toast('❌ Transaction Failed or Low Solana Balance'); // Notify user of failure
            console.error('Error burning tokens:', error); // Log the error details
        }
    };

    const burnNFTWithRent = async (
      mintAddress: PublicKey, // Address of the NFT mint
      successFunction: () => void // Function to run on successful transaction
  ) => {
      if (!publicKey) {
          console.error('Wallet not connected');
          return;
      }
  
      try {
          const tokenMint = new PublicKey(mintAddress); // Create a PublicKey object for the mint address
          setLoading(true);
  
          // Get the associated token account for the NFT
          const nftAccount = await getAssociatedTokenAddress(tokenMint, publicKey);
          //console.log('NFT Account',nftAccount)
          // Burn instruction to destroy the NFT
          const burnInstruction = createBurnInstruction(
              nftAccount,  // NFT account to burn from
              tokenMint,   // Mint of the NFT being burned
              publicKey,   // Owner of the NFT account
              1            // Amount to burn (always 1 for NFTs)
          );
  
          // Close account instruction to reclaim rent
          const closeAccountInstruction = createCloseAccountInstruction(
              nftAccount,  // Account to close
              publicKey,   // Account receiving the rent
              publicKey    // Owner of the account
          );
  
          // Create transaction with burn and close account instructions
          const transaction = new Transaction()
              .add(burnInstruction)
              .add(closeAccountInstruction);
  
          // Send transaction and retrieve signature
          const { context: { slot: minContextSlot }, value: { blockhash, lastValidBlockHeight } } = await connection.getLatestBlockhashAndContext();
          const signature = await sendTransaction(transaction, connection);
          console.log('⌛ Transaction Sent for Confirmation');
          toast('⌛ Transaction Sent for Confirmation');
  
          // Confirm transaction with the blockchain
          await connection.confirmTransaction(
              { signature, blockhash, lastValidBlockHeight },
              'confirmed'
          );
          addUserNFTTransaction(
            publicKey.toString(),
            signature.toString(),
            1,   // Normalize token amount
            0, // Value of the transaction in USD
            selectedCoin?.name,
            0,                          // Fully diluted valuation (FDV)
            tokenMint.toString(),
            0.00204
        );
       
        addTrade(
            publicKey.toString(),
            0,
            0 || 0,
            signature.toString(),
            100
        );
          console.log('NFT burned and rent reclaimed successfully');
          toast('✅ NFT Burned and Rent Reclaimed Successfully');
          
          // Call success function on successful transaction
          successFunction();
          
          setSuccess(true);
          setLoading(false);
      } catch (error) {
          setLoading(false);
          toast('❌ Transaction Failed or Low Solana Balance');
          console.error('Error burning NFT:', error);
      }
  };

    // Effect to trigger animation when token dump starts
    useEffect(() => {
        if (animationStarted) {
            setTimeout(() => {
                setAnimationDone(true); // Mark animation as done after a set duration
            }, 3000);
        }
    }, [animationStarted]);

  return (
    <Provider value={{ loading, numberEntered, animationDone, onDumpClicked, animationStarted, success, setSuccess,earnedPoints,earnedSolana,soundOn,setSoundOn }} {...props}>
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
