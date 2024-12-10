{/*
https://api.rocketx.exchange/v1/quotation?fromToken=DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263&fromNetwork=solana&toToken=0x532f27101965dd16442e59d40670faf5ebb142e4&toNetwork=Base%20Chain&amount=0.2
*/}

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, LAMPORTS_PER_SOL, Transaction, PublicKey } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { BASE, SOLANA } from "../constants/chains";
import { erc20ABI, useAccount, useSigner } from "wagmi";
import { ethers, providers } from "ethers";

const useBaseBundle = () => {
   const [fromChain,setFromChain]=useState(BASE);
   const [toChain,setToChain]=useState(BASE);
   const [fromTokens,setFromTokens]=useState([])
   const [toTokens,setToTokens]=useState([])
   const [srcToken,setSrcToken]:any=useState(null);
   const [destToken,setDestToken]:any=useState(null);
   const [quote,setQuote]:any=useState(null);
   const [amount,setAmount]:any=useState(0);
   const [evmWallet,setEvmWallet]=useState('')
   const { connection } = useConnection();
   const {address}=useAccount();
   const { publicKey, sendTransaction,wallet }:any = useWallet();
   const [transactionStatus, setTransactionStatus] = useState('');
   const [transactionData,setTransactionData]:any=useState([])
   const {data:signer}:any=useSigner();
   const [loading,setLoading]:any=useState(false)

   const [srcTokens,setSrcTokens]:any=useState([]);
   
   const fetchErc20Tokens=async()=>{
    const data= await axios.get(`https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens?chain=base`,{
        headers:{
            'X-API-KEY':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjM2NjEzZmE2LWQ2NGEtNDdjYy05ZmJiLTA0MzMyMWQyZWE3ZSIsIm9yZ0lkIjoiMjAxODc0IiwidXNlcklkIjoiMjAxNTQ3IiwidHlwZUlkIjoiY2M2MDU4NTYtYWUwYy00ODM5LWI2MmEtNmZkNTMxYjkzYjM5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODI5NDE2MzYsImV4cCI6NDgzODcwMTYzNn0.BERwErffJQAJVdkfz3xD5Sgi71f5qCBAzUj3JafWxPQ"
          }
    })
    if(data?.data){
        let tkData=[...data?.data?.result];
        let filter:any=tkData?.filter((item,index)=>{
            return item?.token_address!='0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
        })
        //console.log(tkData,filter)
        setFromTokens(filter)
    }
   }

   const onApproveClicked=async()=>{
    let sum=0
    if(transactionData){
        //console.log(transactionData?.inputTokens)
        for(var i=0;i<transactionData?.inputTokens?.length;i++){
            let token=transactionData?.inputTokens?.[i];
            //console.log(token)
            setLoading(true)
            const provider= new ethers.providers.JsonRpcProvider(`https://base-pokt.nodies.app`);
            const contractInstance= new ethers.Contract(token?.tokenAddress,erc20ABI,signer);
            const allowance = await contractInstance.allowance(address, '0x19cEeAd7105607Cd444F5ad10dd51356436095a1');
            //console.log('Allowance',allowance,token?.amount)
            if(allowance.gte(token?.amount)){
                //console.log(sum)
                sum=sum+1
                //setLoading(false)
                //return
            }
            else{
                const approval = await contractInstance.approve('0x19cEeAd7105607Cd444F5ad10dd51356436095a1',ethers.constants.MaxUint256).catch((err:any)=>{
                    console.log(err);
                    setLoading(false);
                })
                //console.log('approval',approval)
                if(approval){
                    await provider.waitForTransaction(approval.hash).then((res)=>{
                        if(res.status==1){
                            sum=sum+1
                            setLoading(false)
                            //return 
                        }
                    })
                }
            }

        }

    }
    //console.log(sum)
    if(sum==srcTokens?.length){
        setLoading(true)
        const updatedQuote= await fetchUpdatedQuotes();
        //console.log(updatedQuote)
        try{
            if(updatedQuote?.pathId){
                const provider= new ethers.providers.JsonRpcProvider(`https://base-pokt.nodies.app`);
                const gasPrice= await provider.getGasPrice()
                const txData:any= await fetchTransactionDatabyId(updatedQuote?.pathId);
                //console.log(txData)
                const transaction = {
                    from: txData?.transaction?.from,
                    data: txData?.transaction?.data,
                    to: txData?.transaction?.to,
                    gasLimit: txData?.transaction?.gas,
                    gasPrice: gasPrice,
                    value: txData?.transaction?.value,
                  };
                  //console.log(transaction)
                if(txData?.transaction){
                    setLoading(true)
                    const tx= await signer.sendTransaction(transaction)
                    await provider.waitForTransaction(tx?.hash).then((res)=>{
                        if(res.status==1){
                            setLoading(false);
                            toast.success('Tokens Swapped')
                        }
                        else{
                            setLoading(false)
                            toast.error('Transaction Failed Onchain')
                        }
                    })
                    
                    
                }
            }
        }catch(err){
            setLoading(false);
            console.log(err)
        }
        
    }
   }

   





  
   const fetchDestTokens=async(chainId:string)=>{
    const data = await axios.get(`https://api.rocketx.exchange/v1/tokens?chainId=${chainId}&page=1&perPage=500&keyword=All`,{
        headers:{
            'x-api-key':"6ad5373e-7b43-473b-83c1-762a850cd678"
        }
    })
    if(data.data){
        //console.log(data?.data)
        setToTokens(data?.data)
    }
    else{
        return []
    }
   }

   const fetchQuotes=async()=>{
    let inputTokens=[]
    setLoading(true)
    for(var i=0;i<srcTokens.length;i++){
        let tk:any=srcTokens?.[i]
        inputTokens.push({
            tokenAddress:tk?.token_address,
            amount:tk?.balance
        })
    }
const quoteData= await axios.post(`https://api.odos.xyz/sor/quote/v2`,{
    "chainId": 8453,
    "inputTokens": inputTokens,
    "outputTokens": [
        {
            "tokenAddress": "0x0000000000000000000000000000000000000000",
            "proportion": 1
        }
    ],
    "userAddr": address,
    "slippageLimitPercent": 0.5,
    "pathViz": true,
}).catch((err)=>{
    toast('Error Fetching Quotes')
    setLoading(false)
})
if(quoteData?.data){
    let quotes=quoteData?.data;
    setLoading(false)
    setQuote(quotes)
   
}else{
    setLoading(false)
    setQuote({
        notFound:true
    })
}
return quoteData?.data
   }

   const fetchChainTokens=async()=>{
    if(fromChain && toChain){
        //await fetchSrcTokens(fromChain?.chainId);
        //console.log('SRC',src)
        //setSrcToken(src);
        await fetchDestTokens(toChain?.chainId);
        //setDestToken(dest)
    }
   }




 
    useEffect(()=>{
        if(address){
            fetchErc20Tokens()
            fetchChainTokens()
        }
        

        
    },[address])
    const DEBOUNCE_DELAY = 1000; 

    useEffect(() => {
        const handler = setTimeout(() => {
            if ((srcTokens?.[0]?.balance/10**18) > 0) {
                fetchQuotes();
            }
        }, DEBOUNCE_DELAY);
    
        // Clear timeout if `amount`, `srcToken`, or `destToken` changes before the delay is over
        return () => clearTimeout(handler);
    }, [srcTokens, destToken]);

   
    const fetchTransactionData=async(id:any)=>{
        setLoading(true)
        await axios.post(`https://api.odos.xyz/sor/assemble`,{
            "userAddr":address,
            "pathId":id || quote?.pathId
        }).then((res)=>{
            setLoading(false)
            setTransactionData(res.data)
            return res.data;
        }).catch((err)=>{
            setLoading(false)
            console.log(err)
            return null
        })
    }

    const fetchTransactionDatabyId=async(id:any)=>{
        const data= await axios.post(`https://api.odos.xyz/sor/assemble`,{
            "userAddr":address,
            "pathId":id || quote?.pathId
        })
        if(data?.data){
            return data?.data
        }
        else{
            setLoading(false)
            return null
        }
    }
  
    const fetchUpdatedQuotes=async()=>{
        let inputTokens=[]
        //setLoading(true)
        for(var i=0;i<srcTokens.length;i++){
            let tk:any=srcTokens?.[i]
            inputTokens.push({
                tokenAddress:tk?.token_address,
                amount:tk?.balance
            })
        }
    const quoteData= await axios.post(`https://api.odos.xyz/sor/quote/v2`,{
        "chainId": 8453,
        "inputTokens": inputTokens,
        "outputTokens": [
            {
                "tokenAddress": "0x0000000000000000000000000000000000000000",
                "proportion": 1
            }
        ],
        "userAddr": address,
        "slippageLimitPercent": 0.5,
        "pathViz": true,
    }).catch((err)=>{
        toast('Error Fetching Quotes')
        //setLoading(false)
    })
    if(quoteData?.data){
        let quotes=quoteData?.data;
        setLoading(false)
        setQuote(quotes)
       
    }else{
        setLoading(false)
        setQuote({
            notFound:true
        })
    }
    return quoteData?.data
       }

 

  
    

  return {
    fromChain,toChain,fromTokens,toTokens,srcToken,destToken,quote,setSrcToken,setDestToken,amount,setAmount,evmWallet,setEvmWallet,srcTokens,setSrcTokens,fetchQuotes,fetchTransactionData,onApproveClicked,transactionData,loading
  };
};

export default useBaseBundle


