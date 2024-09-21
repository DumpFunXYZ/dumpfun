import React, { useEffect, useState } from 'react';
import { useAccountContext } from '../context/accountContext';
import { useTransactionContext } from '../context/transactionContext';
import Shitcoin from '../../app/assets/shitcoin.png'

const FreefallAnimation = () => {
  const [particles, setParticles]:any = useState([]);
  const {numberEntered,animationDone,onDumpClicked,animationStarted}:any=useTransactionContext();
  const {selectedCoin}:any=useAccountContext()
    const calculateLeft=()=>{
        let random=Math.random() * 100;
        //console.log(random)
        if(random>50){
            return random/2
        }
        else if(random<20){
            return random+20
        }
        else{
            return random
        }
    }

  useEffect(() => {
    const particleCount = 6
    const newParticles = Array.from({ length: particleCount }, (_, index) => ({
      id: index,
      left: `${calculateLeft()}%`,
      animationDuration: `${3 + Math.random() * 2}s`,
      animationDelay: `${Math.random() * 2}s`,

    }));
    setParticles(newParticles);
  }, []);
  //console.log(particles)

  return (
    <div onClick={(e)=>{
        e?.preventDefault()
    }} className="relative w-[100%] h-[100%] flex flex-col items-center overflow-hidden pr-[10px] mb-[10px]">
      {animationStarted && <>
     
     {!animationDone?<>
       {particles.map((particle:any) => (
       <img
       src={selectedCoin?.image || Shitcoin?.src}
         key={particle.id}
         className="absolute w-[48px] h-[48px] border-[1px] border border-[#B8E6EE] rounded-full bg-white animate-fall"
         style={{
           left: particle.left,
           animationDuration: particle.animationDuration,
           animationDelay: particle.animationDelay,
         }}
       />
     ))}
     </>:<div className=' mt-[120px] w-[100%] flex flex-col items-center bg-[red] justify-end'>
     <img
       src={selectedCoin?.image || Shitcoin?.src}
         
         className="absolute w-[48px] h-[48px] border-[1px] border border-[#B8E6EE] rounded-full bg-white bottom-0 "
       />
       <img
       src={selectedCoin?.image || Shitcoin?.src}
         
         className="absolute w-[48px] h-[48px] border-[1px] border border-[#B8E6EE] rounded-full bg-white bottom-1 right-1 "
       />
       <img
       src={selectedCoin?.image || Shitcoin?.src}
         
         className="absolute w-[48px] h-[48px] border-[1px] border border-[#B8E6EE] rounded-full bg-white bottom-4 right-1 "
       />
       <img
       src={selectedCoin?.image || Shitcoin?.src}
         
         className="absolute w-[48px] h-[48px] border-[1px] border border-[#B8E6EE] rounded-full bg-white bottom-4 left-1 "
       />
        <img
       src={selectedCoin?.image || Shitcoin?.src}
         
         className="absolute w-[48px] h-[48px] border-[1px] border border-[#B8E6EE] rounded-full bg-white bottom-6 "
       />
       <img
       src={selectedCoin?.image || Shitcoin?.src}
         
         className="absolute w-[48px] h-[48px] border-[1px] border border-[#B8E6EE] rounded-full bg-white bottom-1 left-1"
       />
       </div>} </>}
      
    </div>
  );
};

export default FreefallAnimation;