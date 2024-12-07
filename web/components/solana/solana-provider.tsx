'use client';

import dynamic from 'next/dynamic';

import { WalletError } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider,WalletModal, WalletDisconnectButton, } from '@solana/wallet-adapter-react-ui';
import { ReactNode, useCallback, useMemo } from 'react';
import { useCluster } from '../cluster/cluster-data-access';
import { PhantomWalletAdapter,SkyWalletAdapter,SolongWalletAdapter,TorusWalletAdapter } from '@solana/wallet-adapter-wallets';

require('@solana/wallet-adapter-react-ui/styles.css');

export const WalletButton = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);
export const DisconnectButton = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletDisconnectButton,
  { ssr: false }
);

export function SolanaProvider({ children }: { children: ReactNode }) {
  const { cluster } = useCluster();
  const wallets = useMemo(() => [new PhantomWalletAdapter(),new SkyWalletAdapter(),new SolongWalletAdapter(),new TorusWalletAdapter()], []);

  const endpoint = useMemo(() => cluster.endpoint, [cluster]);
  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  const getRandomRPC=()=>{
    let rpc:any=[process.env.RPCENDPOIN,process.env.RPC_ENDPOINT2]
    const random=Math.floor(Math.random()*2);
    return 'https://mainnet.helius-rpc.com/?api-key=b0d5dd57-61b9-4b2d-b80c-f0b98dd78d2d'
  }

  return (
    <ConnectionProvider endpoint={getRandomRPC() || 'https://mainnet.helius-rpc.com/?api-key=b0d5dd57-61b9-4b2d-b80c-f0b98dd78d2d'}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
