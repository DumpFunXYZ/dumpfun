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
import { TransactionProgress } from './_components/TransactionProgress';
import { useAccountContext } from '../context/accountContext';
import TabBar from './_components/TabBar';
import CloseAccount from './_components/CloseAccount';
import { SideSheetComponent } from './_components/Sidebar';


export default function Dashboard() {
  const [open,setOpen]=useState(false)
  const [visible,setVisible]=useState(false);
  const [loaded,setLoaded]=useState(false);
  const {success,setSuccess,loading,setLoading}:any=useTransactionContext();
  const {walletAddress,type,sideBarOpen,setSideBarOpen}:any=useAccountContext()


  return (
    <div className=" h-full flex max-w-screen h-screen overflow-y-hidden w-[100%] self-center w-full bg-[#00191D] flex-col items-center justify-center">
       <SideSheetComponent isOpen={sideBarOpen} setIsOpen={setSideBarOpen}/>
      {loaded?<>
      {type=='Flushit'?<div className="h-full sm:mt-0 mt-[70px] flex relative w-[100%] self-center overflow-x-hidden overflow-y-hidden pt-[15px] bg-[#00191D] w-full flex-col">
       <NavBar/>
      <TabBar/>
      <CloseAccount/>
      {success && <SuccessSheet type={'Close'} isOpen={success} setIsOpen={setSuccess}/>}
        {loading && <TransactionProgress type={'Close'} isOpen={loading} setIsOpen={setLoading}/>}
       
       
       
      
     </div>:<div className="h-full flex relative w-[100%] self-center overflow-x-hidden overflow-y-hidden pt-[15px] w-full flex-col">
        <div className='absolute overflow-y-hidden w-[100%] h-[100%] top-0'>
        <div className='gradientOne w-[100%] h-[70%]'></div>
        <div className='gradientTwo w-[100%] h-[30%]'></div>
        </div>
        <NavBar/>
       <TabBar/>
        <div className='w-[100%] h-[70%] mt-[100px] sm:mt-[50px] flex items-center  justify-center relative'>
        <DumpButton onDefaultClick={()=>{
setOpen(true)
        }}/>
         
          <div className='sm:max-w-md w-[100%] h-[80%] absolute  -top-10 flex flex-col items-center justify-start'>
        
          
          <div style={{zIndex:2}} className='w-[35%]  h-[100%] rounded-b-[20px] '>
          <FreefallAnimation/>
          </div>
          </div>
          <img src={ToiletSeat.src} className={'h-[100%] scale-x-110'} />
        </div>
       {open && <BottomSheetComponent isOpen={open} setIsOpen={setOpen}/>}
        {walletAddress && <BottomButton onClick={()=>{
           setOpen(true)
          
        }}/>}
        
        {success && <SuccessSheet type={'Burn'} isOpen={success} setIsOpen={setSuccess}/>}
        {loading && <TransactionProgress type={'Burn'} isOpen={loading} setIsOpen={setLoading}/>}
       
      </div>}
      </>:<Launch setLoaded={setLoaded}/>}
      
      
    </div>
  );
}