'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Home, TrendingUp, Heart, Settings, Newspaper, Film, Share2, LayoutGrid, List } from 'lucide-react';
import { RootState, AppDispatch } from '@/store';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { setFeedLayout } from '@/store/slices/preferencesSlice';
import { setActiveCategory, fetchFeedContent } from '@/store/slices/feedSlice';
import { ContentCategory } from '@/types';

const navItems = [
  { name: 'Dashboard', icon: Home, href: '/' },
  { name: 'Trending', icon: TrendingUp, href: '/trending' },
  { name: 'Favorites', icon: Heart, href: '/favorites' },
];

const categories: { name: string; icon: any; value: ContentCategory }[] = [
  { name: 'News', icon: Newspaper, value: 'technology' },
  { name: 'Movies', icon: Film, value: 'entertainment' },
  { name: 'Social', icon: Share2, value: 'science' }, // Mapping for now
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  const { feedLayout } = useSelector((state: RootState) => state.preferences);

  const handleCategoryClick = (category: ContentCategory) => {
    dispatch(setActiveCategory(category));
    dispatch(fetchFeedContent(1));
    if (pathname !== '/') {
      router.push('/');
    }
  };

  return (
    <aside style={{
      width: sidebarOpen ? '256px' : '80px',
      minWidth: sidebarOpen ? '256px' : '80px',
      height: '100vh',
      borderRight: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-background)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 12px',
      gap: '8px',
      transition: 'width 0.3s ease, min-width 0.3s ease',
      overflow: 'hidden',
      position: 'sticky',
      top: 0,
      zIndex: 90,
    }}>
      {/* Logo area */}
      {sidebarOpen && (
        <div style={{ padding: '0 12px 16px', marginBottom: '8px', borderBottom: '1px solid var(--color-border)' }}>
          <span style={{ fontWeight: '800', fontSize: '18px' }}>ContentHub</span>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 12px', borderRadius: '12px', textDecoration: 'none',
              fontWeight: '600', fontSize: '14px', transition: 'all 0.2s',
              backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
              color: isActive ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)',
            }}>
              <item.icon size={20} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Content types label */}
      {sidebarOpen && (
        <div style={{ padding: '16px 12px 4px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-muted-foreground)' }}>
          Content Types
        </div>
      )}
      {categories.map((cat) => (
        <div 
          key={cat.name} 
          onClick={() => handleCategoryClick(cat.value)}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 12px', borderRadius: '12px', cursor: 'pointer',
            color: 'var(--color-muted-foreground)', fontSize: '14px', fontWeight: '500',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-muted)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <cat.icon size={20} style={{ flexShrink: 0 }} />
          {sidebarOpen && <span>{cat.name}</span>}
        </div>
      ))}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Layout toggle */}
      <div>
        {sidebarOpen && (
          <div style={{ padding: '0 4px 8px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted-foreground)' }}>
            Layout
          </div>
        )}
        <div style={{ display: 'flex', gap: '4px', padding: '4px', backgroundColor: 'var(--color-muted)', borderRadius: '12px', marginBottom: '8px' }}>
          {[{ icon: LayoutGrid, val: 'grid' }, { icon: List, val: 'list' }].map(({ icon: Icon, val }) => (
            <button key={val} onClick={() => dispatch(setFeedLayout(val as 'grid' | 'list'))} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer',
              backgroundColor: feedLayout === val ? 'var(--color-background)' : 'transparent',
              color: feedLayout === val ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
              transition: 'all 0.2s',
            }}>
              <Icon size={16} />
            </button>
          ))}
        </div>
        <Link href="/settings" style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px',
          borderRadius: '12px', textDecoration: 'none', fontWeight: '500', fontSize: '14px',
          color: pathname === '/settings' ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
          backgroundColor: pathname === '/settings' ? 'var(--color-accent)' : 'transparent',
        }}>
          <Settings size={20} style={{ flexShrink: 0 }} />
          {sidebarOpen && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}
