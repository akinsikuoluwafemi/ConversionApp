import './globals.css';
import { Roboto } from 'next/font/google';
import StyledComponentsRegistry from '../lib/registry';
import { Metadata } from 'next';
import ReduxProvider from './provider';

export const metadata: Metadata = {
  title: 'Conversation App',
  description: 'A currency converter app',
};

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <StyledComponentsRegistry>
          <ReduxProvider>{children}</ReduxProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
