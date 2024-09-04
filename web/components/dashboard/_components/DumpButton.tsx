import { useTransactionContext } from '@/components/context/transactionContext';
import React, { useState } from 'react';
import button from '../../../app/assets/button.svg'
import pressed from '../../../app/assets/pressed-button.svg'

export function DumpButton() {
  const [isPressed, setIsPressed] = useState(false);
  const {onDumpClicked,animationDone}:any=useTransactionContext()


  return (
    <div style={{zIndex:animationDone?10:1}} className='absolute -top-6'>
    <button
    onClick={()=>{
        setIsPressed(true)
        setTimeout(()=>{
            setIsPressed(false)
        },200)
        onDumpClicked()
    }}
    >
    <img src={isPressed ? pressed.src :button.src} className={'w-[100%] sm:scale-x-110 scale-x-110'} alt="Pressed Image" />
    </button>
    </div>
  );
}
