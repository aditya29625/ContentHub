'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  toggleCategory,
  toggleContentSource,
  setLanguage,
  setTheme,
  toggleNotifications,
  setFeedLayout,
  resetPreferences,
} from '@/store/slices/preferencesSlice';
import { ContentCategory, ContentType, Language } from '@/types';
import { User, Bell, Languages, Moon, Sun, LayoutGrid, List, Trash2, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const allCategories: { id: ContentCategory; label: string; emoji: string }[] = [
  { id: 'technology', label: 'Technology', emoji: '💻' },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'finance', label: 'Finance', emoji: '💰' },
  { id: 'health', label: 'Health', emoji: '🏥' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'politics', label: 'Politics', emoji: '🏛️' },
  { id: 'gaming', label: 'Gaming', emoji: '🎮' },
];

const languages: { id: Language; label: string }[] = [
  { id: 'en', label: '🇺🇸 English' },
  { id: 'es', label: '🇪🇸 Spanish' },
  { id: 'fr', label: '🇫🇷 French' },
  { id: 'hi', label: '🇮🇳 Hindi' },
];

const SectionCard = ({ children, icon, title, color }: { children: React.ReactNode; icon: React.ReactNode; title: string; color: string }) => (
  <div style={{
    backgroundColor: 'var(--color-card)', borderRadius: '24px',
    border: '1px solid var(--color-border)', padding: '28px',
    display: 'flex', flexDirection: 'column', gap: '24px',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ padding: '10px', borderRadius: '14px', backgroundColor: color, display: 'flex' }}>
        {icon}
      </div>
      <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>{title}</h2>
    </div>
    {children}
  </div>
);

