'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ContentCard from '@/components/cards/ContentCard';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FavoritesPage() {
  const { favoriteItems } = useSelector((state: RootState) => state.feed);
  const { feedLayout } = useSelector((state: RootState) => state.preferences);
  const isGrid = feedLayout === 'grid';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '48px' }}>
      <div>
        <h1 style={{ fontSize: '30px', fontWeight: '800', letterSpacing: '-0.5px', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          Your Favorites
          <Heart size={28} color="#ef4444" style={{ fill: '#ef4444' }} />
        </h1>
        <p style={{ color: 'var(--color-muted-foreground)', margin: 0, fontSize: '15px' }}>
          {favoriteItems.length} item{favoriteItems.length !== 1 ? 's' : ''} saved for later.
        </p>
      </div>

      {favoriteItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '80px 20px', textAlign: 'center',
            backgroundColor: 'var(--color-muted)', borderRadius: '24px',
            border: '2px dashed var(--color-border)',
          }}
        >
          <div style={{
            height: '96px', width: '96px', borderRadius: '9999px',
            backgroundColor: 'var(--color-background)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', marginBottom: '24px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          }}>
            <Heart size={44} color="var(--color-muted-foreground)" />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 8px' }}>No favorites yet</h3>
          <p style={{ color: 'var(--color-muted-foreground)', maxWidth: '320px', margin: 0, lineHeight: '1.6' }}>
            Click the ❤️ on any content card to save it here for quick access.
          </p>
        </motion.div>
      ) : (
        <div style={{
          display: isGrid ? 'grid' : 'flex',
          flexDirection: isGrid ? undefined : 'column',
          gridTemplateColumns: isGrid ? 'repeat(auto-fill, minmax(280px, 1fr))' : undefined,
          gap: '20px',
        }}>
          {favoriteItems.map((item, i) => (
            <ContentCard key={item.id} item={item} layout={feedLayout} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
