import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js'

const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

const getTokenAccountsByOwner = async (walletAddress:any) => {
    const publicKey = new PublicKey(walletAddress);
  
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    });
  
    return tokenAccounts.value.map(accountInfo => ({
      address: accountInfo.pubkey.toBase58(),
      mint: accountInfo.account.data.parsed.info.mint,
      amount: accountInfo.account.data.parsed.info.tokenAmount.uiAmount,
    }));
  };
  