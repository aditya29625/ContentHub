import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../components/layout/Header';
import preferencesReducer from '../store/slices/preferencesSlice';
import feedReducer from '../store/slices/feedSlice';
import uiReducer from '../store/slices/uiSlice';

// Mock useRouter
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

const renderWithRedux = (component: React.ReactNode) => {
  const store = configureStore({
    reducer: {
      preferences: preferencesReducer,
      feed: feedReducer,
      ui: uiReducer,
    },
  });
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Header Component', () => {
  it('renders the application title', () => {
    renderWithRedux(<Header />);
    expect(screen.getByText('ContentHub')).toBeInTheDocument();
  });

  it('renders the search input with placeholder', () => {
    renderWithRedux(<Header />);
    expect(screen.getByPlaceholderText('Search news, movies, posts...')).toBeInTheDocument();
  });

  it('renders the user profile initial', () => {
    renderWithRedux(<Header />);
    // Check if the user icon container is present
    const userButton = screen.getByRole('banner').querySelector('div[style*="background: linear-gradient"]');
    expect(userButton).toBeInTheDocument();
  });
});
