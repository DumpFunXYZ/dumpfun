'use client'
import { useAccountContext } from '@/components/context/accountContext';
import { useEffect, useState } from 'react';
import CoinLogo from '../../../app/assets/coin-logo.svg'
import SolanaLogo from '../../../app/assets/solana.svg'
import dynamic from 'next/dynamic';
/*@ts-ignore */
const SwipeableBottomSheet:any = dynamic(() => import('react-swipeable-bottom-sheet'), {
  ssr: false,
});
import { useTransactionContext } from '@/components/context/transactionContext';

interface BottomSheet{
  type:String,
    isOpen:boolean,
    setIsOpen:Function
}
//https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6JdcMdhqgCtcP4U9tieRqmKLhPLxRMLC67QfmdXAJBvZ/logo.png




export function SuccessSheet({type,isOpen,setIsOpen}:BottomSheet) {
  const {coinData,setSelectedCoin,selectedCoin,amount,burntToken}:any=useAccountContext();
  const {earnedSolana,earnedPoints,hash,setHash,success}:any=useTransactionContext()
  useEffect(()=>{
    if(success){
      setHash('')
    }
  },[success])
  return (
    <SwipeableBottomSheet
      overflowHeight={60}
      open={isOpen}
      marginTop={120}
      fullScreen={false}
      bodyStyle={{backgroundColor:'#00191D',borderRadius:32,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',maxWidth:430,}}
      style={{zIndex:10,backgroundColor:'#00191D',borderRadius:32,display:'flex',flexDirection:'column-reverse',alignItems:'center',justifyContent:'flex-end'}}
      onChange={() => setIsOpen(!isOpen)}
    >
      <div className='bg-[#00191D] sm:min-w-[430px] w-screen min-h-[100%] rounded-t-[32px] pt-[12px] px-[24px] flex flex-col items-center justify-start'>
        <p style={{lineHeight:'32px'}} className='bold text-[22px] text-[#B8E6EE]'>🎉 Congratulations</p>
        <div className='w-[100%] py-[24px] flex flex-col items-center justify-center'>
            <p style={{lineHeight:'24px'}} className='text-[#B8E6EE] text-[17px] regular'>You've just earned</p>
            <p style={{lineHeight:'32px'}} className='text-[#B8E6EE] text-[22px] flex flex-row items-center justify-center semiBold m-[8px]'>{earnedPoints?.toFixed(2)} <img className='ml-[8px] w-[24px] h-[24px]' src={CoinLogo.src}/></p>
            <p style={{lineHeight:'24px'}} className='text-[#B8E6EE] text-[17px] regular mb-[20px]'>Dump Points</p>
            {earnedSolana>0 && <>
              <p style={{lineHeight:'32px'}} className='text-[#B8E6EE] text-[22px] flex flex-row items-center justify-center semiBold m-[8px]'>{earnedSolana} <img className='ml-[8px] w-[24px] h-[24px]' src={SolanaLogo.src}/></p>
            <p style={{lineHeight:'24px'}} className='text-[#B8E6EE] text-[17px] regular'>Solana</p>
            </>}
            
            <button onClick={()=>{
              if(typeof window!=='undefined'){
                let content = type=='Close'?`Just closed unwanted memecoins acccounts on @dumpfunxyz !! %0A%0A To flush is to burn 🔥 and to burn is to earn! %0A%0AEarn $DUMP by flushing your bad trades down the toilet 🚽 . %0A%0AStart accumulating points today on https://dumpfun.xyz/app! `:`Just flushed ${burntToken?.amount} ${burntToken?.name} on @dumpfunxyz !! %0A%0A To flush is to burn 🔥 and to burn is to earn! %0A%0AEarn $DUMP by flushing your bad trades down the toilet 🚽 . %0A%0AStart accumulating points today on https://dumpfun.xyz/app! `
                window?.open(`https://x.com/intent/tweet?text=${content}`, '_blank')
               }
                
            }} style={{lineHeight:'32px'}} className='mt-[60px] press-effect mb-[20px] w-[300px] h-[56px] bg-[#42919E] rounded-[32px] bold text-[22px] text-[white]'>Share</button>
            <button onClick={()=>{
              setIsOpen(false)
            }} style={{lineHeight:'24px'}} className='text-[#fff] text-[17px] mb-[64px] regular underline'>Done</button>
        </div>
      </div>
    </SwipeableBottomSheet>
  );
}
