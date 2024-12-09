'use client'
import React, { useState } from 'react'

import DeBridgeWidget from './_components/Bridge';
import { useRouter } from 'next/navigation';
import down from '../../app/assets/down.svg'
import swap from '../../app/assets/swap.svg'
import useCrossChain from './_hooks/useCrossChain';
import { TokenSelectComponent } from './_components/TokenSelectComponent';

const evmWalletRegex = /^0x[a-fA-F0-9]{40}$/;


export default function BaseChainSwap() {
    const [tokenOne,setTokenOne]=useState(false)
    //const [tokenTwo,setTokenTwo]=useState(false);
    const {fromChain,toChain,fromTokens,toTokens,srcToken,destToken,quote,setSrcToken,setDestToken,amount,setAmount,evmWallet,setEvmWallet,executeSwap,srcTokens,setSrcTokens,fetchQuotes}:any=useCrossChain()
    //console.log(fromTokens)
    const router=useRouter();
    let dstToken={
        token_name:'ETH',
        token_symbol:'ETH',
        token_logoUri:'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880'
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
              <div className='w-[100%] flex flex-col rounded-[20px] p-[16px] bg-[#1E3A5F] items-start justify-start'>
                  
                  {srcTokens.map((item:any,index:any)=>(
                         <div className='w-[100%] flex flex-row my-[4px] items-center justify-between'>
                      

                         <button onClick={() => { setTokenOne(true); } } className='flex flex-row items-center justify-start'>
                             {item?.logo ? <img className='w-[24px] h-[24px] rounded-full' src={item?.logo} /> : <div className='w-[24px] h-[24px] rounded-full bg-[grey]' />}
                             <p className='text-[white] medium text-[white] ml-[12px]'>{item?.symbol || 'ADD TOKEN'}</p>
                                
                         </button>
                           <div className='flex flex-row items-center justify-end'>
                               <input 
                                value={(((item.balance) / (10 ** item.decimals))?.toFixed(3)).toString()}
                                onChange={(e) => updateAmount(index, e.target.value)}
                               className='h-[32px] w-[130px] bg-[transparent] text-end text-[white] text-[16px]  medium' />
                                 <p className='text-[white] medium text-[white] opacity-50 ml-[12px]'>$ {item?.usd_value?.toFixed(3) || 0}</p>
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
              <div className='w-[100%] flex flex-col rounded-[20px] p-[16px] bg-[#1E3A5F] items-start justify-start'>
                  
                  <div className='w-[100%] flex flex-row items-center justify-between'>
                      <button onClick={() => {

                      } } className='flex flex-row items-center justify-start'>
                          {dstToken?.token_logoUri ? <img className='w-[24px] h-[24px] rounded-full' src={dstToken?.token_logoUri} /> : <div className='w-[24px] h-[24px] rounded-full bg-[grey]' />}

                          <p className='text-[white] medium text-[white] ml-[12px]'>{dstToken?.token_name || 'SELECT'}</p>
                          {/* <img src={down.src} /> */}
                      </button>
                      <div className=' flex flex-row items-center justify-start'>
                          <input disabled value={(quote?.outAmounts?.[0]/10**18)?.toFixed(4) || 0} onChange={(e) => {
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
          
      </div><div className={`fixed ${false ? 'bottom-[0px]' : 'bottom-[30px]'} max-w-md w-[100%] flex items-center justify-center `}>



              <button onClick={() => {
                //   if (quote && evmWalletRegex.test(evmWallet)) {
                //       //toast('Fetching Transaction Data');
                //       executeSwap();
                //   }
                //   else {
                //       if (!evmWalletRegex.test(evmWallet)) {
                //           //toast.error('Invalid Base Address');
                //       }
                //       else {
                //       }
                //   }
                fetchQuotes()
                  //onClick()
              } } className=" press-effect sm:min-w-[300px] w-[90%] bg-[#B8E6EE] h-[56px] rounded-[32px] flex items-center justify-center bold text-[18px] text-[#00191D] animate-slide-in-bottom">
                  Continue
              </button>


          </div></div>
  )
}
{/*
 
*/}