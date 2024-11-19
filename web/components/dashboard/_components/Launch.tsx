import { useGlobalContext } from '@/components/context/globalContext';
import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import logo from '../../../app/assets/logo.svg'

export default function Launch({setLoaded}:any) {
  const {walletAddress}:any=useGlobalContext();

  useEffect(()=>{
    if(walletAddress?.toString()){
      setLoaded(true)
    }
  },[walletAddress])


  return (
    <div className='bg-[#00191D] relative flex flex-col items-center justify-center h-screen max-w-md w-[100%] pb-[50px]'>
        <img  src={logo.src}/>
        <p style={{lineHeight:'32px'}} className='regular text-[22px] mt-[20px] text-[#B8E6EE] text-center max-w-[300px]'> A place where you dump your shit coins</p>
        <div className={`fixed max-w-md w-[100%] bottom-[24px] flex flex-col items-center justify-center`}>
          <button onClick={()=>{
            setLoaded(true)
          }} style={{lineHeight:'32px'}} className='bg-[rgba(37,179,204)] rounded-[32px] h-[56px] w-[300px] flex items-center justify-center text-[#00191D] text-[22px] semiBold'>Start Dumping</button>
          <p className='opacity-40 my-[12px] text-[white] italic text-[10px] text-center'>Disclaimer: This DApp is not intended for use by U.S. or Chinese citizens, or any individuals or entities sanctioned by the United Nations. Please ensure compliance with your local laws and regulations before using this platform.</p>
          
        </div>
    </div>
  )
}
