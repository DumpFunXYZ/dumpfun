import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect } from 'react'
import logo from '../../../app/assets/logo.svg'

export default function Launch({setLoaded}:any) {
  const {publicKey}=useWallet();

  useEffect(()=>{
    if(publicKey?.toString()){
      setLoaded(true)
    }
  },[publicKey])

  return (
    <div className='bg-[#00191D] relative flex flex-col items-center justify-center h-screen max-w-md w-[100%] pb-[50px]'>
        <img  src={logo.src}/>
        <p style={{lineHeight:'32px'}} className='regular text-[22px] mt-[20px] text-[#B8E6EE] text-center max-w-[300px]'> A place where you dump your shit coins</p>
        <div className={`fixed max-w-md w-[100%] bottom-[24px] flex items-center justify-center`}>
          <button onClick={()=>{
            setLoaded(true)
          }} style={{lineHeight:'32px'}} className='bg-[#42919E] rounded-[32px] h-[56px] w-[300px] flex items-center justify-center text-[#00191D] text-[22px] semiBold'>Start Dumping</button>
        </div>
    </div>
  )
}
