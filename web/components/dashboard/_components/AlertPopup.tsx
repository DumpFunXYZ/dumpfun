'use client'
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useWeb3Modal, Web3Button } from '@web3modal/react';
import SolanaLogo from '../../../app/assets/solana.svg'
import BaseLogo from '../../../app/assets/base.svg'
import { WalletButton,DisconnectButton } from '@/components/solana/solana-provider';
import { useAccountContext } from '@/components/context/accountContext';

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
};


const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {

  const {open}=useWeb3Modal();
  const {walletAddress}:any=useAccountContext()
  useEffect(()=>{
    if(walletAddress){
      onClose()
    }
  },[walletAddress])
  if (!isOpen) return null; // Do not render if popup is not open
  return (
    <div>
    
    <Modal 
    showCloseIcon={false}
    styles={{
      modal:{
        backgroundColor:`#0E1420`,
        borderColor:'#2A2F3A',
        width:340,
        height:200
      },
    }} classNames={{
          overlay: 'customOverlay',
          modal: 'customModal',
        }} open={isOpen} onClose={onClose} center>
     <div className='w-[100%] flex flex-col item-center justify-start p-[12px] h-[100%]'>
      <div className='flex w-[100%] flex-row items-center justify-between'>
      <p className='bold text-[20px] text-[white]'>Select Chain</p>
      <button onClick={()=>{
        onClose()
      }} className='medium opacity-40 hover:opacity-100 text-[12px] text-[white]'>Close</button>
      </div>
      <div className='flex flex-row items-center  mt-[32px] justify-start'>
      <div className="flex-none my-[12px] mr-[12px]  relative">
           <div onClick={()=>{
            //setOpen(true)
           }} className='fontBold text-[17px] bold text-[#B8E6EE]'><img className='w-[42px] h-[42px]' src={SolanaLogo.src}/></div>
            <div className='opacity-0 top-0 left-0 max-w-[30px]  absolute'>
              <WalletButton onClick={()=>{
                onClose()
              }} /> 
            </div>
          </div>
          <div className="flex-none my-[12px] mx-[12px]  relative">
           <button onClick={()=>{
            onClose()
            open()
           }} className='fontBold text-[17px] bold text-[#B8E6EE]'>
            <img className='ml-[8px] w-[42px] h-[42px]' src={BaseLogo.src}/>
           </button>
            
          </div>
          </div>
     </div>
    </Modal>
  </div>
  );
};

export default Popup;