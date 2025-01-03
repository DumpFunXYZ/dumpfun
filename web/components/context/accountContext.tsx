'use client'
import { addUserIfNotExists } from "@/utils/authUtils"; // Importing utility function to check if user exists
import { getUserRewardData } from "@/utils/leaderBoard";
import { useWallet } from "@solana/wallet-adapter-react"; // Hook to connect and interact with user's Solana wallet
import { PublicKey } from "@solana/web3.js";
import axios from "axios"; // Axios for making API requests
import React, { createContext, useContext, useEffect, useState } from "react"; // React utilities for context and hooks

// Create a new context for account-related data
const AccountContext = createContext({});
const { Provider, Consumer } = AccountContext;

// API Key for Helius (default or from environment variable)
const KEY = process.env.HELIUS_KEY || 'e66be7c4-a831-411f-85db-e490ba3713e5';

// AccountProvider component to wrap the application with account management logic
const AccountProvider = ({ children, ...props }: {children: React.ReactNode}) => {
  const { publicKey } = useWallet(); // Get the connected wallet's public key from Solana wallet adapter
  const [AccountData, setAccountData] = useState(null); // State to store account-related data (currently unused)
  const [coinData, setCoinData] = useState([]); // State to store the list of user's tokens
  const [nftData,setNftData]=useState([]);
  const [selectedCoin, setSelectedCoin]: any = useState(null); // State for the selected token
  const [amount, setAmount] = useState(0); // State for the amount of the selected token
  const [selectedTokenStats, setSelectedTokenStats] = useState(null); // State to store stats for the selected token
  const [burntToken,setBurntToken]=useState(null)
  const [points,setPoints]=useState(0);
  
 
  // Function to fetch detailed DEX data for the selected token from DexScreener API
  const fetchDexData = async () => {
    const data = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${selectedCoin?.id}`);
    if (data.data?.pairs) {
      let filter:any=[];
      // Filter the token data to get the Raydium pair with SOL
      filter = [...data?.data?.pairs].filter((item: any, index: any) => {
        return ((item?.dexId === 'raydium') && item?.quoteToken?.symbol === 'SOL');
      });
      if(filter.length==0){
        filter = [...data?.data?.pairs].filter((item: any, index: any) => {
          return ((item?.dexId === 'orca') && item?.quoteToken?.symbol === 'SOL');
        });
      }

      // Set the selected token stats based on the filter results
      if (filter.length > 0) {
        setSelectedTokenStats(filter?.[0]); // If Raydium pair found, use it
      } else {
        setSelectedTokenStats(data.data?.pairs?.[0]); // Otherwise, use the first pair available
      }
    }
    else{
      setSelectedTokenStats(null)
    }
  };

  // Function to fetch the user's token data using Helius API
  const fetchCoinData = async (publicKey: string) => {
    await axios.post(`https://mainnet.helius-rpc.com/?api-key=${KEY}`, {
      "jsonrpc": "2.0",
      "id": "text",
      "method": "getAssetsByOwner",
      "params": {
        "ownerAddress": publicKey,
        "options": {
          "showFungible": true // We are only interested in fungible tokens
        }
      }
    }).then((res) => {
      const tokens = res.data.result?.items;
      let tokenDatas = [...tokens].filter((item, index) => {
        return item?.interface === 'FungibleToken'; // Filter out only fungible tokens
      });
      let filter= tokenDatas?.sort((a,b)=>{
        return (a?.token_info?.price_info?.total_price || 0)-(b?.token_info?.price_info?.total_price || 0)
      })
      //console.log('Filter',filter);

      const nftFilter=[...tokens].filter((item, index) => {
        return item?.interface !== 'FungibleToken' && item?.token_info?.supply>0; // Filter out only fungible tokens
      });

      //console.log(nftFilter)

      // Process the filtered tokens to extract relevant data
      let sortedToken: any = [];
      for (var i = 0; i < filter.length; i++) {
        let tk = filter?.[i];
        let tokenData = {
          id: tk?.id,
          name: tk?.content?.metadata?.name,
          symbol: tk?.content?.metadata?.symbol,
          image: tk?.content?.files?.[0]?.uri || tk?.content?.files?.[0]?.cdn_uri,
          balance: tk?.token_info?.balance,
          formatted: tk?.token_info?.balance / 10 ** tk?.token_info?.decimals, // Format balance with decimals
          tokenProgram: tk?.token_info?.token_program,
          address: tk?.token_info?.associated_token_address,
          decimals: tk?.token_info?.decimals
        };
        sortedToken?.push(tokenData); // Push each token data into the sortedToken array
      }
      //console.log(sortedToken)
      setCoinData(sortedToken); // Update state with the sorted tokens
      let sortedNFTs:any=[];
      for (var i = 0; i < nftFilter.length; i++) {
        let tk = nftFilter?.[i];
        let tokenData = {
          id: tk?.id,
          name: tk?.content?.metadata?.name,
          symbol: tk?.content?.metadata?.symbol,
          image: tk?.content?.files?.[0]?.cdn_uri || tk?.content?.files?.[0]?.uri,
          balance: tk?.token_info?.balance,
          formatted: tk?.token_info?.balance, // Format balance with decimals
          tokenProgram: tk?.token_info?.token_program,
          address: tk?.token_info?.associated_token_address,
          decimals: tk?.token_info?.decimals,
          type:'nft'
        };
        sortedNFTs?.push(tokenData); // Push each token data into the sortedToken array
      }
      //console.log(sortedNFTs)
      setNftData(sortedNFTs); 
    });
  };

  const fetchUserRank=async()=>{
    let data= await getUserRewardData(publicKey?.toString());
    setPoints(data?.totalPoints);
    //console.log('UserRanking->',data)
}
  // useEffect hook to fetch token data when the public key changes
  useEffect(() => {
    if (publicKey) {
      fetchCoinData(publicKey?.toString()); // Fetch token data
      addUserIfNotExists(publicKey?.toString()); // Ensure the user exists in your system
      fetchUserRank();
    }
  }, [publicKey]);

  // Restore data to initial state (reset selected token and amount)
  const restoreData = () => {
    if (publicKey) {
      fetchCoinData(publicKey?.toString()); // Re-fetch token data
      setBurntToken({...selectedCoin,amount:amount});
      setSelectedCoin(null); // Reset selected token
      setAmount(0); // Reset amount
      fetchUserRank()
    }
  };

  // useEffect hook to fetch DEX data when a token is selected
  useEffect(() => {
    if (selectedCoin?.id) {
      fetchDexData(); // Fetch detailed stats for the selected token
    }
  }, [selectedCoin]);

  // Return the provider that supplies account-related data to the app
  return (
    <Provider value={{ AccountData, coinData, selectedCoin, setSelectedCoin, amount, setAmount, selectedTokenStats, restoreData, burntToken,nftData,points}} {...props}>
      {children}
    </Provider>
  );
};

// Hook to use account context in child components
const useAccountContext = () => {
  const state = useContext(AccountContext);
  if (state === undefined) {
    throw new Error(
      "useAccountContext must be called within AccountProvider"
    );
  }

  return {
    ...state,
  };
};

export {
  AccountProvider, // Export the provider component
  Consumer as AccountConsumer, // Export the consumer for more granular control
  useAccountContext, // Export the custom hook for using the context
};

export default AccountContext;
