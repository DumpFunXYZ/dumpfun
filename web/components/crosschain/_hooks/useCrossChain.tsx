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

const useCrossChain = () => {
   const [fromChain,setFromChain]=useState(SOLANA);
   const [toChain,setToChain]=useState(BASE);
   const [fromTokens,setFromTokens]=useState([])
   const [toTokens,setToTokens]=useState([])
   const [srcToken,setSrcToken]:any=useState(null);
   const [destToken,setDestToken]:any=useState(null);
   const [quote,setQuote]:any=useState(null);
   const [amount,setAmount]:any=useState(0);
   const [evmWallet,setEvmWallet]=useState('')
   const { connection } = useConnection();
   const { publicKey, sendTransaction,wallet }:any = useWallet();
   const [transactionStatus, setTransactionStatus] = useState('');


   const fetchSrcTokens=async(chainId:string)=>{
    const data = await axios.get(`https://api.rocketx.exchange/v1/tokens?chainId=${chainId}&page=1&perPage=500&keyword=All`,{
        headers:{
            'x-api-key':"6ad5373e-7b43-473b-83c1-762a850cd678"
        }
    })
    if(data.data){
        setFromTokens(data?.data)
    }
    else{
        return []
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
const quoteData= await axios.get(`https://api.rocketx.exchange/v1/quotation?fromToken=${srcToken?.contract_address}&fromNetwork=${fromChain?.id}&toToken=${destToken?.contract_address}&toNetwork=${toChain?.id}&amount=${amount}&slippage=1&exchangeType=CEX`,{
    headers:{
        'x-api-key':"6ad5373e-7b43-473b-83c1-762a850cd678"
    }
})
if(quoteData?.data?.quotes?.length>0){
    let quotes=quoteData?.data?.quotes;
    const filter= [...quotes]?.filter((item,index)=>{
        return item?.exchangeInfo?.exchange_type==='CEX'
    })
    if(filter?.length>0){
        setQuote(filter?.[0])
    }
    else{
        setQuote({
            notFound:true
        })
    }
   
}else{
    setQuote({
        notFound:true
    })
}
   }

   const fetchChainTokens=async()=>{
    if(fromChain && toChain){
        await fetchSrcTokens(fromChain?.chainId);
        //console.log('SRC',src)
        //setSrcToken(src);
        await fetchDestTokens(toChain?.chainId);
        //setDestToken(dest)
    }
   }




 
    useEffect(()=>{

        fetchChainTokens()

        
    },[])
    const DEBOUNCE_DELAY = 1000; 

    useEffect(() => {
        const handler = setTimeout(() => {
            if (amount > 0) {
                fetchQuotes();
            }
        }, DEBOUNCE_DELAY);
    
        // Clear timeout if `amount`, `srcToken`, or `destToken` changes before the delay is over
        return () => clearTimeout(handler);
    }, [amount, srcToken, destToken]);

    const executeSwap=async()=>{
        try{
            const swapInfo= await axios.post(`https://api.rocketx.exchange/v1/swap`,{
                "fromTokenId": quote?.fromTokenInfo?.id,
                "toTokenId": quote?.toTokenInfo?.id,
                "userAddress": publicKey?.toString(),
                "destinationAddress": evmWallet,
                "disableEstimate": true,
                "fee": 1,
                "amount": parseFloat(amount),
                "slippage": 1,
                "referrerAddress":"Eerdg77ryqUjrKdhmfBDWW2d1KNNYKC6E853FYWUwCqY"
              },{
                headers:{
                    'x-api-key':"6ad5373e-7b43-473b-83c1-762a850cd678"
                }
              })
              if(swapInfo?.data?.swap){
                //toast('Swap Processed');
                console.log(swapInfo?.data?.swap)
                if(swapInfo?.data?.fromTokenInfo){
                    let txData=swapInfo?.data;
                    if(txData?.fromTokenInfo?.contract_address){
                        await sendSPLToken(txData?.fromTokenInfo?.contract_address,txData?.swap?.depositAddress,txData?.swap?.fromAmount*10**txData?.fromTokenInfo?.token_decimals)
                    }
                    else{
                        await sendSol(txData?.swap?.depositAddress,txData?.swap?.fromAmount*10**9)
                    }
                }
              }
        }catch(err){
            console.log(err)
        }
    }

    const sendSol = async (recipientAddress:string, amountInSOL:any) => {
        if (!publicKey) return alert('Please connect your wallet');

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(recipientAddress),
                lamports: LAMPORTS_PER_SOL * amountInSOL,
            })
        );

        try {
            const signature = await sendTransaction(transaction, connection);
            await checkTransactionStatus(signature);
        } catch (error) {
            console.error('Transaction failed:', error);
            setTransactionStatus('Transaction failed');
        }
    };

    const sendSPLToken = async (tokenMintAddress:string, recipientAddress:string, amount:any) => {
        if (!publicKey) return alert('Please connect your wallet');

        const mintPublicKey = new PublicKey(tokenMintAddress);
        const recipientPublicKey = new PublicKey(recipientAddress);

        const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            wallet?.adapter,
            mintPublicKey,
            publicKey
        );


        const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            wallet?.adapter,
            mintPublicKey,
            recipientPublicKey
        );

        const transaction = new Transaction().add(
            createTransferInstruction(
                senderTokenAccount.address,
                recipientTokenAccount.address,
                publicKey,
                amount,
                [],
                TOKEN_PROGRAM_ID
            )
        );

        try {
            const signature = await sendTransaction(transaction, connection);
            await checkTransactionStatus(signature);
        } catch (error) {
            console.error('Transaction failed:', error);
            setTransactionStatus('Transaction failed');
        }
    };

    const checkTransactionStatus = async (signature:string) => {
        try {
            const { value } = await connection.confirmTransaction(signature, 'confirmed');

            if (value.err) {
                setTransactionStatus('Transaction failed on-chain');
                console.error('Transaction failed on-chain:', value.err);
            } else {
                setTransactionStatus('Transaction confirmed on-chain');
                console.log('Transaction confirmed:', signature);
            }
        } catch (error) {
            console.error('Error checking transaction status:', error);
            setTransactionStatus('Error checking transaction status');
        }
    };
    

  return {
    fromChain,toChain,fromTokens,toTokens,srcToken,destToken,quote,setSrcToken,setDestToken,amount,setAmount,evmWallet,setEvmWallet,executeSwap
  };
};

export default useCrossChain


