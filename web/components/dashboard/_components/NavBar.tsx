'use client'
import React from 'react'
import settings from '../../../app/assets/settings.svg';
import { WalletButton,DisconnectButton } from '@/components/solana/solana-provider';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const {publicKey}=useWallet();
  function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
const router =useRouter();
  return (
    <div className={`navbar w-[100%] top-0 fixed max-w-md w-[100%] flex justify-between px-[16px]`}>
          <img onClick={()=>{
            router.push('/leaderboard')
          }} src={settings.src} className="animate-slide-in-left" />
          <button style={{zIndex:1}} className='border ml-[50px] border-[rgba(37,179,204)] border-[1px] py-[8px] px-[16px] rounded-[32px] h-[48px] bg-[#00000052]'>
            <p className='fontBold text-[22px] bold text-[#B8E6EE]'>267.3 M</p>
          </button>
          {publicKey? <div className="flex-none space-x-2 relative animate-slide-in-right">
           <div className='fontBold text-[17px] bold text-[#B8E6EE]'>Disconnect</div>
            <div className='opacity-0 scale-x-50 absolute'>
              <DisconnectButton />
            </div>
          </div> : <div className="flex-none space-x-2 relative animate-slide-in-right">
           <div className='fontBold text-[17px] bold text-[#B8E6EE]'>Connect</div>
            <div className='opacity-0 absolute'>
              <WalletButton />
            </div>
          </div>}
         
        </div>
  )
}
