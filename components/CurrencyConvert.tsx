import { AllCurrencies } from '@/types/globalTypes';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import ConvertedCurrencyDisplay from './ConvertedCurrencyDisplay';
import { HeroText } from '@/utils/style';
import ExchangeHistory from './ExchangeHistory';
import { getCurr } from '@/utils/ConvertCurrency';
import {
  getAllCurrencies,
  selectAllCurrencies,
} from '../slices/transactionDataSlice';
import ConversionForm from './ConversionForm';

const CurrencyConvertWrapper = styled.section`
  height: 100vh;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background: #999;
  margin: 2rem 0;
  opacity: 0.4;
`;

const CurrencyConvert = () => {
  const dispatch = useDispatch();
  const allCurrencies = useSelector(selectAllCurrencies);
  const currencies = getCurr(allCurrencies as AllCurrencies);

  useEffect(() => {
    dispatch(getAllCurrencies() as any);
  }, []);

  return (
    <CurrencyConvertWrapper>
      <HeroText>I want to Convert</HeroText>

      <ConversionForm currencies={currencies} />

      <ConvertedCurrencyDisplay />

      <HorizontalLine />

      <ExchangeHistory />
    </CurrencyConvertWrapper>
  );
};

export default CurrencyConvert;
