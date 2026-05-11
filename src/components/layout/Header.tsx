'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Bell, Settings, Menu, Moon, Sun, User, LogOut } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import { RootState } from '@/store';
import { setSearchQuery } from '@/store/slices/feedSlice';
import { toggleSidebar, toggleSettingsPanel } from '@/store/slices/uiSlice';
import { toggleTheme } from '@/store/slices/preferencesSlice';
import toast from 'react-hot-toast';

export default function Header() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { theme } = useSelector((state: RootState) => state.preferences);
  const { searchQuery } = useSelector((state: RootState) => state.feed);
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localSearch));
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, dispatch]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
    toast.success("Logged out successfully");
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100, width: '100%',
      borderBottom: '1px solid var(--color-border)',
      backgroundColor: 'color-mix(in srgb, var(--color-background) 95%, transparent)',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{ display: 'flex', height: '64px', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => dispatch(toggleSidebar())}
            style={{ padding: '8px', borderRadius: '8px', cursor: 'pointer', background: 'transparent', border: 'none', color: 'var(--color-muted-foreground)' }}
          >
            <Menu size={22} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ height: '32px', width: '32px', borderRadius: '8px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'var(--color-primary-foreground)', fontWeight: 'bold', fontSize: '16px' }}>C</span>
            </div>
            <span className="hidden md:block" style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>ContentHub</span>
          </div>
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: '480px', margin: '0 24px' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted-foreground)' }} size={16} />
            <input
              type="text"
              placeholder="Search news, movies, posts..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{
                width: '100%', background: 'var(--color-muted)', border: 'none',
                borderRadius: '9999px', padding: '10px 16px 10px 40px',
                fontSize: '14px', outline: 'none', color: 'var(--color-foreground)',
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => dispatch(toggleTheme())}
            style={{ padding: '8px', borderRadius: '9999px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-foreground)' }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={() => toast("No new notifications.", { icon: '🔔' })}
            style={{ padding: '8px', borderRadius: '9999px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-foreground)', position: 'relative' }}>
            <Bell size={20} />
            <span style={{ position: 'absolute', top: '6px', right: '6px', height: '8px', width: '8px', backgroundColor: '#ef4444', borderRadius: '9999px', border: '2px solid var(--color-background)' }}></span>
          </button>

          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                height: '36px', width: '36px', borderRadius: '9999px',
                background: 'linear-gradient(135deg, var(--color-primary), #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginLeft: '8px', cursor: 'pointer', border: '2px solid var(--color-background)',
                overflow: 'hidden',
              }}
            >
              {session?.user?.image ? (
                <img src={session.user.image} alt="Avatar" style={{ width: '100%', height: '100%' }} />
              ) : (
                <User size={16} color="white" />
              )}
            </div>

            {showProfileMenu && (
              <div style={{
                position: 'absolute', top: '48px', right: 0, width: '220px',
                backgroundColor: 'var(--color-card)', borderRadius: '16px',
                border: '1px solid var(--color-border)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px',
              }}>
                <div style={{ padding: '12px', borderBottom: '1px solid var(--color-border)', marginBottom: '4px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '800', margin: 0 }}>{session?.user?.name || "User"}</p>
                  <p style={{ fontSize: '12px', color: 'var(--color-muted-foreground)', margin: 0 }}>{session?.user?.email}</p>
                </div>
                <button 
                  onClick={() => { dispatch(toggleSettingsPanel()); setShowProfileMenu(false); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-foreground)', fontSize: '14px' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-muted)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Settings size={18} /> Settings
                </button>
                <button 
                  onClick={handleLogout}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444', fontSize: '14px' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
