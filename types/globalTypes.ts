export interface ConvertCurrency {
  amount: number;
  from: string;
  to: string;
}

export interface Transaction {
  id: string;
  amount: number | undefined;
  from: string | undefined;
  to: string | undefined;
  date: string;
  time: string;
}

export interface AllCurrencies {
  base: string;
  rates: {
    [key: string]: number;
  };
}

export interface ExchangeHistory {
  rates: {
    [key: string]: {
      [key: string]: number;
    };
  };
}

export interface IHistory {
  rate: number;
  date: string;
}

export interface TransactionDataState {
  allCurrencies: AllCurrencies | {} | null;
  currentTransaction: Transaction | null;
  conversionHistory: Transaction[];
  exchangeHistory: ExchangeHistory;
  convertedValue: number;
  conversionRate: number;
  fromCurrency: string | undefined;
  toCurrency: string | undefined;
  toggle: boolean;
  amount: number | undefined;
  duration: string;
  loading: boolean;
  error: string | null;
}
