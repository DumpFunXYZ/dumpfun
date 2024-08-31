'use client'
import React, { useState } from 'react';
import BottomButton from './_components/BottomButton';
import { BottomSheetComponent } from './_components/BottomSheetComponent';
import NavBar from './_components/NavBar';
import ToiletSeat from '../../app/assets/Toilet.png'
import { DumpButton } from './_components/DumpButton';
import FreefallAnimation from './Particles';


export default function Dashboard() {
  const [open,setOpen]=useState(false)
  const [visible,setVisible]=useState(false);
  return (
    <div className="w-screen flex items-center w-[100%] justify-center overflow-x-hidden overflow-y-hidden h-screen">
      
      <div className="h-full flex relative max-w-md w-[100%] self-center overflow-x-hidden overflow-y-hidden sm:pt-[30px] pt-[40px] w-full flex-col">
        <div className='absolute overflow-y-hidden w-[100%] h-[100%] top-0'>
        <div className='gradientOne w-[100%] h-[65%]'></div>
        <div className='gradientTwo w-[100%] h-[35%]'></div>
        </div>
        <NavBar/>
        <div className='w-[100%] h-[75%] mt-[30px] flex items-center justify-center relative'>
          <DumpButton/>
          <div className='w-[100%] h-[80%] absolute  -top-10 flex flex-col items-center justify-start'>
        
          
          <div className='w-[35%] h-[100%] rounded-b-[20px] '>
          <FreefallAnimation/>
          </div>
          </div>
          <img src={ToiletSeat.src} className={'h-[100%]'} />
        </div>
       {open && <BottomSheetComponent isOpen={open} setIsOpen={setOpen}/>}
        
        <BottomButton onClick={()=>{
           setOpen(true)
          
        }}/>
      </div>
    </div>
  );
}