'use client'
import React, { useState } from 'react'

import { useRouter } from 'next/navigation';
import down from '../../app/assets/down.svg'
import close from '../../app/assets/close.svg'
import swap from '../../app/assets/swap.svg'
import { TokenSelectComponent } from './_components/TokenSelectComponent';
import useBaseBundle from './_hooks/useBaseBundle';
import { nFormatter } from '@/utils/numberUtils';
import { useAccount } from 'wagmi';
import { useWeb3Modal, Web3Button } from '@web3modal/react';

const evmWalletRegex = /^0x[a-fA-F0-9]{40}$/;


export default function BaseChainSwap() {
    const [tokenOne,setTokenOne]=useState(false)
    const {address}=useAccount();
    const {open}=useWeb3Modal();
    //const [tokenTwo,setTokenTwo]=useState(false);
    const {fromChain,toChain,fromTokens,toTokens,srcToken,destToken,quote,setSrcToken,setDestToken,amount,setAmount,evmWallet,setEvmWallet,executeSwap,srcTokens,setSrcTokens,fetchQuotes,loading,fetchTransactionData,onApproveClicked,transactionData}:any=useBaseBundle()
    //console.log(fromTokens)
    const router=useRouter();
    let dstToken={
        token_name:'ETH',
        token_symbol:'ETH',
        token_logoUri:'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880'
    }

    const onDelete=(address:any)=>{
        const data=[...srcTokens];
        const filter=[...data]?.filter((item,index)=>{
            return item?.token_address!==address
        })
        setSrcTokens(filter)
    }
    
    const updateAmount = (index: number, newBalance: string) => {
        setSrcTokens((prevTokens:any) =>
            prevTokens.map((token:any, i:any) =>
                i === index
                    ? { ...token, balance: (parseFloat(newBalance) * (10 ** token.decimals))?.toString() }
                    : token
            )
        );
    };

  return (
    <div className='w-[100%] flex flex-col items-center justify-start'>
    <div className=" h-full flex relative sm:max-w-md w-screen px-[12px] pt-[40px]  h-screen overflow-y-hidden w-[100%] w-full bg-[#00191D] flex-col items-center justify-start">
          <p className='w-[100%] text-[20px] text-center bold text-[white]'>Swap it all</p>
          <div className='w-[100%] flex flex-col items-center justify-center my-[40px]'>
              <div className='w-[100%] flex flex-col rounded-[20px] p-[16px] border border-[rgba(255,255,255,0.3)] items-start justify-start'>
                  
                  {srcTokens.map((item:any,index:any)=>(
                         <div className='w-[100%] flex flex-row my-[4px] items-center justify-between'>
                      

                         <button onClick={()=>{
onDelete(item?.token_address)
                         }} className='flex flex-row items-center justify-start'>
                             {item?.logo ? <img className='w-[24px] h-[24px] rounded-full' src={item?.logo} /> : <div className='w-[24px] h-[24px] rounded-full bg-[grey]' />}
                             <p className='text-[white] medium text-[white] mx-[12px]'>{item?.symbol || 'ADD TOKEN'}</p>
                             <img className='opacity-50 h-[20px] w-[20px]'  src={close.src} />
                         </button>
                           <div className='flex flex-row items-center justify-end'>
                               <input 
                                value={(((item.balance) / (10 ** item.decimals))?.toFixed(3)).toString()}
                                onChange={(e) => updateAmount(index, e.target.value)}
                               className='h-[32px] w-[130px] bg-[transparent] text-end text-[white] text-[16px]  medium' />
                                 <p className='text-[white] medium text-[white] opacity-50 ml-[12px]'>${nFormatter(((item.balance) / (10 ** item.decimals)*item?.usd_price)?.toFixed(3)) || 0}</p>
                           </div>
                       </div>
                        ))}
                        {srcTokens.length<6 && <button onClick={() => { setTokenOne(true); } } className='flex my-[4px] flex-row items-center justify-start'>
                        <div className='w-[24px] h-[24px] rounded-full bg-[grey]' />
  
                          <p className='text-[white] medium text-[white] ml-[12px]'>{'ADD TOKEN'}</p>
                          <img src={down.src} />
                      </button>}

                 
              </div>
              <div className='my-[20px] w-[100%] flex items-center justify-center'>
                  <img className='h-[36px] w-[36px]' src={swap.src} />
              </div>
              <div className='w-[100%] flex flex-col rounded-[20px] p-[16px] border border-[rgba(255,255,255,0.3)] items-start justify-start'>
                  
                  <div className='w-[100%] flex flex-row items-center justify-between'>
                      <button onClick={() => {

                      } } className='flex flex-row items-center justify-start'>
                          {dstToken?.token_logoUri ? <img className='w-[24px] h-[24px] rounded-full' src={dstToken?.token_logoUri} /> : <div className='w-[24px] h-[24px] rounded-full bg-[grey]' />}

                          <p className='text-[white] medium text-[white] ml-[12px]'>{dstToken?.token_name || 'SELECT'}</p>
                          {/* <img src={down.src} /> */}
                      </button>
                      <div className=' flex flex-row items-center justify-start'>
                          <input disabled value={((quote?.outAmounts?.[0]/10**18) || 0)?.toFixed(4) || 0} onChange={(e) => {
                              //setAmount(e?.target?.value)
                          } } className='h-[32px] w-[130px] bg-[transparent] overflow-hidden text-end text-[white] text-[24px]  medium' />
                          <p className='text-[white] medium text-[white] ml-[12px]'>$ {quote?.outValues?.[0]?.toFixed(3)}</p>
                      </div>
                  </div>
              </div>
              {quote?.err && <div className='w-[100%] flex bg-[red] flex-row items-center my-[16px] rounded-[12px] p-[12px] justify-start'>
                  <p className='text-[14px] text-[white] semiBold '>{quote.err}</p>
              </div>}
              {quote?.notFound && <div className='w-[100%] flex bg-[red] flex-row items-center my-[16px] rounded-[12px] p-[12px] justify-start'>
                  <p className='text-[18px] text-[white] semiBold '>No Quotes Found</p>
              </div>}
              {(!quote?.err && quote) && <div className='w-[100%] mt-[16px] px-[12px] flex flex-col items-start justify-start '>
                  <div className='w-[100%] flex flex-row mb-[8px] items-center justify-between'>
                      <p className='text-[white] text-[16px] medium'>USD Difference</p>
                      <p className='text-[white] text-[16px] medium'>{quote?.percentDiff}</p>
                  </div>
                  <div className='w-[100%] flex flex-row mb-[8px] items-center justify-between'>
                      <p className='text-[white] text-[16px] medium'>Price Impacet</p>
                      <p className='text-[white] text-[16px] medium'>{quote?.priceImpact}</p>
                  </div>
                  <div className='w-[100%] flex flex-row mb-[8px] items-center justify-between'>
                      <p className='text-[white] text-[16px] medium'>Total Fee USD</p>
                      <p className='text-[white] text-[16px] medium'>{quote?.gasEstimateValue?.toFixed(5)}</p>
                  </div>
                  {/* <div className='w-[100%] flex flex-row mb-[8px] items-center justify-between'>
                      <p className='text-[white] text-[16px] medium'>Total Saving USD</p>
                      <p style={{ color: quote?.additionalInfo?.savingUsd > 0 ? 'lightgreen' : 'red' }} className='text-[white] text-[16px] medium'>{quote?.additionalInfo?.savingUsd?.toFixed(5)}</p>
                  </div> */}
              </div>}
          </div>
          {tokenOne && <TokenSelectComponent tokenList={fromTokens} token={srcTokens} setToken={setSrcTokens} isOpen={tokenOne} setIsOpen={setTokenOne} />}
          
      </div>
      {address?<div className={`fixed ${false ? 'bottom-[0px]' : 'bottom-[30px]'} max-w-md w-[100%] flex items-center justify-center `}>


{
    loading ?<button className=" press-effect sm:min-w-[300px] w-[90%] bg-[#B8E6EE] h-[56px] rounded-[32px] flex items-center justify-center bold text-[18px] text-[#00191D] animate-slide-in-bottom">
        
        <div role="status">
<svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
</div>

      </button>:<button onClick={() => {
if(quote){
    if(transactionData?.inputTokens){
        onApproveClicked()
    }
    else{
        fetchTransactionData()
    }
   
}
  //onClick()
} } className=" press-effect sm:min-w-[300px] w-[90%] bg-[#B8E6EE] h-[56px] rounded-[32px] flex items-center justify-center bold text-[18px] text-[#00191D] animate-slide-in-bottom">
 {transactionData.inputTokens?'Approve & Send':'Continue'} 
</button>
}



</div>:<div className={`fixed ${false ? 'bottom-[0px]' : 'bottom-[30px]'} max-w-md w-[100%] flex items-center justify-center `}>
<button onClick={() => {

  //onClick()
} } className=" press-effect sm:min-w-[300px] w-[90%] h-[56px] rounded-[32px] flex items-center justify-center bold text-[18px] text-[#00191D] animate-slide-in-bottom">
 <Web3Button/>
</button>
</div>}
      
          
          </div>
  )
}
{/*
 
*/}