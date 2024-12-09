'use client'

import { useAccountContext } from '@/components/context/accountContext';
import { useTransactionContext } from '@/components/context/transactionContext';
import { nFormatter } from '@/utils/numberUtils';
import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import InputContainer from './InputContainer';





export default function BottomButton({onClick}:any) {
 
  
  const {selectedCoin,amount,walletAddress}:any=useAccountContext();
  const [inputMode,setInputMode]:any=useState(false)

  const onHide=()=>{
    setInputMode(false)
  }

  useEffect(()=>{
    if(selectedCoin){
      setInputMode(true)
    }
  },[selectedCoin])

  return (
    <div className={`fixed ${inputMode?'bottom-[0px]':'bottom-[22px]'} ${inputMode?'sm:max-w-md w-screen self-center':'w-[100%] self-center'} flex items-center justify-center `}>
          {inputMode?<InputContainer onHide={onHide} />: <>
          
          {selectedCoin?<button onClick={()=>{
            //onClick()
            setInputMode(true)
          }} className="bg-[#00191D] press-effect max-w-md min-w-[360px] h-[72px] px-[16px] py-[12px] rounded-[32px] flex items-center justify-between ">
            <img src={selectedCoin?.image} className={'w-[48px] h-[48px] rounded-[48px] border border-[1px] border-[#B8E6EE]'}/>
            <p style={{lineHeight:'38px'}} className={'bold text-[32px] text-[#B8E6EE]'}>{nFormatter(amount)}</p>
            <p onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              onClick()
            }} className={'medium text-[16px] text-[rgba(37,179,204)]'}>Change</p>
          </button>:
          <button onClick={()=>{
            onClick()
          }} className="bg-[#00191D] press-effect min-w-[300px] h-[56px] rounded-[32px] flex items-center justify-center bold text-[#B8E6EE] animate-slide-in-bottom">
            Choose a Shit Coin
          </button>}
          </>}
         
        </div>
     
  )
}
