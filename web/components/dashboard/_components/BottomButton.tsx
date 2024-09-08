import { useAccountContext } from '@/components/context/accountContext';
import { useTransactionContext } from '@/components/context/transactionContext';
import { nFormatter } from '@/utils/numberUtils';
import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import InputContainer from './InputContainer';

function useKeyboardStatus() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check if the screen height is significantly reduced (keyboard might be open)
      setIsKeyboardOpen(window.innerHeight < window.outerHeight - 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isKeyboardOpen;
}



export default function BottomButton({onClick}:any) {
  const {publicKey}=useWallet();
  
  const {selectedCoin,amount}:any=useAccountContext();
  const [inputMode,setInputMode]:any=useState(false)

  const onHide=()=>{
    setInputMode(false)
  }

  useEffect(()=>{
    if(selectedCoin){
      setInputMode(true)
    }
  },[selectedCoin])

  return (
    <div className={`fixed ${inputMode?'bottom-[0px]':'bottom-[22px]'} max-w-md w-[100%] flex items-center justify-center `}>
          {inputMode?<InputContainer onHide={onHide} />: <>
          
          {selectedCoin?<button onClick={()=>{
            //onClick()
            setInputMode(true)
          }} className="bg-[#00191D] press-effect min-w-[360px] h-[72px] px-[16px] py-[12px] rounded-[32px] flex items-center justify-between ">
            <img src={selectedCoin?.image} className={'w-[48px] h-[48px] rounded-[48px] border border-[1px] border-[#B8E6EE]'}/>
            <p style={{lineHeight:'38px'}} className={'bold text-[32px] text-[#B8E6EE]'}>{nFormatter(amount)}</p>
            <p onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              onClick()
            }} className={'medium text-[16px] text-[#42919E]'}>Change</p>
          </button>:
          <button onClick={()=>{
            onClick()
          }} className="bg-[#00191D] press-effect min-w-[300px] h-[56px] rounded-[32px] flex items-center justify-center bold text-[#B8E6EE] animate-slide-in-bottom">
            Choose a Shit Coin
          </button>}
          </>}
         
        </div>
     
  )
}
