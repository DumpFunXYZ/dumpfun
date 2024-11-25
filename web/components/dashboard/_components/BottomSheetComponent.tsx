'use client'
import { useAccountContext } from '@/components/context/accountContext';
import { useTransactionContext } from '@/components/context/transactionContext';
import { useEffect, useState } from 'react';
/*@ts-ignore */
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import placeholder from '../../../app/assets/place.png'

interface BottomSheet{
    isOpen:boolean,
    setIsOpen:Function
}
//https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6JdcMdhqgCtcP4U9tieRqmKLhPLxRMLC67QfmdXAJBvZ/logo.png




export function BottomSheetComponent({isOpen,setIsOpen}:BottomSheet) {
  const {coinData,setSelectedCoin,nftData,setAmount}:any=useAccountContext();
  const {numberEntered}:any=useTransactionContext()
  const [type,setType]=useState('Tokens')
  const types=['Tokens','NFTs']
  //console.log(coinData)
  return (
    <SwipeableBottomSheet
      overflowHeight={20}
      open={isOpen}
      marginTop={120}
      fullScreen={true}
      bodyStyle={{backgroundColor:'#00191D',borderRadius:32,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',maxWidth:430,}}
      style={{zIndex:10,backgroundColor:'#00191D',borderRadius:32,display:'flex',flexDirection:'column-reverse',alignItems:'center',justifyContent:'flex-end'}}
      onChange={() => setIsOpen(!isOpen)}
    >
      <div className='bg-[#00191D] sm:w-[430px] w-screen min-h-[100%] rounded-t-[32px] pt-[12px] px-[24px] flex flex-col items-center justify-start'>
        <div className='w-[100%] flex flex-row items-center justify-between'>
            <p style={{lineHeight:'32px'}} className='bold text-[22px] text-[#B8E6EE]'>Your Wallet</p>
            <button onClick={()=>{
                setIsOpen(false)
            }} className='medium text-[17px] text-[#B8E6EE]'>Close</button>
        </div>
        <div className='flex my-[24px] flex-row items-center justify-start w-[100%]'>
        {types.map((item:any,index:any)=>(
        <button key={index} onClick={()=>{
          setType(item)
        }} className={` px-[12px]  py-[6px] flex flex-row max-w-[150px] items-center mr-[8px] bg-[#00191D] rounded-[12px] justify-center border border-[rgba(45,45,50)] ${type==item?'bg-[#42919E]':'bg-[transparent]'}`}>
          <p className="bold text-[20px] text-[white]">{item}</p>
        </button>
      ))}
</div>
{type=='Tokens' && <>

{[...coinData].map((item:any,index:any)=>(
            <button 
            key={item?.id}
            onClick={()=>{
              setSelectedCoin(item)
              if(item?.type=='nft'){
                setAmount(1);
                //numberEntered(true)
              }
              setIsOpen(false)
            }}
            className='py-[16px] w-[100%] flex flex-row items-center justify-start'>
                {item?.image?
                
                <LazyLoadImage
        key={item?.id}
        alt={'Image'}
        height={48}
        onError={({ currentTarget }) => {
          console.log('Err',currentTarget)
          currentTarget.onerror = null; // prevents looping
          currentTarget.src= item?.type=='nft'?placeholder.src:"https://firebasestorage.googleapis.com/v0/b/dump-fun.appspot.com/o/shitcoin.png?alt=media&token=dea26698-2996-41cd-8a1b-9e11b9c7e97e";
        }}
        className={'rounded-full'}
        src={item?.image}
        placeholderSrc={item?.type=='nft'?placeholder.src:'https://firebasestorage.googleapis.com/v0/b/dump-fun.appspot.com/o/shitcoin.png?alt=media&token=dea26698-2996-41cd-8a1b-9e11b9c7e97e'}
        width={48} />
                
               :<img src={"https://firebasestorage.googleapis.com/v0/b/dump-fun.appspot.com/o/shitcoin.png?alt=media&token=dea26698-2996-41cd-8a1b-9e11b9c7e97e"}
                
                
                className={'w-[48px] h-[48px] border border-[#B8E6EE] border-[1px] rounded-[32px]'} />}
                
                <div className='ml-[12px] flex flex-col items-start justify-start'>
                    <p style={{lineHeight:'24px'}} className='text-[#B8E6EE] medium text-[17px]'>{ item?.type=='nft'? item?.name :item?.symbol || 'SH!T COIN'}</p>
                    <p style={{lineHeight:'24px'}} className='text-[#42919E] medium text-[17px] mt-[4px]'>{item?.formatted}</p>
                </div>
            </button>
        ))}</>}
        {type=='NFTs' && <>
        {[...nftData].map((item:any,index:any)=>(
            <button 
            key={item?.id}
            onClick={()=>{
              setSelectedCoin(item)
              if(item?.type=='nft'){
                setAmount(1);
                //numberEntered(true)
              }
              setIsOpen(false)
            }}
            className='py-[16px] w-[100%] flex flex-row items-center justify-start'>
                {item?.image?
                
                <LazyLoadImage
        key={item?.id}
        alt={'Image'}
        height={48}
        onError={({ currentTarget }) => {
          console.log('Err',currentTarget)
          currentTarget.onerror = null; // prevents looping
          currentTarget.src= item?.type=='nft'?placeholder.src:"https://firebasestorage.googleapis.com/v0/b/dump-fun.appspot.com/o/shitcoin.png?alt=media&token=dea26698-2996-41cd-8a1b-9e11b9c7e97e";
        }}
        className={'rounded-full'}
        src={item?.image}
        placeholderSrc={item?.type=='nft'?placeholder.src:'https://firebasestorage.googleapis.com/v0/b/dump-fun.appspot.com/o/shitcoin.png?alt=media&token=dea26698-2996-41cd-8a1b-9e11b9c7e97e'}
        width={48} />
                
               :<img src={"https://firebasestorage.googleapis.com/v0/b/dump-fun.appspot.com/o/shitcoin.png?alt=media&token=dea26698-2996-41cd-8a1b-9e11b9c7e97e"}
                
                
                className={'w-[48px] h-[48px] border border-[#B8E6EE] border-[1px] rounded-[32px]'} />}
                
                <div className='ml-[12px] flex flex-col items-start justify-start'>
                    <p style={{lineHeight:'24px'}} className='text-[#B8E6EE] medium text-[17px]'>{ item?.type=='nft'? item?.name :item?.symbol || 'SH!T COIN'}</p>
                    <p style={{lineHeight:'24px'}} className='text-[#42919E] medium text-[17px] mt-[4px]'>{item?.formatted}</p>
                </div>
            </button>
        ))}
        </>}
        
      </div>
    </SwipeableBottomSheet>
  );
}

