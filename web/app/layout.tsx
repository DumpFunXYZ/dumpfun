import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import { AccountProvider } from '@/components/context/accountContext';
import { TransactionProvider } from '@/components/context/transactionContext';
import { Toaster } from 'react-hot-toast';
export const metadata = {
  title: 'dump-fun',
  description: 'A place where you dump your shit coins',
};

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     
      <body suppressHydrationWarning={true}>
        <div className='status-bar'></div>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <AccountProvider>
                <TransactionProvider>
                <Toaster
  position="top-center"
  reverseOrder={false}
/>


              <UiLayout links={links}>{children}</UiLayout>
              </TransactionProvider>
              </AccountProvider>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
