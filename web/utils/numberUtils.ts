export function nFormatter(num:any) {
    let numVal:any;
    if(typeof num=='string'){
       numVal=parseFloat(num)
    }
    else{
       numVal=num
    }
    if (numVal >= 1000000000) {
       return (numVal / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (numVal >= 1000000) {
       return (numVal / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (numVal >= 1000) {
       return (numVal / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    //console.log(numVal)
    return numVal;
    
 }

 export function truncate(value: string, length: number) {
   if (value?.length <= length) {
     return value;
   }
 
   const separator = '...';
   const stringLength = length - separator.length;
   const frontLength = Math.ceil(stringLength / 2);
   const backLength = Math.floor(stringLength / 2);
 
   return (
     value?.substring(0, frontLength) +
     separator +
     value?.substring(value?.length - backLength)
   );
 }