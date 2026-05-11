'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { RootState, AppDispatch } from '@/store';
import { reorderItems } from '@/store/slices/feedSlice';
import ContentCard from '../cards/ContentCard';
import { GripVertical } from 'lucide-react';

export default function DraggableFeed() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.feed);
  const { feedLayout } = useSelector((state: RootState) => state.preferences);
  const isGrid = feedLayout === 'grid';

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);
    dispatch(reorderItems(newItems.map(i => i.id)));
  };

  if (loading && items.length === 0) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: isGrid ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
        gap: '20px',
      }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            height: isGrid ? '320px' : '200px',
            borderRadius: '20px',
            backgroundColor: 'var(--color-muted)',
            animation: 'pulse-bg 2s infinite',
          }} />
        ))}
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="feed" direction={isGrid ? 'horizontal' : 'vertical'}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              display: isGrid ? 'grid' : 'flex',
              gridTemplateColumns: isGrid ? 'repeat(auto-fill, minmax(280px, 1fr))' : undefined,
              flexDirection: isGrid ? undefined : 'column',
              gap: '20px',
            }}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      position: 'relative',
                      zIndex: snapshot.isDragging ? 50 : 'auto',
                    }}
                  >
                    {/* Dedicated Drag Handle to prevent button interference */}
                    <div 
                      {...provided.dragHandleProps}
                      style={{
                        position: 'absolute', top: '12px', right: '12px', zIndex: 10,
                        backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '6px',
                        padding: '4px', cursor: 'grab', display: 'flex', alignItems: 'center',
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      <GripVertical size={16} color="white" />
                    </div>
                    
                    <ContentCard item={item} layout={feedLayout} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
