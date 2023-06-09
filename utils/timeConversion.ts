import moment from 'moment';

export const getTime = () => {
  return moment().format('LT');
};

export const getDate = () => {
  return moment().format('YYYY-MM-DD');
};

export const getDuration = (value: number) => {
  const duration = moment().subtract(value, 'days').calendar();
  return moment(duration).format('YYYY-MM-DD');
};

export const convertDate = (date: string) => {
  return moment(moment(date).format('L')).format('DD/MM/YYYY');
};
