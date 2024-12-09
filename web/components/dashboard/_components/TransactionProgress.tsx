'use client'
import { useAccountContext } from '@/components/context/accountContext';
import { useTransactionContext } from '@/components/context/transactionContext';

import dynamic from 'next/dynamic';
/*@ts-ignore */
const SwipeableBottomSheet:any = dynamic(() => import('react-swipeable-bottom-sheet'), {
  ssr: false,
});
import fire from '../../../app/assets/fire.gif'
import { nFormatter } from '@/utils/numberUtils';

interface BottomSheet{
  type:String,
    isOpen:boolean,
    setIsOpen:Function
}
//https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6JdcMdhqgCtcP4U9tieRqmKLhPLxRMLC67QfmdXAJBvZ/logo.png




export function TransactionProgress({type,isOpen,setIsOpen}:BottomSheet) {
  const {coinData,setSelectedCoin,nftData,setAmount,amount,selectedCoin}:any=useAccountContext();
  const {numberEntered,hash}:any=useTransactionContext()
  //console.log(coinData)
//   console.log(hash)
  return (
    <SwipeableBottomSheet
      overflowHeight={0}
      open={isOpen}
      marginTop={200}
      fullScreen={true}
      bodyStyle={{backgroundColor:'#00191D',borderRadius:32,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',maxWidth:430,}}
      style={{zIndex:10,backgroundColor:'#00191D',borderRadius:32,display:'flex',flexDirection:'column-reverse',alignItems:'center',justifyContent:'flex-end'}}
      onChange={() => setIsOpen(!isOpen)}
    >
      <div className='bg-[#00191D] sm:w-[430px] w-screen min-h-[100%] rounded-t-[32px] pt-[12px] px-[24px] flex flex-col items-center justify-start'>
        <div className='w-[100%] flex flex-row items-center justify-between'>
            <p style={{lineHeight:'32px'}} className='bold text-[22px] text-[#B8E6EE]'></p>
            <button onClick={()=>{
                setIsOpen(false)
            }} className='medium text-[17px] text-[#B8E6EE]'>Close</button>
        </div>
            <div className='flex flex-col items-center justify-start'>
            <img className='w-[200px] h-[200px]' src={fire.src}/>
            <p style={{lineHeight:'24px'}} className='bold text-[white] text-[18px] my-[14px]'>{type=='Close'?'Closing Accounts':'Burning Tokens'} </p>
            {hash && <button onClick={()=>{
              //setIsOpen(false)
              if(typeof window!=='undefined'){
              window?.open(`https://solscan.io/tx/${hash}`,'_blank')
              }
            }} style={{lineHeight:'24px'}} className='text-[#fff] text-[17px] mt-[64px] regular underline'>Check Transaction</button>}
            
            </div>
      </div>
    </SwipeableBottomSheet>
  );
}

