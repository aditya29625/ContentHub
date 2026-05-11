'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { Heart, ExternalLink, Share2, MessageCircle, ThumbsUp, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { ContentItem } from '@/types';
import { toggleFavorite } from '@/store/slices/feedSlice';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

interface ContentCardProps {
  item: ContentItem;
  layout?: 'grid' | 'list';
  index?: number;
}

const typeBadgeColors: Record<string, string> = {
  news: '#7c3aed',
  movie: '#dc2626',
  social: '#0891b2',
};

export default function ContentCard({ item, layout = 'grid', index = 0 }: ContentCardProps) {
  const dispatch = useDispatch();
  const isList = layout === 'list';

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(item));
    toast.success(item.isFavorite ? 'Removed from favorites' : 'Added to favorites ❤️');
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success('Link copied!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      whileHover={{ y: -4 }}
      style={{
        display: 'flex',
        flexDirection: isList ? 'row' : 'column',
        backgroundColor: 'var(--color-card)',
        color: 'var(--color-card-foreground)',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        height: isList ? '200px' : undefined,
        cursor: 'pointer',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        width: isList ? '240px' : '100%',
        minWidth: isList ? '240px' : undefined,
        aspectRatio: isList ? undefined : '16/9',
        backgroundColor: 'var(--color-muted)',
      }}>
        <img
          src={item.imageUrl}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/640/360`;
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />

        {/* Type badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          <span style={{
            padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            backgroundColor: typeBadgeColors[item.type] || '#7c3aed',
            color: 'white',
          }}>
            {item.type}
          </span>
          {item.rating && (
            <span style={{
              padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '700',
              backgroundColor: 'rgba(234,179,8,0.9)', color: '#000', display: 'flex', alignItems: 'center', gap: '3px',
            }}>
              <Star size={10} style={{ fill: '#000' }} /> {item.rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', fontWeight: '500', color: 'var(--color-muted-foreground)', textTransform: 'uppercase' }}>
            {item.source} · {formatDistanceToNow(new Date(item.publishedAt))} ago
          </span>
          <button onClick={handleFavorite} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '9999px',
            color: item.isFavorite ? '#ef4444' : 'var(--color-muted-foreground)',
          }}>
            <Heart size={18} style={{ fill: item.isFavorite ? '#ef4444' : 'none' }} />
          </button>
        </div>

        <h3 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: 'var(--color-foreground)' }}>{item.title}</h3>
        <p style={{ fontSize: '13px', color: 'var(--color-muted-foreground)', margin: 0, flex: 1 }}>{item.description}</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
             {item.tags.slice(0, 2).map(tag => (
              <span key={tag} style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--color-muted)' }}>#{tag}</span>
             ))}
          </div>
          <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
            padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600',
            backgroundColor: 'var(--color-primary)', color: 'white', textDecoration: 'none'
          }}>
            Open
          </a>
        </div>
      </div>
    </motion.div>
  );
}
