import {
  selectAmount,
  selectConversionRate,
  selectFromCurrency,
  selectToCurrency,
  selectToggle,
} from '@/slices/transactionDataSlice';
import { numberWithCommas } from '@/utils/ConvertCurrency';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const CurrencyConvertDisplay = styled.div`
  margin: 0 auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const DisplayContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  span:first-child {
    font-size: 46px;
    font-weight: normal;
    color: ${({ theme }) => theme.colors.textdefault};
  }

  span:nth-child(2) {
    font-size: 46px;
    color: ${({ theme }) => theme.colors.textdefault};
  }

  span:last-child {
    font-size: 46px;
    font-weight: 700;

    color: ${({ theme }) => theme.colors.accent};
  }
`;

const CurrencyRateWrapper = styled.div`
  padding-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.tabletext};
  font-size: 16px;
`;

const ConvertedCurrencyDisplay = () => {
  const amount = useSelector(selectAmount) || 0;
  const from = useSelector(selectFromCurrency);
  const to = useSelector(selectToCurrency);

  const rate = useSelector(selectConversionRate);

  const toggle = useSelector(selectToggle);

  const convertedAmount = () => {
    return toggle ? (
      <> {rate ? ((1 / rate) * amount).toFixed(3) : 0}</>
    ) : (
      <> {rate ? (rate * amount).toFixed(3) : 0}</>
    );
  };

  const toAmount = () => {
    return toggle ? (
      <> {rate ? (1 / rate).toFixed(3) : 0}</>
    ) : (
      <> {rate ? rate.toFixed(3) : 0}</>
    );
  };

  const fromAmount = () => {
    return !toggle ? (
      <> {rate ? (1 / rate).toFixed(3) : 0}</>
    ) : (
      <> {rate ? rate.toFixed(3) : 0}</>
    );
  };

  return (
    <div>
      <CurrencyConvertDisplay>
        <DisplayContent>
          <span>
            {numberWithCommas(amount)} {from}
          </span>
          <span>=</span>
          <span>
            {convertedAmount()} {to}
          </span>
        </DisplayContent>

        <CurrencyRateWrapper>
          <span>1 {from}</span>
          <span>=</span>
          <span>
            {toAmount()}
            {to}
          </span>
        </CurrencyRateWrapper>

        <CurrencyRateWrapper>
          <span>1 {to}</span>
          <span>=</span>
          <span>
            {fromAmount()}
            {from}
          </span>
        </CurrencyRateWrapper>
      </CurrencyConvertDisplay>
    </div>
  );
};

export default ConvertedCurrencyDisplay;
