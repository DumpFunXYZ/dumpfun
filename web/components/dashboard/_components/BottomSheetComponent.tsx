/*@ts-ignore */
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';

interface BottomSheet{
    isOpen:boolean,
    setIsOpen:Function
}
//https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/6JdcMdhqgCtcP4U9tieRqmKLhPLxRMLC67QfmdXAJBvZ/logo.png

const data=[
    {
      "associatedTokenAddress": "J3sQDCWQQuZRCSgW7BWZ8s8Zoz16mprPxoCuryo6YXUX",
      "mint": "VVWAy5U2KFd1p8AdchjUxqaJbZPBeP5vUQRZtAy8hyc",
      "amountRaw": "7777000000000",
      "amount": "7777",
      "decimals": "9",
      "name": "Flip.gg | #1 Lootbox Game",
      "symbol": "FLIPGG"
    },
    {
      "associatedTokenAddress": "FaygwmWV2RGQVABXdvaPoa4Kar8EcjpaQcB4czcy4pUJ",
      "mint": "EL4YBAq2vnh2oQe454x64f4WJGxrywtUtxhJpv4cx2ks",
      "amountRaw": "2",
      "amount": "2",
      "decimals": "0",
      "name": "Cets Ears",
      "symbol": "goons"
    },
    {
      "associatedTokenAddress": "HQphaovZMmDXhDoH6LtMCGijVXB3JXuXvBPRPP1pAJSd",
      "mint": "5yvYnJZC6oCQXJ5w5AQxw2uC4VEdsjwk8rvwdqZ9uwAg",
      "amountRaw": "1",
      "amount": "1",
      "decimals": "0",
      "name": "Stay Diamond",
      "symbol": "goons"
    },
    {
      "associatedTokenAddress": "21tSs3xUXzmGAgUaeJaN2AaZvaAqq92N1XbhAfem7z5R",
      "mint": "HqpsEeh6C3AJoDGrPJHQUUhaRSQFhoJHx1Fmf9SQZmZX",
      "amountRaw": "16",
      "amount": "16",
      "decimals": "0",
      "name": "Rауdium аlрhа рrоgrаm",
      "symbol": "RAP"
    },
    {
      "associatedTokenAddress": "FcbfLtfg5ZL9VvmCBB2msyFsgDeGSuSS6UZFsi4G3Rhr",
      "mint": "SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y",
      "amountRaw": "5155",
      "amount": "0.000005155",
      "decimals": "9",
      "name": "Shadow Token",
      "symbol": "SHDW"
    },
    {
      "associatedTokenAddress": "GqboUZFpTZ6UeRhujy39q9B5ZVa7CXnqpWzTGXH7GuVg",
      "mint": "7SZUnH7H9KptyJkUhJ5L4Kee5fFAbqVgCHvt7B6wg4Xc",
      "amountRaw": "24061600000",
      "amount": "240616",
      "decimals": "5",
      "name": "TheSolanDAO",
      "symbol": "SDO"
    },
    {
      "associatedTokenAddress": "4V2QhEt59AGxGN8VwbmGUvPcjPpxPC2BGZoYWWZQppRi",
      "mint": "Doggoyb1uHFJGFdHhJf8FKEBUMv58qo98CisWgeD7Ftk",
      "amountRaw": "25700670593",
      "amount": "257006.70593",
      "decimals": "5",
      "name": "DOGGO",
      "symbol": "DOGGO"
    },
    {
      "associatedTokenAddress": "ANG2Qh3Zn5kh1ifj4cNXbqbZT8KP7waNm3r2iVeaFwMF",
      "mint": "HsQ9h5Hq3h4W2ez7EHmVp4XToJYbwFFSTBKdfutHxpsk",
      "amountRaw": "1",
      "amount": "1",
      "decimals": "0",
      "name": "Cets Eyemask",
      "symbol": "goons"
    },
    {
      "associatedTokenAddress": "7uuY4rNkvaJ8ZFbp4K32XZSw4dMybYb2wE3VVXjh8WXC",
      "mint": "5BLVGCJLYDL4UEC7dye3c7BeAtam7s2gEnHxW2JpEgwC",
      "amountRaw": "1",
      "amount": "1",
      "decimals": "0",
      "name": "Diamond",
      "symbol": "goons"
    }
  ]

export function BottomSheetComponent({isOpen,setIsOpen}:BottomSheet) {
  return (
    <SwipeableBottomSheet
      overflowHeight={60}
      open={isOpen}
      marginTop={120}
      fullScreen={true}
      bodyStyle={{backgroundColor:'transparent',borderRadius:32}}
      style={{zIndex:10,backgroundColor:'transparent',borderRadius:32}}
      onChange={() => setIsOpen(!isOpen)}
    >
      <div className='bg-[#00191D] w-[100%] min-h-[100%] rounded-t-[32px] pt-[12px] px-[24px] flex flex-col items-center justify-start'>
        <div className='w-[100%] flex flex-row items-center justify-between'>
            <p style={{lineHeight:'32px'}} className='bold text-[22px] text-[#B8E6EE]'>Your Wallet</p>
            <button onClick={()=>{
                setIsOpen(false)
            }} className='medium text-[17px] text-[#B8E6EE]'>Close</button>
        </div>
        {data.map((item,index)=>(
            <button className='py-[16px] w-[100%] flex flex-row items-center justify-start'>
                <img src={'https://pump.mypinata.cloud/ipfs/QmQfrdHbeqetqrizaFDEvUvBumJyZvXwBhrJYQ9ybQ2Q4v?img-width=800&img-dpr=2&img-onerror=redirect'} className={'w-[48px] h-[48px] border border-[#B8E6EE] border-[1px] rounded-[32px]'} />
                <div className='ml-[12px] flex flex-col items-start justify-start'>
                    <p style={{lineHeight:'24px'}} className='text-[#B8E6EE] medium text-[17px]'>{item?.symbol}</p>
                    <p style={{lineHeight:'24px'}} className='text-[#42919E] medium text-[17px] mt-[4px]'>{item?.amount}</p>
                </div>
            </button>
        ))}
      </div>
    </SwipeableBottomSheet>
  );
}
