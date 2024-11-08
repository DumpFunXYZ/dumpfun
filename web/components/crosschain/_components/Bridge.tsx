import React, { useEffect, useState } from 'react';

/*global deBridge*/

const DeBridgeWidget = () => {

  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])


    useEffect(() => {
      //if (document.getElementById('debridgeWidgetScript')) return;
      
      const initializeWidget=()=>{
        const config = {"v":"1","element":"debridgeWidget","title":"Cross Chain Liquidity","description":"","width":"100%","height":"800","r":null,"supportedChains":"{\"inputChains\":{\"8453\":\"all\",\"7565164\":\"all\"},\"outputChains\":{\"8453\":\"all\",\"7565164\":\"all\"}}","inputChain":7565164,"outputChain":8453,"inputCurrency":"","outputCurrency":"","address":"","showSwapTransfer":true,"amount":"","outputAmount":"","isAmountFromNotModifiable":false,"isAmountToNotModifiable":false,"lang":"en","mode":"deswap","isEnableCalldata":false,"styles":"eyJhcHBCYWNrZ3JvdW5kIjoiIzAwMTkxZCIsIm1vZGFsQmciOiIjMWUzYTVmIiwiZm9ybUNvbnRyb2xCZyI6IiMxZTNhNWYiLCJwcmltYXJ5IjoiI2I4ZTZlZSIsImZvbnRDb2xvciI6IiNmZmZmZmYiLCJwcmltYXJ5QnRuQmciOiIjYjhlNmVlIiwiZm9ybVBhZGRpbmciOnsidG9wIjpudWxsLCJyaWdodCI6MTIsImJvdHRvbSI6bnVsbCwibGVmdCI6bnVsbH19","theme":"dark","isHideLogo":false,"logo":"https://dumpfun.xyz/_next/static/media/name.fd779ac5.svg","disabledWallets":[],"disabledElements":["Switch chains"]}
        try {
            /*@ts-ignore*/
          if(window?.deBridge?.widget && !loading){
             /*@ts-ignore*/
            window?.deBridge?.widget(config);
          }
          
          //
        } catch (e) {
          if (e instanceof DOMException && e.name === 'InvalidCharacterError') {
            console.error('Error decoding config:', e);
          } else {
            throw e;
          }
        }
      }
      
       
    
      initializeWidget(); 
      }, [loading]);

  return <div className='mt-[20px] ' id="debridgeWidget">{loading}</div>;
};

export default DeBridgeWidget;