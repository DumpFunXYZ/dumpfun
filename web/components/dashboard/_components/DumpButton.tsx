'use client'

import { useAccountContext } from '@/components/context/accountContext';
import { useTransactionContext } from '@/components/context/transactionContext';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import button from '../../../app/assets/button.svg'
import pressed from '../../../app/assets/pressed-button.svg'
import Popup from './AlertPopup';

export function DumpButton({onDefaultClick}:any) {
  const [isPressed, setIsPressed] = useState(false);
  const {onDumpClicked,animationDone}:any=useTransactionContext()
  const [walletOpen,setWalletOpen]:any=useState(false)
  const {selectedCoin,walletAddress}:any=useAccountContext()
  let audio = new Audio("https://firebasestorage.googleapis.com/v0/b/enclave-74f51.appspot.com/o/product%2Fflush.mp3?alt=media&token=75b2eed4-97de-47b8-a8ed-833395709be7")

  return (
    <div style={{zIndex:!selectedCoin?10:animationDone?10:1}} className='absolute -top-6'>
    <button
    onClick={()=>{
      if(!walletAddress){
setWalletOpen(true)
      }
      else{
        if(!selectedCoin){
          toast('Choose a Shitcoin')
          onDefaultClick()
          
          //setInputMode(true)
        }
        else{
          setIsPressed(true)
          setTimeout(()=>{
              setIsPressed(false)
          },200)
          onDumpClicked(()=>audio.play())
        }
      }
     
        
    }}
    >
    <img src={isPressed ? pressed.src :button.src} className={'w-[100%] sm:scale-x-110 scale-x-110'} alt="Pressed Image" />
    </button>
    <Popup  isOpen={walletOpen} onClose={()=>{
          setWalletOpen(false)
         }}/>
       
    </div>
  );
}
