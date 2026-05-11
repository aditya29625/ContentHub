'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ContentCard from '@/components/cards/ContentCard';
import { TrendingUp, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrendingPage() {
  const { trendingItems } = useSelector((state: RootState) => state.feed);
  const { feedLayout } = useSelector((state: RootState) => state.preferences);
  const isGrid = feedLayout === 'grid';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '48px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '30px', fontWeight: '800', letterSpacing: '-0.5px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            Trending Now
            <Flame size={26} color="#f97316" style={{ fill: '#f97316' }} />
          </h1>
          <p style={{ color: 'var(--color-muted-foreground)', margin: 0, fontSize: '15px' }}>
            What&apos;s hot across the web right now.
          </p>
        </div>
      </div>

      {trendingItems.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '80px 20px',
          backgroundColor: 'var(--color-muted)', borderRadius: '24px',
          border: '2px dashed var(--color-border)',
        }}>
          <TrendingUp size={48} color="var(--color-muted-foreground)" style={{ margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--color-muted-foreground)' }}>Loading trending items from your feed...</p>
        </div>
      ) : (
        <div style={{
          display: isGrid ? 'grid' : 'flex',
          flexDirection: isGrid ? undefined : 'column',
          gridTemplateColumns: isGrid ? 'repeat(auto-fill, minmax(280px, 1fr))' : undefined,
          gap: '20px',
        }}>
          {trendingItems.map((item, i) => (
            <ContentCard key={item.id} item={item} layout={feedLayout} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
