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