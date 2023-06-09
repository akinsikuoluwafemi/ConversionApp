import { ConvertCurrency, Transaction } from '@/types/globalTypes';
import { InputSelect, InputWrapper } from '@/utils/style';
import { getDate, getTime } from '@/utils/timeConversion';
import { convertionSchema } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
  convertToAnotherCurrency,
  selectAmount,
  selectFromCurrency,
  selectToCurrency,
  setAmount,
  setConversionHistory,
  setConversionRate,
  setConvertedValue,
  setFromCurrency,
  setToCurrency,
  setToggle,
} from '@/slices/transactionDataSlice';
import { uuid } from 'uuidv4';

const InputNumber = styled.input`
  border: none;
  outline: none;
  width: 200px;
  padding: 0.4rem 0;
  background: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.tabletext};
  color: ${({ theme }) => theme.colors.textdefault};
`;
const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 2rem 0;
  flex-wrap: wrap;
`;
const CompareCtn = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  background: #fff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  border-radius: 5px;
`;
const ErrorText = styled.small`
  color: red;
  font-size: 10px;
  margin-bottom: 10px;
  align-self: flex-start;
`;
const ConvertBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.8rem 1.6rem;
  border-radius: 1px;
  border: none;
  outline: none;
  cursor: pointer;
`;

interface ConversionFormProps {
  currencies: string[];
}

const ConversionForm = ({ currencies }: ConversionFormProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConvertCurrency>({
    resolver: yupResolver(convertionSchema),
  });

  const fromCur = useSelector(selectFromCurrency);
  const toCur = useSelector(selectToCurrency);
  const amt = useSelector(selectAmount);

  const [newData, setNewData] = useState<Transaction>({
    id: uuid(),
    time: getTime(),
    date: getDate(),
    from: fromCur,
    to: toCur,
    amount: amt,
  });
  const [toggleCurrency, setToggleCurrency] = useState<boolean>(false);

  const onSubmit = async (data: ConvertCurrency) => {
    if (!data.amount || !data.from || !data.to) return;

    if (data?.to === data?.from) {
      alert('You cannot convert the same currency');
      return;
    }
    dispatch(setAmount(data?.amount) as any);
    dispatch(
      convertToAnotherCurrency({
        from: newData?.from,
        to: newData?.to,
        amount: newData?.amount,
      }) as any,
    );

    const transaction: Transaction = {
      id: uuid(),
      from: newData?.from,
      amount: newData?.amount,
      to: newData?.to,
      time: getTime(),
      date: getDate(),
    };

    dispatch(setConversionHistory(transaction) as any);
  };

  const toggle = () => {
    if (!newData) return;
    setToggleCurrency((prev) => !prev);
    const { from, to, amount } = newData!;

    toggleCurrency
      ? setNewData({
          from: to,
          to: from,
          amount,
          id: uuid(),
          time: getTime(),
          date: getDate(),
        })
      : setNewData({
          from: to,
          to: from,
          amount,
          id: uuid(),
          time: getTime(),
          date: getDate(),
        });
  };

  const swapCurrencies = () => {
    toggle();
    dispatch(setToggle(toggleCurrency) as any);
    dispatch(setFromCurrency(newData?.to) as any);
    dispatch(setToCurrency(newData?.from) as any);
    dispatch(setAmount(0) as any);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <label htmlFor="amount">Amount</label>
        <InputNumber
          value={newData?.amount}
          type="number"
          id="amount"
          placeholder="0"
          min="0"
          {...register('amount', {
            onChange: (e) => {
              setNewData({
                ...newData,
                amount: parseInt(e.target.value),
              });

              dispatch(setAmount(0) as any);
              dispatch(setConvertedValue(0) as any);
              dispatch(setConversionRate(0) as any);
            },
          })}
        />
        {errors.amount && <ErrorText>{errors.amount?.message}</ErrorText>}
      </InputWrapper>

      <InputWrapper>
        <label htmlFor="from">From</label>

        <InputSelect
          value={newData?.from}
          {...register('from', {
            onChange: (e) => {
              setNewData({
                ...newData,
                from: e.target.value,
                amount: newData?.amount,
              });
              dispatch(setFromCurrency(e.target.value) as any);
            },
          })}
          id="from"
        >
          <option value="">Select</option>
          {currencies?.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </InputSelect>

        {errors.from && <ErrorText>{errors.from?.message}</ErrorText>}
      </InputWrapper>

      <CompareCtn
        type="button"
        disabled={!newData?.from || !newData?.to || !newData?.amount}
        onClick={() => {
          swapCurrencies();
        }}
      >
        <Image
          src="compare_arrows.svg"
          alt="compare arrow"
          width={30}
          height={30}
        />
      </CompareCtn>

      <InputWrapper>
        <label htmlFor="to">To</label>

        <InputSelect
          value={newData?.to}
          {...register('to', {
            onChange: (e) => {
              setNewData({
                ...newData,
                to: e.target.value,
                amount: newData?.amount,
              });
              dispatch(setToCurrency(e.target.value) as any);
            },
          })}
          id="to"
        >
          <option value="">Select</option>
          {currencies?.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </InputSelect>

        {errors.to && <ErrorText>{errors.to?.message}</ErrorText>}
      </InputWrapper>

      <ConvertBtn type="submit">Convert</ConvertBtn>
    </Form>
  );
};

export default ConversionForm;
