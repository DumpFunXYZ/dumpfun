'use client'
import { useAccountContext } from '@/components/context/accountContext';
import { useState } from 'react';
import dynamic from 'next/dynamic';
/*@ts-ignore */
const SwipeableBottomSheet:any = dynamic(() => import('react-swipeable-bottom-sheet'), {
  ssr: false,
});
import Popup from './AlertPopup';


interface BottomSheet{
    isOpen:boolean,
    setIsOpen:Function
}
//https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6JdcMdhqgCtcP4U9tieRqmKLhPLxRMLC67QfmdXAJBvZ/logo.png




export function SideSheetComponent({isOpen,setIsOpen}:BottomSheet) {
    const {dumpTypes,setSideBarOpen,setType,walletAddress}:any=useAccountContext();
  //console.log(coinData)
  const [open,setOpen]=useState(false);
  return (
    <SwipeableBottomSheet
      overflowHeight={20}
      open={isOpen}
      marginTop={0}
      fullScreen={true}
      bodyStyle={{backgroundColor:'#000D0F',borderRadius:32,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',maxWidth:430,}}
      style={{zIndex:100,backgroundColor:'#000D0F',borderRadius:32,display:'flex',flexDirection:'column-reverse',alignItems:'center',justifyContent:'flex-end'}}
      onChange={() => setIsOpen(!isOpen)}
    >
      <div className='bg-[#000D0F] sm:w-[430px] w-screen min-h-[100%] rounded-t-[32px] pt-[12px] px-[24px] flex flex-col items-center justify-center'>
      {walletAddress? <div className="flex-none  space-x-2 relative ">
           <button onClick={()=>{
             //disconnect();
             localStorage.clear();
             if(typeof window!=='undefined'){
                window.location.reload()
             }
             
           }} className='fontBold text-[17px] bold text-[#B8E6EE]'>Disconnect</button>
            
          </div> : <div className="flex-none bg-[#42919E] press-effect p-[6px] rounded-full px-[12px] space-x-2 relative ">
           <button onClick={()=>{
            setOpen(true)
           }} className='fontBold text-[17px] medium text-[white]'>Connect Wallet</button>
            <div className='opacity-0 absolute'>
             
              </div>
              </div>}
              <Popup  isOpen={open} onClose={()=>{
              setOpen(false)
             }}/>
        <div className='my-[40px] w-[100%]'></div>
        {dumpTypes.map((item:any,index:any)=>(
            <button onClick={()=>{
                setType(item);
                setSideBarOpen(false);
            }} className='my-[24px] text-[#B8E6EE] medium text-[16px]'>{item}</button>
        ))}
        
      </div>
    </SwipeableBottomSheet>
  );
}

