'use client'
import { addUserIfNotExists } from "@/utils/authUtils";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AccountContext = createContext({});
const { Provider, Consumer } = AccountContext;

const KEY=process.env.HELIUS_KEY || 'e66be7c4-a831-411f-85db-e490ba3713e5'

const AccountProvider = ({ children, ...props }: {children: React.ReactNode}) => {
  const { publicKey } = useWallet();
  const [AccountData, setAccountData] = useState(null);
  const [coinData,setCoinData]=useState([])
  const [selectedCoin,setSelectedCoin]:any=useState(null)
  const [amount,setAmount]=useState(0)
  const [selectedTokenStats,setSelectedTokenStats]=useState([]);


  const fetchDexData=async()=>{
    const data= await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${selectedCoin?.id}`)
    if(data.data?.pairs){
      let filter=[...data?.data?.pairs].filter((item:any,index:any)=>{
            return (item?.dexId==='raydium' && item?.quoteToken?.symbol==='SOL')
      })
      //console.log(data?.data?.pairs)
      if(filter.length>0){
        setSelectedTokenStats(filter?.[0])
        //console.log('Filter',filter)
      }
      else{
        setSelectedTokenStats(data.data?.pairs?.[0])
      }
    }
  }


  const fetchCoinData=async(publicKey:string)=>{
    await axios.post(`https://mainnet.helius-rpc.com/?api-key=${KEY}`,
    {
      "jsonrpc": "2.0",
      "id": "text",
      "method": "getAssetsByOwner",
      "params": {
          "ownerAddress": publicKey,
          "options":{
              "showFungible":true
          }
      }
  },
  ).then((res)=>{
      const tokens= res.data.result?.items;
      let filter= [...tokens].filter((item,index)=>{
        return item?.interface==='FungibleToken'
      })
      let sortedToken:any=[]
      for(var i=0;i<filter.length;i++){
        let tk=filter?.[i];
        let tokenData={
          id:tk?.id,
          name:tk?.content?.metadata?.name,
          symbol:tk?.content?.metadata?.symbol,
          image:tk?.content?.files?.[0]?.uri || tk?.content?.files?.[0]?.cdn_uri,
          balance:tk?.token_info?.balance,
          formatted:tk?.token_info?.balance/10**tk?.token_info?.decimals,
          tokenProgram:tk?.token_info?.token_program,
          address:tk?.token_info?.associated_token_address,
          decimals:tk?.token_info?.decimals
        }
        sortedToken?.push(tokenData)
      }
      //console.log(sortedToken)
      setCoinData(sortedToken)
    })  
  }

  useEffect(()=>{
    //console.log(publicKey)
    if(publicKey){
      //console.log(publicKey)
      fetchCoinData(publicKey?.toString())
      addUserIfNotExists(publicKey?.toString())
    }
  },[publicKey])

  useEffect(()=>{
    if(selectedCoin?.id){
      fetchDexData()
    }
  },[selectedCoin])

  return (
    <Provider value={{ AccountData,coinData,selectedCoin,setSelectedCoin,amount,setAmount,selectedTokenStats }} {...props}>
      {children}
    </Provider>
  );
};

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
  AccountProvider,
  Consumer as AccountConsumer,
  useAccountContext,
};

export default AccountContext;