import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface TabDataState {
  tabNumber: number;
}

const initialState: TabDataState = {
  tabNumber: 1,
};

const tabDataSlice = createSlice({
  name: 'tabData',
  initialState,
  reducers: {
    setTabNumber: (state, action) => {
      state.tabNumber = action.payload;
    },
  },
});

export const { setTabNumber } = tabDataSlice.actions;

export const selectTabNumber = (state: RootState) => state.tabData.tabNumber;

export default tabDataSlice.reducer;
