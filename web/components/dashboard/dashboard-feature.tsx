'use client'
import React, { useState } from 'react';
import BottomButton from './_components/BottomButton';
import { BottomSheetComponent } from './_components/BottomSheetComponent';
import NavBar from './_components/NavBar';

export default function Dashboard() {
  const [open,setOpen]=useState(false)
  const [visible,setVisible]=useState(false);
  return (
    <div className="w-screen flex items-center w-[100%] justify-center overflow-x-hidden h-screen">
      <div className="h-full flex relative max-w-md w-[100%] self-center overflow-x-hidden pt-[50px] w-full bg-[#4A767D] flex-col">
        <NavBar/>
       {open && <BottomSheetComponent isOpen={open} setIsOpen={setOpen}/>}
        
        <BottomButton onClick={()=>{
           setOpen(true)
          
        }}/>
      </div>
    </div>
  );
}