'use client';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import Tabs from '@/components/Tabs';

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Tabs />
    </ThemeProvider>
  );
}
