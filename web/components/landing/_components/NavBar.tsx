'use client'

import React, { useState, useEffect } from "react";
import name from '../../../app/assets/name.svg' 
import document from '../../../app/assets/document.png' 

const NavbarLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(typeof window!=='undefined'){
        if (window?.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
      
    };

    window?.addEventListener("scroll", handleScroll);
    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 min-h-[60px] w-[100%] hidden md:block z-50 transition-all duration-300 flex flex-row items-center justify-start px-[48px] py-[12px] ease-in-out ${
        isScrolled
          ? "bg-[#00191D] bg-opacity-100 "
          : "bg-[#00191D] bg-opacity-80 backdrop-blur-lg"
      }`}
    >
        <div className="w-[100%] h-[100%] flex flex-row items-center justify-between">
     <img src={name.src}/>
     <div className="flex flex-row items-center justify-center gap-4">
     <button 
     onClick={()=>{
      if(typeof window != undefined){
        window.location.href='https://t.me/+WoPP-lH6JLhjY2E1'
      }
      
     }}
     className='mr-[12px]'>
                <img className='h-[32px] w-[32px] rounded-[32px]' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png'}/>
                
                </button> 
               
                <button onClick={()=>{
                  if(typeof window!=="undefined"){
                    window.location.href='https://x.com/dumpfunxyz'
                  }
               
               }}  className='ml-[12px]'>
                <img className='h-[32px] w-[32px] rounded-[32px]' src={'https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?t=st=1725384937~exp=1725388537~hmac=4b26865cae93f5da597999bbe16152c4f0e0c4fe800ade1d99c2083a78d39432&w=826'}/>
                </button> 
                <button onClick={()=>{
                  if(typeof window!=="undefined"){
                    window.location.href='https://dumpfun-docs.vercel.app/docs/welcome'
                  }
                   
                
               }}  className='ml-[12px]'>
                <img className='h-[32px] w-[32px] ' src={document.src}/>
                </button> 
                </div>
                </div>
    </nav>
  );
};

export default NavbarLanding;
