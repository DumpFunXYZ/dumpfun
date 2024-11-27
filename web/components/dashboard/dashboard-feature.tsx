'use client'
import React, { useState } from 'react';
import BottomButton from './_components/BottomButton';
import { BottomSheetComponent } from './_components/BottomSheetComponent';
import NavBar from './_components/NavBar';
import ToiletSeat from '../../app/assets/Toilet.png'
import { DumpButton } from './_components/DumpButton';
import FreefallAnimation from './Particles';
import Launch from './_components/Launch';
import { useTransactionContext } from '../context/transactionContext';
import { SuccessSheet } from './_components/SuccessSheet';
import { useWallet } from '@solana/wallet-adapter-react';
import Loading from './_components/Loading';
import { WalletButton } from '../solana/solana-provider';
import { TransactionProgress } from './_components/TransactionProgress';
import Popup from './_components/AlertPopup';
import { useAccountContext } from '../context/accountContext';


export default function Dashboard() {
  const [open,setOpen]=useState(false)
  const [visible,setVisible]=useState(false);
  const [loaded,setLoaded]=useState(false);
  const {success,setSuccess,loading,setLoading}:any=useTransactionContext();
  const {walletAddress}:any=useAccountContext()


  return (
    <div className=" h-full flex max-w-screen h-screen overflow-y-hidden w-[100%] self-center w-full bg-[#00191D] flex-col items-center justify-center">
      {loaded?<div className="h-full flex relative max-w-md w-[100%] self-center overflow-x-hidden overflow-y-hidden pt-[15px] w-full flex-col">
        <div className='absolute overflow-y-hidden w-[100%] h-[100%] top-0'>
        <div className='gradientOne w-[100%] h-[65%]'></div>
        <div className='gradientTwo w-[100%] h-[35%]'></div>
        </div>
        <NavBar/>
        <div className='w-[100%] h-[75%] mt-[110px] flex items-center  justify-center relative'>
        <DumpButton onDefaultClick={()=>{
setOpen(true)
        }}/>
         
          <div className='w-[100%] h-[80%] absolute  -top-10 flex flex-col items-center justify-start'>
        
          
          <div style={{zIndex:2}} className='w-[35%] h-[100%] rounded-b-[20px] '>
          <FreefallAnimation/>
          </div>
          </div>
          <img src={ToiletSeat.src} className={'h-[100%] scale-x-110'} />
        </div>
       {open && <BottomSheetComponent isOpen={open} setIsOpen={setOpen}/>}
        {walletAddress && <BottomButton onClick={()=>{
           setOpen(true)
          
        }}/>}
        
        {success && <SuccessSheet isOpen={success} setIsOpen={setSuccess}/>}
        {loading && <TransactionProgress isOpen={loading} setIsOpen={setLoading}/>}
       
      </div>:<Launch setLoaded={setLoaded}/>}
      
      
    </div>
  );
}