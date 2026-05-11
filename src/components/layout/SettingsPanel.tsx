'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Moon, Sun, Bell, Monitor, Globe, Shield, CreditCard, HelpCircle } from 'lucide-react';
import { RootState } from '@/store';
import { toggleSettingsPanel } from '@/store/slices/uiSlice';
import { toggleTheme, toggleNotifications, setLanguage } from '@/store/slices/preferencesSlice';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPanel() {
  const dispatch = useDispatch();
  const { settingsPanelOpen } = useSelector((state: RootState) => state.ui);
  const { theme, notificationsEnabled, language } = useSelector((state: RootState) => state.preferences);

  const closePanel = () => dispatch(toggleSettingsPanel());

  return (
    <AnimatePresence>
      {settingsPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePanel}
            style={{
              position: 'fixed', inset: 0, zIndex: 140,
              backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px',
              backgroundColor: 'var(--color-card)', borderLeft: '1px solid var(--color-border)',
              zIndex: 150, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>Settings</h2>
              <button
                onClick={closePanel}
                style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'var(--color-muted)', cursor: 'pointer', color: 'var(--color-foreground)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Appearance */}
              <section>
                <h3 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted-foreground)', marginBottom: '16px' }}>Appearance</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '12px', backgroundColor: 'var(--color-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                      <span style={{ fontSize: '14px', fontWeight: '600' }}>Dark Mode</span>
                    </div>
                    <button 
                      onClick={() => dispatch(toggleTheme())}
                      style={{ 
                        width: '44px', height: '24px', borderRadius: '9999px', border: 'none',
                        backgroundColor: theme === 'dark' ? 'var(--color-primary)' : '#cbd5e1',
                        position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s'
                      }}
                    >
                      <div style={{ 
                        position: 'absolute', top: '2px', left: theme === 'dark' ? '22px' : '2px',
                        width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white',
                        transition: 'left 0.2s'
                      }} />
                    </button>
                  </div>
                </div>
              </section>

              {/* Notifications */}
              <section>
                <h3 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted-foreground)', marginBottom: '16px' }}>Notifications</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '12px', backgroundColor: 'var(--color-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Bell size={18} />
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>Push Notifications</span>
                  </div>
                  <button 
                    onClick={() => dispatch(toggleNotifications())}
                    style={{ 
                      width: '44px', height: '24px', borderRadius: '9999px', border: 'none',
                      backgroundColor: notificationsEnabled ? 'var(--color-primary)' : '#cbd5e1',
                      position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s'
                    }}
                  >
                    <div style={{ 
                      position: 'absolute', top: '2px', left: notificationsEnabled ? '22px' : '2px',
                      width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white',
                      transition: 'left 0.2s'
                    }} />
                  </button>
                </div>
              </section>

              {/* Account & Security */}
              <section>
                <h3 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted-foreground)', marginBottom: '16px' }}>General</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { icon: Globe, label: 'Language', value: language.toUpperCase() },
                    { icon: Shield, label: 'Privacy & Security' },
                    { icon: CreditCard, label: 'Subscription' },
                    { icon: HelpCircle, label: 'Help & Support' },
                  ].map((item) => (
                    <button key={item.label} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px', borderRadius: '12px', border: 'none', background: 'transparent',
                      cursor: 'pointer', color: 'var(--color-foreground)', transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-muted)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <item.icon size={18} style={{ color: 'var(--color-muted-foreground)' }} />
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
                      </div>
                      {item.value && <span style={{ fontSize: '12px', color: 'var(--color-muted-foreground)' }}>{item.value}</span>}
                    </button>
                  ))}
                </div>
              </section>

            </div>

            {/* Footer */}
            <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: 'var(--color-muted-foreground)', margin: 0 }}>ContentHub v1.0.4 Beta</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
