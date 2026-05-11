'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchFeedContent, fetchTrendingContent, setActiveCategory } from '@/store/slices/feedSlice';
import DraggableFeed from '@/components/feed/DraggableFeed';
import { ContentCategory } from '@/types';
import { Sparkles, TrendingUp, RefreshCw, Zap } from 'lucide-react';

const categories: { label: string; value: ContentCategory | 'all' }[] = [
  { label: '✨ For You', value: 'all' },
  { label: '💻 Technology', value: 'technology' },
  { label: '🎬 Entertainment', value: 'entertainment' },
  { label: '⚽ Sports', value: 'sports' },
  { label: '💰 Finance', value: 'finance' },
  { label: '🔬 Science', value: 'science' },
];

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { activeCategory, trendingItems, loading, items } = useSelector((state: RootState) => state.feed);

  useEffect(() => {
    dispatch(fetchFeedContent(1));
    dispatch(fetchTrendingContent());
  }, [dispatch]);

  const handleCategoryChange = (category: ContentCategory | 'all') => {
    dispatch(setActiveCategory(category));
    dispatch(fetchFeedContent(1));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '48px' }}>

      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: '800', letterSpacing: '-0.5px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            Your Personalized Feed
            <Sparkles size={24} color="#eab308" style={{ fill: 'rgba(234,179,8,0.2)' }} />
          </h1>
          <p style={{ color: 'var(--color-muted-foreground)', margin: 0, fontSize: '15px' }}>
            Curated news, movies & social posts based on your interests.
          </p>
        </div>
        <button
          onClick={() => { dispatch(fetchFeedContent(1)); dispatch(fetchTrendingContent()); }}
          disabled={loading}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', borderRadius: '9999px',
            backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)',
            border: 'none', fontWeight: '700', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
          }}
        >
          <RefreshCw size={16} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          Refresh Feed
        </button>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              style={{
                padding: '9px 20px', borderRadius: '9999px', border: 'none',
                fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                backgroundColor: isActive ? 'var(--color-foreground)' : 'var(--color-muted)',
                color: isActive ? 'var(--color-background)' : 'var(--color-muted-foreground)',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                boxShadow: isActive ? '0 4px 15px rgba(0,0,0,0.2)' : 'none',
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Two-column layout: Feed + Sidebar */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>

        {/* Main Feed */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <DraggableFeed />

          {items.length > 0 && !loading && (
            <div style={{ textAlign: 'center', paddingTop: '16px' }}>
              <button
                onClick={() => dispatch(fetchFeedContent(2))}
                style={{
                  padding: '12px 36px', borderRadius: '14px', fontSize: '14px', fontWeight: '700',
                  border: '2px solid var(--color-primary)', backgroundColor: 'transparent',
                  color: 'var(--color-primary)', cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--color-primary)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary-foreground)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary)';
                }}
              >
                Load More Content
              </button>
            </div>
          )}
        </div>

        {/* Trending Sidebar */}
        <div style={{ width: '320px', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Trending Card */}
          <div style={{
            backgroundColor: 'var(--color-card)', borderRadius: '24px', padding: '24px',
            border: '1px solid var(--color-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}>
            <h2 style={{ fontSize: '17px', fontWeight: '800', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color="var(--color-primary)" /> Trending Now
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {(trendingItems.length > 0 ? trendingItems : [...Array(5)]).slice(0, 6).map((item: any, i: number) => (
                <div key={item?.id || i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}>
                  <span style={{
                    fontSize: '24px', fontWeight: '900', lineHeight: '1',
                    color: i < 3 ? 'var(--color-primary)' : 'var(--color-muted-foreground)',
                    minWidth: '28px', opacity: trendingItems.length === 0 ? 0.3 : 1,
                  }}>
                    {i + 1}
                  </span>
                  {trendingItems.length === 0 ? (
                    <div style={{ flex: 1, height: '36px', borderRadius: '8px', backgroundColor: 'var(--color-muted)', animation: 'pulse-bg 2s infinite' }} />
                  ) : (
                    <div style={{ minWidth: 0 }}>
                      <p style={{
                        fontSize: '13px', fontWeight: '700', margin: '0 0 4px', lineHeight: '1.4',
                        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      }}>
                        {item.title}
                      </p>
                      <span style={{ fontSize: '11px', color: 'var(--color-muted-foreground)' }}>
                        {item.source} · {Math.floor(Math.random() * 50 + 5)}k interactions
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pro Upgrade Card */}
          <div style={{
            borderRadius: '24px', padding: '28px',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, #a855f7 100%)',
            color: 'white', boxShadow: '0 12px 40px rgba(124,58,237,0.35)',
          }}>
            <Zap size={28} style={{ marginBottom: '12px', fill: 'rgba(255,255,255,0.3)' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 8px' }}>Go Pro</h3>
            <p style={{ fontSize: '13px', opacity: 0.85, margin: '0 0 20px', lineHeight: '1.5' }}>
              Unlock real-time feeds, AI summaries, and unlimited sources.
            </p>
            <button style={{
              width: '100%', padding: '10px', borderRadius: '12px', border: 'none',
              backgroundColor: 'white', color: 'var(--color-primary)', fontWeight: '800',
              fontSize: '14px', cursor: 'pointer',
            }}>
              Upgrade Now →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
