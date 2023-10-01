import {
  AllCurrencies,
  ExchangeHistory,
  Transaction,
} from '@/types/globalTypes';
import { RootState } from '../store';
import { TransactionDataState } from '@/types/globalTypes';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const base_url = process.env.NEXT_PUBLIC_BASE_URL as string;
const initialState: TransactionDataState = {
  allCurrencies: {
    base: '',
    rates: {},
  } as AllCurrencies | {} | null,
  currentTransaction: {} as Transaction,
  conversionHistory: [],
  exchangeHistory: {
    rates: {},
  } as ExchangeHistory,
  convertedValue: 0,
  conversionRate: 0,
  fromCurrency: '',
  toCurrency: '',
  duration: '',
  toggle: false,
  amount: 0,
  loading: false,
  error: null,
};

// action type to get currency and rates
export const getAllCurrencies = createAsyncThunk(
  'transactionData/getAllCurrencies',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${base_url}/exchangerates_data/latest`,
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
          },
        },
      );
      return {
        base: data.base,
        rates: data.rates,
      };
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

// convert the currency here
export const convertToAnotherCurrency = createAsyncThunk(
  'transactionData/convertCurrency',
  async (
    obj: {
      from: string | undefined;
      to: string | undefined;
      amount: number | undefined;
    },
    thunkAPI,
  ) => {
    try {
      const { data } = await axios.get(
        `${base_url}/exchangerates_data/convert?from=${obj.from}&to=${obj.to}&amount=${obj.amount}`,
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
          },
        },
      );
      return {
        rate: data['info']['rate'],
        convertedAmt: data['result'],
      };
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

// exchange history action
export const getExchangeHistory = createAsyncThunk(
  'transactionData/getExchangeHistory',
  async (
    obj: { start_date: string; end_date: string; symbols: string },
    thunkAPI,
  ) => {
    try {
      const { data } = await axios.get(
        `${base_url}/exchangerates_data/timeseries?start_date=${obj.start_date}&end_date=${obj.end_date}&symbols=${obj.symbols}&base=EUR`,
        {
          headers: {
            apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
          },
        },
      );

      return {
        rates: data['rates'],
      };
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

const transactionDataSlice = createSlice({
  name: 'transactionData',
  initialState,
  reducers: {
    setCurrentTransaction: (state, action: PayloadAction<Transaction>) => {
      state.currentTransaction = action.payload;
    },
    setConversionHistory: (state, action: PayloadAction<Transaction>) => {
      state.conversionHistory = [action.payload, ...state.conversionHistory];
    },

    setToCurrency: (state, action: PayloadAction<string | undefined>) => {
      state.toCurrency = action.payload;
    },

    setFromCurrency: (state, action: PayloadAction<string | undefined>) => {
      state.fromCurrency = action.payload;
    },

    setConvertedValue: (state, action: PayloadAction<number>) => {
      state.convertedValue = action.payload;
    },
    setConversionRate: (state, action: PayloadAction<number>) => {
      state.conversionRate = action.payload;
    },
    setAmount: (state, action: PayloadAction<number | undefined>) => {
      state.amount = action.payload;
    },
    setToggle: (state, action: PayloadAction<boolean>) => {
      state.toggle = action.payload;
    },
    removeTransactionFromHistory: (state, action: PayloadAction<string>) => {
      state.conversionHistory = state.conversionHistory.filter(
        (item) => item.id !== action.payload,
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getAllCurrencies.fulfilled,
      (state, action: PayloadAction<AllCurrencies>) => {
        state.loading = false;
        state.allCurrencies = action.payload;
        state.error = null;
      },
    );
    builder.addCase(getAllCurrencies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getAllCurrencies.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(convertToAnotherCurrency.fulfilled, (state, action) => {
      state.loading = false;
      state.conversionRate = action.payload.rate;
      state.convertedValue = action.payload.convertedAmt;
      state.error = null;
    });

    builder.addCase(convertToAnotherCurrency.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(convertToAnotherCurrency.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getExchangeHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.exchangeHistory = action.payload.rates;
      state.error = null;
    });

    builder.addCase(getExchangeHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getExchangeHistory.pending, (state) => {
      state.loading = true;
    });
  },
});

export const {
  setConversionHistory,
  setCurrentTransaction,
  setToCurrency,
  setFromCurrency,
  setConvertedValue,
  setAmount,
  setToggle,
  setConversionRate,
  removeTransactionFromHistory,
} = transactionDataSlice.actions;

export const selectAllCurrencies = (state: RootState) =>
  state.transactionData.allCurrencies;

export const selectToCurrency = (state: RootState) =>
  state.transactionData.toCurrency;

export const selectFromCurrency = (state: RootState) =>
  state.transactionData.fromCurrency;

export const selectConvertedValue = (state: RootState) =>
  state.transactionData.convertedValue;

export const selectConversionRate = (state: RootState) =>
  state.transactionData.conversionRate;

export const selectToggle = (state: RootState) => state.transactionData.toggle;

export const selectAmount = (state: RootState) => state.transactionData.amount;

export const selectExchangeHistory = (state: RootState) =>
  state.transactionData.exchangeHistory;

export const selectConversionHistory = (state: RootState) =>
  state.transactionData.conversionHistory;

export default transactionDataSlice.reducer;
