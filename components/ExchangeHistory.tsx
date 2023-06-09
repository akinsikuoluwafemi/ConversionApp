import {
  getExchangeHistory,
  selectExchangeHistory,
} from '@/slices/transactionDataSlice';
import { InputSelect, InputWrapper } from '@/utils/style';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChartHistory from './ChartHistory';
import ExchangeHistoryDisplay from './ExchangeHistoryDisplay';
import { getDate, getDuration } from '@/utils/timeConversion';
import { useDispatch, useSelector } from 'react-redux';

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.textdefault};
`;

const ExchangeInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  padding: 1.5rem 0;
`;

const RadioInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  label {
    color: ${({ theme }) => theme.colors.textdefault};
    font-size: 16px;
  }

  input {
    color: ${({ theme }) => theme.colors.textdefault};
    font-size: 16px;
    background: transparent;
    outline: auto;
    border-color: ${({ theme }) => theme.colors.primary};

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    /* Add a custom indicator size and shape */
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.textdefault};
    outline: none;
    cursor: pointer;
  }

  input:checked {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ExchangeHistory = () => {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(7);
  const [historyType, setHistoryType] = useState('Table');

  const end_date = getDate();
  const start_date = getDuration(duration);
  const exchangeHistory = useSelector(selectExchangeHistory);

  useEffect(() => {
    dispatch(
      getExchangeHistory({ start_date, end_date, symbols: 'USD' }) as any,
    );
  }, [duration]);

  return (
    <div>
      <Title> ExchangeHistory</Title>

      <ExchangeInputWrapper>
        <InputWrapper>
          <label htmlFor="from">Duration</label>

          <InputSelect
            onChange={(e) => {
              // run stuff here this is where you run the function
              setDuration(parseInt(e.target.value));
            }}
            id="duration"
            showarrow={true}
          >
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="30">30 days</option>
          </InputSelect>
        </InputWrapper>
        <RadioInput>
          <input
            defaultChecked
            onChange={(e) => setHistoryType(e.target.value)}
            type="radio"
            id="table"
            value="Table"
            name="history"
          />{' '}
          <label htmlFor="table">Table</label>
          <input
            onChange={(e) => setHistoryType(e.target.value)}
            type="radio"
            id="chart"
            value="Chart"
            name="history"
          />{' '}
          <label htmlFor="chart">Chart</label>
        </RadioInput>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </ExchangeInputWrapper>

      {historyType === 'Chart' ? (
        <ChartHistory exchangeHistory={exchangeHistory} />
      ) : (
        <ExchangeHistoryDisplay exchangeHistory={exchangeHistory} />
      )}
    </div>
  );
};

export default ExchangeHistory;
