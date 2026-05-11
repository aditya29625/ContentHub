'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Header from './Header';
import Sidebar from './Sidebar';
import SettingsPanel from './SettingsPanel';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useSelector((state: RootState) => state.preferences);

  useEffect(() => {
    // Sync theme with HTML class for Tailwind v4
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)' }}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
          <Header />
          <main style={{ flex: 1, overflowY: 'auto', backgroundColor: 'color-mix(in srgb, var(--color-muted) 30%, transparent)' }}>
            <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '32px' }}>
              {children}
            </div>
          </main>
        </div>
      </div>
      <SettingsPanel />
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: 'var(--color-card)',
          color: 'var(--color-foreground)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
        },
      }} />
    </div>
  );
}
