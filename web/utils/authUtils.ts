import { firestore } from './firebase'; // Import Firestore from your Firebase setup
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

/**
 * Adds a user document to the "users" collection in Firestore.
 * The document's name will be the walletAddress and will only be added if it doesn't already exist.
 *
 * @param walletAddress - The wallet address of the user (used as document ID).
 * @returns {Promise<void>} - A promise that resolves when the document is added or already exists.
 */
export const addUserIfNotExists = async (walletAddress: string): Promise<void> => {
  try {
    const userDocRef = doc(firestore, 'users', walletAddress);
    
    // Check if the document already exists
    const docSnapshot = await getDoc(userDocRef);
    
    if (!docSnapshot.exists()) {
      // If it doesn't exist, create a new document with walletAddress and timestamp
      const userData = {
        walletAddress,
        createdAt: Timestamp.now(),
      };
      await setDoc(userDocRef, userData);
      //console.log('Document added for wallet address:', walletAddress);
    } else {
      //console.log('Document already exists for wallet address:', walletAddress);
    }
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const addUserTransaction = async (walletAddress: string,hash:any,amount:any,amountInUsd:any,name:string,volume:any,tokenAddress:any,earnedSolana:any,chain:any): Promise<void> => {
    try {
      const userDocRef = doc(firestore, 'dumps', hash);
      //console.log(walletAddress,hash,amount,amountInUsd,name,volume)
      // Check if the document already exists
      const docSnapshot = await getDoc(userDocRef);
      
      if (!docSnapshot.exists()) {
        // If it doesn't exist, create a new document with walletAddress and timestamp
        const userData = {
          address:walletAddress,
          hash:hash,
          amount:amount,
          amountInUsd:amountInUsd,
          name:name,
          volume:volume,
          createdAt: Timestamp.now(),
          tokenAddress:tokenAddress,
          rent:earnedSolana,
          chain:chain
        };
        await setDoc(userDocRef, userData);
        //console.log('Document added for wallet address:', walletAddress);
      } else {
        //console.log('Document already exists for wallet address:', walletAddress);
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
  export const addUserNFTTransaction = async (walletAddress: string,hash:any,amount:any,amountInUsd:any,name:string,volume:any,tokenAddress:any,earnedSolana:any): Promise<void> => {
    try {
      const userDocRef = doc(firestore, 'nft-dumps', hash);
      //console.log(walletAddress,hash,amount,amountInUsd,name,volume)
      // Check if the document already exists
      const docSnapshot = await getDoc(userDocRef);
      
      if (!docSnapshot.exists()) {
        // If it doesn't exist, create a new document with walletAddress and timestamp
        const userData = {
          address:walletAddress,
          hash:hash,
          amount:amount,
          amountInUsd:amountInUsd,
          name:name,
          volume:volume,
          createdAt: Timestamp.now(),
          tokenAddress:tokenAddress,
          rent:earnedSolana
        };
        await setDoc(userDocRef, userData);
        //console.log('Document added for wallet address:', walletAddress);
      } else {
        //console.log('Document already exists for wallet address:', walletAddress);
      }
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
