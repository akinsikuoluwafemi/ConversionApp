import * as Yup from 'yup';

export const convertionSchema = Yup.object().shape({
  amount: Yup.number().required('Required'),
  from: Yup.string().required('Required'),
  to: Yup.string().required('Required'),
});
