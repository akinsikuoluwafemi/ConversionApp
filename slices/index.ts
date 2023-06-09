import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import transactionDataReducer from './transactionDataSlice';
import tabDataReducer from './tabDataSlice';

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['transactionData', 'tabData'],
};

const rootReducer = combineReducers({
  transactionData: transactionDataReducer,
  tabData: tabDataReducer,
});

export default persistReducer(persistConfig, rootReducer);
