'use client'
import { useAccountContext } from '@/components/context/accountContext'
import { useTransactionContext } from '@/components/context/transactionContext';
import React, { useEffect, useRef } from 'react'

export default function InputContainer({onHide}:any) {
    const {amount,setAmount,selectedCoin}:any=useAccountContext();
    const {numberEntered,animationDone,onDumpClicked,animationStarted}:any=useTransactionContext();
    const ref:any=useRef();

    useEffect(()=>{
        if(ref){
            ref?.current?.focus()
        }
        
    },[])


  return (
    <div id='clickbox' className='bg-[#00191D] rounded-t-[32px] px-[24px] w-[100%]  flex flex-col items-center justify-center'>
        <div className='w-[100%] flex flex-row items-center justify-between py-[13px]'>
            <p style={{lineHeight:'32px'}} className='text-[22px] bold text-[#fff]'>Select Amount</p>
            <p onClick={()=>{
                onHide()
                numberEntered()
            }} style={{lineHeight:'22px'}} className='text-[17px] bold text-[#fff]'>Done</p>
        </div>
        <div className='w-[100%] flex flex-row items-center justify-between py-[13px]'>
            <div className='flex flex-row items-center w-[100%] justify-start'>
                <img src={selectedCoin?.image} className='w-[32px] h-[32px] rounded-[32px] border border-[1px] border-[#B8E6EE]'/>
                <p style={{lineHeight:'24px'}} className='text-[17px] regular ml-[12px] text-[rgba(37,179,204)]'>{selectedCoin?.symbol}</p>
            </div>
            <input ref={ref} value={amount} type={'number'} onChange={(e)=>{
                setAmount(e?.target?.value)
            }} style={{lineHeight:'38px'}} className='text-[32px] bg-[transparent] flex items-center justify-center text-center min-w-[130px] semiBold text-[#B8E6EE]'/>
            <div className='flex flex-row justify-end min-w-[100px] items-center'>
            <p onClick={()=>{
                setAmount(parseFloat(selectedCoin?.formatted?.toFixed(0)))
            }} style={{lineHeight:'24px'}} className='text-[17px]   regular text-[#B8E6EE]'>Max</p>
            </div>
        </div>
    </div>
  )
}
