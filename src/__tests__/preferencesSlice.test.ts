import reducer, { toggleCategory, setLanguage, setTheme } from '../store/slices/preferencesSlice';

describe('preferencesSlice', () => {
  const initialState = {
    categories: ['technology', 'entertainment', 'sports'],
    language: 'en',
    theme: 'dark',
    feedLayout: 'grid',
    contentSources: ['news', 'movie', 'social'],
    notificationsEnabled: true,
    autoRefresh: false,
    refreshInterval: 5,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle toggleCategory (remove category)', () => {
    const state = reducer(initialState, toggleCategory('technology'));
    expect(state.categories).not.toContain('technology');
    expect(state.categories).toHaveLength(2);
  });

  it('should handle toggleCategory (add category)', () => {
    const state = reducer(initialState, toggleCategory('finance'));
    expect(state.categories).toContain('finance');
    expect(state.categories).toHaveLength(4);
  });

  it('should handle setLanguage', () => {
    const state = reducer(initialState, setLanguage('hi'));
    expect(state.language).toBe('hi');
  });

  it('should handle setTheme', () => {
    const state = reducer(initialState, setTheme('light'));
    expect(state.theme).toBe('light');
  });
});
