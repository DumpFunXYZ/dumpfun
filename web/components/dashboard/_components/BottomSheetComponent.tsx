'use client'
import { useAccountContext } from '@/components/context/accountContext';
import { useEffect, useState } from 'react';
/*@ts-ignore */
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

interface BottomSheet{
    isOpen:boolean,
    setIsOpen:Function
}
//https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6JdcMdhqgCtcP4U9tieRqmKLhPLxRMLC67QfmdXAJBvZ/logo.png




export function BottomSheetComponent({isOpen,setIsOpen}:BottomSheet) {
  const {coinData,setSelectedCoin}:any=useAccountContext();
  //console.log(coinData)
  return (
    <SwipeableBottomSheet
      overflowHeight={60}
      open={isOpen}
      marginTop={120}
      fullScreen={true}
      bodyStyle={{backgroundColor:'#00191D',borderRadius:32,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',maxWidth:430,}}
      style={{zIndex:10,backgroundColor:'#00191D',borderRadius:32,display:'flex',flexDirection:'column-reverse',alignItems:'center',justifyContent:'flex-end'}}
      onChange={() => setIsOpen(!isOpen)}
    >
      <div className='bg-[#00191D] sm:w-[430px] w-screen min-h-[100%] rounded-t-[32px] pt-[12px] px-[24px] flex flex-col items-center justify-start'>
        <div className='w-[100%] flex flex-row items-center justify-between'>
            <p style={{lineHeight:'32px'}} className='bold text-[22px] text-[#B8E6EE]'>Your Wallet</p>
            <button onClick={()=>{
                setIsOpen(false)
            }} className='medium text-[17px] text-[#B8E6EE]'>Close</button>
        </div>
        {coinData.map((item:any,index:any)=>(
            <button 
            key={item?.id}
            onClick={()=>{
              setSelectedCoin(item)
              setIsOpen(false)
            }}
            className='py-[16px] w-[100%] flex flex-row items-center justify-start'>
                {item?.image?<img src={item?.image}
                onError={({ currentTarget }) => {
                  console.log('Err',currentTarget)
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="https://firebasestorage.googleapis.com/v0/b/dump-fun.appspot.com/o/shitcoin.png?alt=media&token=dea26698-2996-41cd-8a1b-9e11b9c7e97e";
                }}
                
                className={'w-[48px] h-[48px] border border-[#B8E6EE] border-[1px] rounded-[32px]'} />:<img src={"https://firebasestorage.googleapis.com/v0/b/dump-fun.appspot.com/o/shitcoin.png?alt=media&token=dea26698-2996-41cd-8a1b-9e11b9c7e97e"}
                
                
                className={'w-[48px] h-[48px] border border-[#B8E6EE] border-[1px] rounded-[32px]'} />}
                
                <div className='ml-[12px] flex flex-col items-start justify-start'>
                    <p style={{lineHeight:'24px'}} className='text-[#B8E6EE] medium text-[17px]'>{item?.symbol || 'SH!T COIN'}</p>
                    <p style={{lineHeight:'24px'}} className='text-[#42919E]medium text-[17px] mt-[4px]'>{item?.formatted}</p>
                </div>
            </button>
        ))}
      </div>
    </SwipeableBottomSheet>
  );
}
