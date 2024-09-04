'use client'
import { useAccountContext } from '@/components/context/accountContext';
import { useEffect, useState } from 'react';
import CoinLogo from '../../../app/assets/coin-logo.svg'
/*@ts-ignore */
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

interface BottomSheet{
    isOpen:boolean,
    setIsOpen:Function
}
//https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6JdcMdhqgCtcP4U9tieRqmKLhPLxRMLC67QfmdXAJBvZ/logo.png




export function SuccessSheet({isOpen,setIsOpen}:BottomSheet) {
  const {coinData,setSelectedCoin}:any=useAccountContext();
  return (
    <SwipeableBottomSheet
      overflowHeight={60}
      open={isOpen}
      marginTop={120}
      fullScreen={false}
      bodyStyle={{backgroundColor:'transparent',borderRadius:32,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%'}}
      style={{zIndex:10,backgroundColor:'transparent',borderRadius:32,display:'flex',flexDirection:'column-reverse',alignItems:'center',justifyContent:'flex-end',width:'100%'}}
      onChange={() => setIsOpen(!isOpen)}
    >
      <div className='bg-[#00191D] sm:min-w-[430px] w-screen min-h-[100%] rounded-t-[32px] pt-[12px] px-[24px] flex flex-col items-center justify-start'>
        <p style={{lineHeight:'32px'}} className='bold text-[22px] text-[#B8E6EE]'>🎉 Congratulations</p>
        <div className='w-[100%] py-[24px] flex flex-col items-center justify-center'>
            <p style={{lineHeight:'24px'}} className='text-[#B8E6EE] text-[17px] regular'>You've just earned</p>
            <p style={{lineHeight:'32px'}} className='text-[#B8E6EE] text-[22px] flex flex-row items-center justify-center semiBold m-[8px]'>1,320 <img className='ml-[8px] w-[24px] h-[24px]' src={CoinLogo.src}/></p>
            <p style={{lineHeight:'24px'}} className='text-[#B8E6EE] text-[17px] regular'>Dump Coins</p>
            <button onClick={()=>{
                setIsOpen(false)
            }} style={{lineHeight:'32px'}} className='mt-[60px] press-effect mb-[64px] w-[300px] h-[56px] bg-[#42919E] rounded-[32px] bold text-[22px]'>OK</button>
        </div>
      </div>
    </SwipeableBottomSheet>
  );
}
