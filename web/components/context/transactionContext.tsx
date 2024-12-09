'use client'
import { addUserNFTTransaction, addUserTransaction } from '@/utils/authUtils'; // Import utility function to log user transactions
import { addTrade, updateStats } from '@/utils/leaderBoard';
//@ts-nocheck

// Import necessary modules from Solana SPL Token and Web3 libraries
import { getAssociatedTokenAddress, createBurnInstruction,createCloseAccountInstruction } from '@solana/spl-token';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import axios from 'axios';
import { ethers } from 'ethers';

//import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'; // Library to display toast notifications
//import { useGetBalance } from '../account/account-data-access'; // Import custom hook to get balance data
import { useAccountContext } from './accountContext'; // Import context for account data
import { erc20ABI, useAccount, useNetwork, useProvider, useSigner, useSwitchNetwork } from 'wagmi';
import { reportBug } from '@/utils/commonUtils';

// Create a new context to manage transaction states
const TransactionContext = createContext({});
const { Provider, Consumer } = TransactionContext;

const TransactionProvider = ({ children, ...props }: {children: React.ReactNode}) => {
    const [animationDone, setAnimationDone] = useState(false); // Manage animation state after token dump
    const [tokenBalance, setTokenBalance] = useState(0); // Hold token balance state
    const [loading, setLoading] = useState(false); // State for transaction loading status
    const [animationStarted, setAnimationStarted] = useState(false); // Track if animation for token dump has started
    const { selectedCoin, selectedTokenStats, amount, restoreData, accountType, walletAddress,closeAccounts,fetchCloseAccountInfo }: any = useAccountContext(); // Use account context to access selected token and restore functionality
    const { connection } = useConnection(); // Get current Solana connection from wallet adapter
    const { publicKey, sendTransaction, wallet }: any = useWallet(); // Get connected wallet information
    const {address}=useAccount()
    const [earnedPoints,setEarnedPoints]=useState(0)
    const [earnedSolana,setEarnedSolana]=useState(0.0016)
    const [success, setSuccess] = useState(false); // Manage success state of the transaction
    const [soundOn,setSoundOn]=useState(true);
    const [hash,setHash]=useState('')
    const provider=useProvider();
    const {data:signer}:any=useSigner();
  
    const { switchNetworkAsync, isSuccess, isLoading, isError } =
    useSwitchNetwork();
    const { chain } = useNetwork();
    //const [progress,setProgress]:any=useState(false);
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
      //console.log(dexData?.data)
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
        
        if(accountType=='Solana'){
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
        }
        else{
          burnBaseToken(successFunction);
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

          setHash(signature)          
          toast('⌛ Transaction Sent for Confirmation'); // Notify user of sent transaction
          
          

          // Confirm the transaction with the blockchain
          await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'finalized').then((res) => {
            //console.log('Tokens burned successfully');
            connection.getTransaction(signature).then(async(transaction) => {
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
                  // Restore the account data after transaction
                  // Log the transaction details
                  addUserTransaction(
                    publicKey?.toString(),
                    signature?.toString(),
                    amount / 10 ** selectedCoin?.decimals, // Normalize token amount
                    (amount / 10 ** selectedCoin?.decimals) * ( usd || 0), // Value of the transaction in USD
                    selectedCoin?.name,
                    ( marketCap || 0), // Fully diluted valuation (FDV)
                    tokenMint?.toString(),
                    0,
                    'Solana'
                  );
                }, 0); 
                let usdValue=(amount / 10 ** selectedCoin?.decimals) * ( usd || 0)
                await updateStats(0, amount / 10 ** selectedCoin?.decimals,(amount / 10 ** selectedCoin?.decimals) * ( usd || 0),usdValue>1?999:499,0)
                addTrade(publicKey?.toString(),(amount / 10 ** selectedCoin?.decimals) * ( usd || 0),liquidity || 0,signature?.toString(),usdValue>1?999:499)
                //setEarnedPoints((amount / 10 ** selectedCoin?.decimals) * ( usd || 0)*10)
                setEarnedPoints(usdValue>1?999:499)
                
                //console.log(signature);
                setEarnedSolana(0)
                restoreData(); 
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
            toast(`❌ ${err}`); 
            reportBug('Error Burning Tokens on Solana',JSON.stringify(err))
            console.error('Error burning tokens:', err); 
          })

          
          // Delay to allow final state updates

        } catch (error) {
          setLoading(false); // Reset loading state if error occurs
          toast(`❌ ${error}`); 
          reportBug('Error Burning NFTs on Solana',JSON.stringify(error))
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
            setHash(signature)       
            // Confirm the transaction with the blockchain
            await connection.confirmTransaction(
                { signature, blockhash, lastValidBlockHeight },
                'finalized'
            )
            const balanceAfter = await connection.getBalance(publicKey);
            
            await connection.getTransaction(signature).then(async(transaction) => {
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
                
                setEarnedPoints(999)
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
                    receivedSol || earnedSolana,
                    'Solana'
                );

                await updateStats(receivedSol || earnedSolana,amount/10**selectedCoin?.decimals,(amount / 10 ** selectedCoin?.decimals) * (usd || 0),999,0)
               
                addTrade(
                    publicKey.toString(),
                    (amount / 10 ** selectedCoin?.decimals) * (usd || 0),
                    liquidity || 0,
                    signature.toString(),
                    999
                );
                //setEarnedPoints(25)
        
                restoreData(); 
               
              } else {
                  console.log("Transaction not found.");
              }
          });
            
           // Restore account data
    
        } catch (error) {
            setLoading(false); // Reset loading state if error occurs
            toast(`❌ ${error}`); // Notify user of failure
            reportBug('Error Burning Tokens on Solana',JSON.stringify(error))
            //console.error('Error burning tokens:', JSON.stringify(error,null,2)); // Log the error details
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
          const balanceBefore = await connection.getBalance(publicKey);
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
          setHash(signature)
          await connection.confirmTransaction(
            { signature, blockhash, lastValidBlockHeight },
            'finalized'
        )
          const balanceAfter = await connection.getBalance(publicKey);
          await connection.getTransaction(signature).then((transaction) => {
            
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
                499
            );
              console.log('NFT burned and rent reclaimed successfully');
              toast('✅ NFT Burnt');
              
              // Call success function on successful transaction
              successFunction();
              
              setSuccess(true);
              setLoading(false);
      
              // Fetch market data and log transaction details
              const receivedSol = (balanceAfter - balanceBefore) / 1e9;
              setEarnedSolana(receivedSol || earnedSolana)
              setEarnedPoints(25)
              //setEarnedSolana(receivedSol)
             
              //setEarnedPoints(25)
      
              restoreData(); 
             
            } else {
              setLoading(false);
              toast.error(`Transaction Failed onchain`)  
                console.log("Transaction not found.");
            }
        });

          // Confirm transaction with the blockchain
          
         
      } catch (error) {
          setLoading(false);
          toast(`❌ ${error}`); 
          reportBug('Error Burning NFTs on Solana',JSON.stringify(error))
          console.error('Error burning NFT:', error);
      }
  };

  const burnBaseToken=async(successFunction:any)=>{
    if (!signer) {
      console.error('Signer is not available');
      return;
    }



    if (chain?.id !== 8453) {
      await switchNetworkAsync?.(8453).catch((err) => {
        console.log(err)
        reportBug('Error Changing Chains',JSON.stringify(err))
        toast(`Please switch to Base mainnet manually`);
        return
      });
    } 
  
    // Create an instance of the ERC20 contract
    const tokenContract = new ethers.Contract(
      selectedCoin?.id,
      erc20ABI,
      signer
    );
  
    try {
      setLoading(true)
      // Convert the burn amount to the appropriate decimals
      const amounts = ethers.utils.parseUnits(amount?.toString(), selectedCoin?.decimals); // Adjust 18 if your token uses different decimals
      let {usd,marketCap,liquidity,volume}=await fetchDexData();
      // Call the burn function
      const tx = await tokenContract.transfer('0x000000000000000000000000000000000000dEaD',amounts);
      //console.log('Burn transaction submitted:', tx.hash);
  
      // Wait for the transaction to be mined
       await provider.waitForTransaction(tx?.hash).then(async(res)=>{
        if(res.status==1){
          toast('✅ Transaction Successful');
      
              // Success handling
              if(soundOn){
                successFunction();
              }
             
              setSuccess(true);
              setLoading(false);
      
              // Fetch market data and log transaction details
              
              setEarnedPoints(amount===selectedCoin?.formatted?999:selectedCoin?.usd>1?999:499)
              setEarnedSolana(0)
              //setEarnedSolana(receivedSol || earnedSolana)
              addUserTransaction(
                walletAddress,
                  tx?.hash,
                  amount,   // Normalize token amount
                  selectedCoin?.usd, // Value of the transaction in USD
                  selectedCoin?.name,
                  marketCap || 0,                          // Fully diluted valuation (FDV)
                  selectedCoin?.id,
                  0,
                  'Base'
              );
              await updateStats(0, amounts,selectedCoin?.usd,amount===selectedCoin?.formatted?999:selectedCoin?.usd>1?999:499,0)
              //console.log(amount===selectedCoin?.formatted,amount,selectedCoin?.balance_formatted)
              addTrade(
                walletAddress,
                selectedCoin?.usd,
                  liquidity || 0,
                  tx?.hash,
                  amount===selectedCoin?.formatted?999:selectedCoin?.usd>1?999:499
              );
      
              restoreData(); 
        }
       })
    } catch (error) {
      setLoading(false);
      toast('Error Burning Tokens')
      reportBug('Error Burning NFTs on Solana',JSON.stringify(error))
      console.error('Error burning tokens:', error);
    }
  }

  const onCloseAccountClicked=async()=>{
    let audio = new Audio("https://firebasestorage.googleapis.com/v0/b/enclave-74f51.appspot.com/o/product%2Fflush.mp3?alt=media&token=75b2eed4-97de-47b8-a8ed-833395709be7")
    let add:any=[]
    let sum:any=0
    for(var i=0;i<closeAccounts?.length;i++){
      let acc=closeAccounts?.[i]?.account?.data?.parsed?.info?.mint
      add.push(acc);
      sum=sum+closeAccounts?.[i]?.account?.lamports/10**9
    }

    closeAccountsBundled(add,()=>audio.play(),sum)
  }

  const closeAccountsBundled = async (
    mintAddresses: PublicKey[], // Array of token mint addresses
    successFunction: any, // Function to run on successful transaction
    sum:any
  ) => {
    if (!publicKey) {
      console.error('Wallet not connected'); // Error handling for when wallet is not connected
      return;
    }
  
    try {
      setLoading(true); // Set loading state during transaction processing
  
      // Initialize a new transaction
      const transaction = new Transaction();
      const results = []; // Array to track mint addresses and their statuses
  
      for (const mintAddress of mintAddresses) {
        const tokenMint = new PublicKey(mintAddress); // Create PublicKey object for mint address
  
        try {
          // Get the associated token account for the user
          const tokenAccount = await getAssociatedTokenAddress(tokenMint, publicKey);
  
          // Fetch account information to ensure it has a zero balance
          
  
          // Create the close account instruction and add it to the transaction
          const closeInstruction = createCloseAccountInstruction(
            tokenAccount, // Token account to close
            publicKey, // Destination account to receive rent
            publicKey // Owner of the token account
          );
  
          transaction.add(closeInstruction); // Add the instruction to the transaction
          results.push({ mintAddress, status: 'added' });
        } catch (err:any) {
          console.error(`Error preparing close instruction for mint ${mintAddress}:`, err);
          results.push({ mintAddress, status: 'failed', reason: err.message });
        }
      }
  
      if (transaction.instructions.length === 0) {
        console.warn('No valid accounts to close.');
        toast('❌ No accounts were eligible for closure.');
        setLoading(false);
        return;
      }
  
      // Send the bundled transaction
      const signature = await sendTransaction(transaction, connection);
  
      const { context: { slot: minContextSlot }, value: { blockhash, lastValidBlockHeight } } = await connection.getLatestBlockhashAndContext();
  
      setHash(signature);
      toast('⌛ Transaction Sent for Confirmation'); // Notify user of sent transaction
  
      // Confirm the transaction with the blockchain
      await connection.confirmTransaction(
        { signature, blockhash, lastValidBlockHeight },
        'finalized'
      );
  
      console.log('Bundled accounts closed successfully.');
      toast('✅ Accounts closed successfully.');
      setSuccess(true); // Mark the transaction as successful
      setEarnedPoints(99*mintAddresses?.length);
      setEarnedSolana(sum);
      await updateStats(sum, 0,0,99*mintAddresses?.length,mintAddresses?.length)
      if (soundOn) {
        successFunction();
      }
      fetchCloseAccountInfo(publicKey?.toString())
    } catch (error) {
      setLoading(false); // Reset loading state if error occurs
      toast(`❌ ${error}`);
      reportBug('Error Closing Bundled Accounts on Solana', JSON.stringify(error));
      console.error('Error closing bundled accounts:', error); // Log the error details
    } finally {
      setLoading(false); // Ensure loading state is reset
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
    <Provider value={{ loading, numberEntered, animationDone, onDumpClicked, animationStarted, success, setSuccess,earnedPoints,earnedSolana,soundOn,setSoundOn,setLoading,hash,setHash,onCloseAccountClicked }} {...props}>
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
