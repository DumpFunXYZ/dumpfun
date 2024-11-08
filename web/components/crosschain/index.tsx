'use client'
import React, { useState } from 'react'

import DeBridgeWidget from './_components/Bridge';
import { useRouter } from 'next/navigation';
import backIcon from '../../app/assets/back.svg'

const evmWalletRegex = /^0x[a-fA-F0-9]{40}$/;


export default function CrossChainSwap() {
    const [tokenOne,setTokenOne]=useState(false)
    const [tokenTwo,setTokenTwo]=useState(false);
   // const {fromChain,toChain,fromTokens,toTokens,srcToken,destToken,quote,setSrcToken,setDestToken,amount,setAmount,evmWallet,setEvmWallet,executeSwap}:any=useCrossChain()
    //console.log(fromTokens)
    const router=useRouter();
  return (
    <div className=" h-full flex relative max-w-screen h-screen overflow-y-hidden w-[100%] self-center w-full bg-[#00191D] flex-col items-center justify-center">
     <div className="h-full flex  max-w-md w-[100%] self-center p-[20px] overflow-x-hidden overflow-y-scroll pb-[200px] pt-[15px] w-full flex-col">
     <div className='sm:w-[400px] w-[95%]  mt-[20px] flex flex-row items-center justify-start'>
        <button onClick={()=>{
            router.back()
        }} className=' mr-[20px]'>
            <img src={backIcon.src}/>
        </button>
        <p className='bold text-[18px]  text-[white]'>Cross Chain Liquidity</p>
        </div>
    <DeBridgeWidget/>  
    </div>
    </div>
  )
}
{/*
  <p className='w-[100%] text-[20px] text-center bold text-[white]'>Cross Chain Liquidity</p>
        <div className='w-[100%] flex flex-col items-center justify-center my-[40px]'>
            <div className='w-[100%] flex flex-col rounded-[20px] p-[16px] bg-[#1E3A5F] items-start justify-start'>
                <div className='w-[100%] flex flex-row items-center justify-between'>
                    <p className='medium text-[16px] text-[white]'>From {fromChain?.name}</p>
                    <div className='flex flex-row items-center justify-end'>
                        <button className='semiBold text-[14px] text-[white] mr-[12px]'>Half</button>
                        <button className='semiBold text-[14px] text-[white] mr-[12px]'>Full</button>
                    </div>
                </div>
                
                <div className='w-[100%] flex flex-row mt-[32px] items-center justify-between'>
                    <button onClick={()=>{setTokenOne(true)}} className='flex flex-row items-center justify-start'>
                    {srcToken?.icon_url ?<img className='w-[32px] h-[32px] rounded-full' src={srcToken?.icon_url}/>:<div className='w-[32px] h-[32px] rounded-full bg-[grey]' /> }
                    
                    <p className='text-[white] medium text-[white] ml-[12px]'>{srcToken?.token_name || 'SELECT'}</p>
                    <img src={down.src}/>
                    </button>
                    <div className=''>
                    <input value={amount} onChange={(e)=>{
                        setAmount(e?.target?.value)
                    }} className='h-[32px] w-[130px] bg-[transparent] text-end text-[white] text-[32px]  medium'/>
                    </div>
                </div>
            </div>
            <div className='my-[20px] w-[100%] flex items-center justify-center'>
                    <img className='h-[36px] w-[36px]' src={swap.src}/>
                </div>
            <div className='w-[100%] flex flex-col rounded-[20px] p-[16px] bg-[#1E3A5F] items-start justify-start'>
                <div className='w-[100%] flex flex-row items-center justify-between'>
                    <p className='medium text-[16px] text-[white]'>To {toChain?.name}</p>
                    <div className='flex flex-row items-center justify-end'>
                        
                    </div>
                </div>
                <div className='w-[100%] flex flex-row mt-[32px] items-center justify-between'>
                    <button onClick={()=>{setTokenTwo(true)}} className='flex flex-row items-center justify-start'>
                    {destToken?.icon_url ?<img className='w-[32px] h-[32px] rounded-full' src={destToken?.icon_url}/>:<div className='w-[32px] h-[32px] rounded-full bg-[grey]' /> }
                    
                    <p className='text-[white] medium text-[white] ml-[12px]'>{destToken?.token_name || 'SELECT'}</p>
                    <img src={down.src}/>
                    </button>
                    <div className=''>
                    <input disabled value={quote?.toAmount} onChange={(e)=>{
                        //setAmount(e?.target?.value)
                    }} className='h-[32px] w-[130px] bg-[transparent] text-end text-[white] text-[32px]  medium'/>
                    </div>
                </div>
            </div>
            <input placeholder='Enter Base Address' value={evmWallet} onChange={(e)=>{
                setEvmWallet(e?.target?.value)
            }}  className='w-[100%] text-[14px] text-[white] medium my-[24px] p-[12px] rounded-[12px] bg-[transparent] border border-[#1E3A5F]'/>
            {quote?.err && <div className='w-[100%] flex bg-[red] flex-row items-center my-[16px] rounded-[12px] p-[12px] justify-start'>
            <p className='text-[14px] text-[white] semiBold '>{quote.err}</p>
            </div>}
            {quote?.notFound && <div className='w-[100%] flex bg-[red] flex-row items-center my-[16px] rounded-[12px] p-[12px] justify-start'>
            <p className='text-[18px] text-[white] semiBold '>No Quotes Found</p>
            </div>}
            {(!quote?.err && quote) && <div className='w-[100%] flex flex-col items-start justify-start '>
            <div className='w-[100%] flex flex-row mb-[8px] items-center justify-between'>
            <p className='text-[white] text-[16px] medium'>Provider</p>
            <p className='text-[white] text-[16px] medium'>{quote?.exchangeInfo?.keyword}</p>    
            </div>   
            <div className='w-[100%] flex flex-row mb-[8px] items-center justify-between'>
            <p className='text-[white] text-[16px] medium'>Time</p>
            <p className='text-[white] text-[16px] medium'>{Math.floor(quote?.estTimeInSeconds?.avg/60)} minutes</p>    
            </div>  
            <div className='w-[100%] flex flex-row mb-[8px] items-center justify-between'>
            <p className='text-[white] text-[16px] medium'>Total Fee USD</p>
            <p className='text-[white] text-[16px] medium'>{quote?.additionalInfo?.totalFeeUsd?.toFixed(5)}</p>    
            </div>
            <div className='w-[100%] flex flex-row mb-[8px] items-center justify-between'>
            <p className='text-[white] text-[16px] medium'>Total Saving USD</p>
            <p style={{color:quote?.additionalInfo?.savingUsd>0?'lightgreen':'red'}} className='text-[white] text-[16px] medium'>{quote?.additionalInfo?.savingUsd?.toFixed(5)}</p>    
            </div>    
            </div>}
        </div>
        {tokenOne &&  <TokenSelectComponent tokenList={fromTokens} setToken={setSrcToken} isOpen={tokenOne} setIsOpen={setTokenOne}/>}
       {tokenTwo &&   <TokenSelectComponent tokenList={toTokens} setToken={setDestToken} isOpen={tokenTwo} setIsOpen={setTokenTwo}/>}
       
      </div>
      <div className={`fixed ${false?'bottom-[0px]':'bottom-[30px]'} max-w-md w-[100%] flex items-center justify-center `}>
        
          
          
          <button onClick={()=>{
            if(quote && evmWalletRegex.test(evmWallet)){
                toast('Fetching Transaction Data')
                executeSwap()
            }
            else{
                if(!evmWalletRegex.test(evmWallet)){
                    toast.error('Invalid Base Address')
                }
                else{

                }
            }
            //onClick()
          }} className=" press-effect sm:min-w-[300px] w-[90%] bg-[#B8E6EE] h-[56px] rounded-[32px] flex items-center justify-center bold text-[18px] text-[#00191D] animate-slide-in-bottom">
            Continue
          </button>
         
         
        </div>
*/}