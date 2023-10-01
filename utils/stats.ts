import { IHistory } from '@/types/globalTypes';

export const getHighest = (arr: IHistory[]) => {
  return (
    arr && arr?.sort((a, b) => (a.rate < b.rate ? 1 : -1))[0].rate?.toFixed(4)
  );
};

export const getLowest = (arr: IHistory[]) => {
  return (
    arr && arr?.sort((a, b) => (a.rate > b.rate ? 1 : -1))[0].rate?.toFixed(4)
  );
};

export const getAverage = (arr: IHistory[]) => {
  const sum = arr?.reduce((acc, curr) => acc + curr.rate, 0);
  return (sum / arr?.length)?.toFixed(4);
};
