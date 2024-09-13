
import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import { AccountProvider } from '@/components/context/accountContext';
import { TransactionProvider } from '@/components/context/transactionContext';
import { Toaster } from 'react-hot-toast';
import mixpanel from "mixpanel-browser";
import Head from 'next/head';
export const metadata = {
  title: 'Dump Fun',
  description: 'A place where you dump your sh!t coins',
  image:'https://firebasestorage.googleapis.com/v0/b/enclave-74f51.appspot.com/o/product%2F2024-09-08%2021.27.33.jpg?alt=media&token=e106efbc-7f41-42a6-82f6-a397c7d394c7',
  openGraph: {
    images: 'https://firebasestorage.googleapis.com/v0/b/enclave-74f51.appspot.com/o/product%2F2024-09-08%2021.27.33.jpg?alt=media&token=e106efbc-7f41-42a6-82f6-a397c7d394c7',
  },
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
      <Head>
<meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/enclave-74f51.appspot.com/o/product%2F2024-09-08%2021.27.33.jpg?alt=media&token=e106efbc-7f41-42a6-82f6-a397c7d394c7" />
<meta name="description" content="A place where you dump your sh!t coins"/>
<meta property="og:url" content="https://dumpfun.xyz"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="Dump Fun"/>
<meta property="og:description" content="A place where you dump your sh!t coins"/>
<meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/enclave-74f51.appspot.com/o/product%2F2024-09-08%2021.27.33.jpg?alt=media&token=e106efbc-7f41-42a6-82f6-a397c7d394c7" />
<meta name="description" content="A place where you dump your sh!t coins"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta property="twitter:domain" content="dumpfun.xyz"/>
<meta property="twitter:url" content="https://dumpfun.xyz"/>
<meta name="twitter:title" content="Dump Fun"/>
<meta name="twitter:description" content="A place where you dump your sh!t coins"/>
<meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/enclave-74f51.appspot.com/o/product%2F2024-09-08%2021.27.33.jpg?alt=media&token=e106efbc-7f41-42a6-82f6-a397c7d394c7" />
<meta name="description" content="A place where you dump your sh!t coins"/>
</Head>
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
