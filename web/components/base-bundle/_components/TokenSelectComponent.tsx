'use client'
import { useAccountContext } from '@/components/context/accountContext';
import { useTransactionContext } from '@/components/context/transactionContext';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
/*@ts-ignore */
const SwipeableBottomSheet:any = dynamic(() => import('react-swipeable-bottom-sheet'), {
  ssr: false,
});
import { LazyLoadImage } from 'react-lazy-load-image-component';

import placeholder from '../../../app/assets/place.png'

interface BottomSheet{
    isOpen:boolean,
    setIsOpen:Function,
    tokenList:any,
    setToken:Function,
    token:any
}
//https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6JdcMdhqgCtcP4U9tieRqmKLhPLxRMLC67QfmdXAJBvZ/logo.png




export function TokenSelectComponent({isOpen,setIsOpen,tokenList,setToken,token}:BottomSheet) {

  //console.log(coinData)
  return (
    <SwipeableBottomSheet
      overflowHeight={0}
      open={isOpen}
      marginTop={120}
      fullScreen={true}
      bodyStyle={{backgroundColor:'#00191D',borderRadius:32,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',maxWidth:430,}}
      style={{zIndex:10,backgroundColor:'#00191D',borderRadius:32,display:'flex',flexDirection:'column-reverse',alignItems:'center',justifyContent:'flex-end'}}
      onChange={() => setIsOpen(!isOpen)}
    >
      <div className='bg-[#00191D] sm:w-[430px] w-screen min-h-[100%] rounded-t-[32px] pt-[12px] px-[24px] flex flex-col items-center justify-start'>
        <div className='w-[100%] flex flex-row mb-[20px] items-center justify-between'>
            <p style={{lineHeight:'32px'}} className='bold text-[22px] text-[#B8E6EE]'>Select Token</p>
            <button onClick={()=>{
                setIsOpen(false)
            }} className='medium text-[17px] text-[#B8E6EE]'>Close</button>
        </div>
        {[...tokenList].map((item:any,index:any)=>(
          <button onClick={()=>{
            setToken([...token,item])
            setIsOpen(false)
          }} className='w-[100%] my-[8px] flex flex-row items-start justify-between'>
            <div className='flex flex-row items-center justify-start'>
            <img className='w-[36px] h-[36px] rounded-full mr-[12px]' src={item?.logo || item?.thumbnail}/>
            <div className='flex flex-col items-start justify-start'>
            <p className='regular text-[white] text-[16px] '>{item?.name}</p>
            <p className='regular text-[white] text-[12px] '>{item?.symbol}</p>
            </div>
           
            </div>
            <p className='regular text-[white] text-[16px] '>{item?.balance/10**item?.decimals}</p>
           
          </button>
        ))}
      </div>
    </SwipeableBottomSheet>
  );
}