export default function SettingsPage() {
  const dispatch = useDispatch();
  const prefs = useSelector((state: RootState) => state.preferences);

  const handleReset = () => {
    if (window.confirm('Reset all preferences to default?')) {
      dispatch(resetPreferences());
      toast.success('Settings reset to default ✅');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '60px' }}>
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: '800', letterSpacing: '-0.5px', margin: '0 0 6px' }}>Settings</h1>
        <p style={{ color: 'var(--color-muted-foreground)', margin: 0 }}>Manage your feed preferences and display options.</p>
      </div>

      {/* Feed Preferences */}
      <SectionCard icon={<User size={20} color="#7c3aed" />} title="Feed Customization" color="rgba(124,58,237,0.12)">
        <div>
          <label style={{ fontSize: '13px', fontWeight: '700', display: 'block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-muted-foreground)' }}>
            Favorite Categories
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {allCategories.map((cat) => {
              const isActive = prefs.categories.includes(cat.id);
              return (
                <button key={cat.id} onClick={() => dispatch(toggleCategory(cat.id))} style={{
                  padding: '8px 16px', borderRadius: '12px', border: '2px solid',
                  borderColor: isActive ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: isActive ? 'rgba(124,58,237,0.1)' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                  fontWeight: '600', fontSize: '13px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s',
                }}>
                  {isActive && <Check size={13} />}
                  {cat.emoji} {cat.label}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: '700', display: 'block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-muted-foreground)' }}>
            Content Sources
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {(['news', 'movie', 'social'] as ContentType[]).map((type) => {
              const isActive = prefs.contentSources.includes(type);
              const labels: Record<string, string> = { news: '📰 News', movie: '🎬 Movies', social: '📱 Social' };
              return (
                <button key={type} onClick={() => dispatch(toggleContentSource(type))} style={{
                  padding: '16px', borderRadius: '16px', border: '2px solid',
                  borderColor: isActive ? 'var(--color-primary)' : 'var(--color-border)',
                  backgroundColor: isActive ? 'rgba(124,58,237,0.08)' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-foreground)',
                  fontWeight: '700', fontSize: '14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'all 0.2s',
                }}>
                  <span>{labels[type]}</span>
                  {isActive && <Check size={16} />}
                </button>
              );
            })}
          </div>
        </div>
      </SectionCard>

      {/* Appearance */}
      <SectionCard icon={<Moon size={20} color="#3b82f6" />} title="Appearance & Language" color="rgba(59,130,246,0.12)">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', display: 'block', marginBottom: '10px', color: 'var(--color-muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Theme
            </label>
            <div style={{ display: 'flex', gap: '6px', padding: '4px', backgroundColor: 'var(--color-muted)', borderRadius: '14px' }}>
              {[{ val: 'light', icon: <Sun size={16} />, label: 'Light' }, { val: 'dark', icon: <Moon size={16} />, label: 'Dark' }].map(({ val, icon, label }) => (
                <button key={val} onClick={() => dispatch(setTheme(val as 'light' | 'dark'))} style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px',
                  backgroundColor: prefs.theme === val ? 'var(--color-background)' : 'transparent',
                  color: prefs.theme === val ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
                  boxShadow: prefs.theme === val ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s',
                }}>
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', display: 'block', marginBottom: '10px', color: 'var(--color-muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Feed Layout
            </label>
            <div style={{ display: 'flex', gap: '6px', padding: '4px', backgroundColor: 'var(--color-muted)', borderRadius: '14px' }}>
              {[{ val: 'grid', icon: <LayoutGrid size={16} />, label: 'Grid' }, { val: 'list', icon: <List size={16} />, label: 'List' }].map(({ val, icon, label }) => (
                <button key={val} onClick={() => dispatch(setFeedLayout(val as 'grid' | 'list'))} style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '13px',
                  backgroundColor: prefs.feedLayout === val ? 'var(--color-background)' : 'transparent',
                  color: prefs.feedLayout === val ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
                  boxShadow: prefs.feedLayout === val ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s',
                }}>
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label style={{ fontSize: '13px', fontWeight: '700', display: 'block', marginBottom: '10px', color: 'var(--color-muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Language
          </label>
          <select
            value={prefs.language}
            onChange={(e) => dispatch(setLanguage(e.target.value as Language))}
            style={{
              width: '100%', padding: '12px 16px', borderRadius: '12px',
              backgroundColor: 'var(--color-muted)', border: '1px solid var(--color-border)',
              color: 'var(--color-foreground)', fontSize: '14px', fontWeight: '600', outline: 'none',
            }}
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.label}</option>
            ))}
          </select>
        </div>
      </SectionCard>

      {/* Notifications */}
      <SectionCard icon={<Bell size={20} color="#f97316" />} title="Notifications" color="rgba(249,115,22,0.12)">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontWeight: '700', margin: '0 0 4px', fontSize: '15px' }}>Push Notifications</p>
            <p style={{ color: 'var(--color-muted-foreground)', margin: 0, fontSize: '13px' }}>
              Get alerts for trending news and social mentions.
            </p>
          </div>
          <button
            onClick={() => dispatch(toggleNotifications())}
            style={{
              position: 'relative', height: '28px', width: '52px', borderRadius: '9999px', border: 'none',
              cursor: 'pointer', transition: 'background-color 0.3s',
              backgroundColor: prefs.notificationsEnabled ? 'var(--color-primary)' : 'var(--color-muted)',
              flexShrink: 0,
            }}
          >
            <span style={{
              position: 'absolute', top: '4px',
              left: prefs.notificationsEnabled ? '26px' : '4px',
              height: '20px', width: '20px', borderRadius: '9999px', backgroundColor: 'white',
              transition: 'left 0.3s',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }} />
          </button>
        </div>
      </SectionCard>

      {/* Danger Zone */}
      <div style={{
        paddingTop: '24px', borderTop: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={handleReset} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          color: '#ef4444', fontWeight: '700', fontSize: '14px',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '8px 16px', borderRadius: '12px', transition: 'background 0.2s',
        }}
          onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(239,68,68,0.1)'}
          onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'}
        >
          <Trash2 size={16} /> Reset All Preferences
        </button>
        <span style={{ fontSize: '12px', color: 'var(--color-muted-foreground)' }}>v1.0.0</span>
      </div>
    </div>
  );
}
