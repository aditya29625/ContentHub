import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UIState } from '@/types';

const initialState: UIState = {
  sidebarOpen: true,
  settingsPanelOpen: false,
  searchFocused: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    toggleSettingsPanel(state) {
      state.settingsPanelOpen = !state.settingsPanelOpen;
    },
    setSettingsPanelOpen(state, action: PayloadAction<boolean>) {
      state.settingsPanelOpen = action.payload;
    },
    setSearchFocused(state, action: PayloadAction<boolean>) {
      state.searchFocused = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleSettingsPanel,
  setSettingsPanelOpen,
  setSearchFocused,
} = uiSlice.actions;

export default uiSlice.reducer;
