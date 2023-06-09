import { AllCurrencies } from '@/types/globalTypes';

export const getCurr = (obj: AllCurrencies) => {
  const currencies = Object.keys(obj.rates);
  return currencies;
};

export const getRate = (value: string, obj: AllCurrencies) => {
  return obj.rates[value];
};

export function numberWithCommas(x: number | any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
