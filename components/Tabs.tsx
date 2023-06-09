'use client';
import { selectTabNumber, setTabNumber } from '@/slices/tabDataSlice';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ConversionHistory from './ConversionHistory';
import CurrencyConvert from './CurrencyConvert';

const TabContentWrapper = styled.div`
  background: #e7e8e9;
  width: 100vw;
  height: auto;
  padding: 2rem 6rem;
`;

const TabHeader = styled.header`
  background: #fff;
  width: 100vw;
  padding: 1rem 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon {
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 0.5rem;
  }

  ul:first-child {
    // background: red;
    flex: 1 1 20%;
  }

  ul:nth-child(2) {
    // background: yellow;
    flex: 1 1 80%;
    padding-right: 13rem;
  }

  ul:last-child {
    // background: green;
    flex: 1 1 20%;
    text-align: right;
    font-weight: 700;
  }

  .d-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.textdefault};
    text-transform: uppercase;
    gap: 2rem;

    li {
      cursor: pointer;
      position: relative;

      .active {
        font-weight: 700;
      }

      .not-active {
        border-bottom: none;
        font-weight: 400;
      }

      .tab-line-1 {
        width: 185px;
        height: 2px;
        background: ${({ theme }) => theme.colors.primary};
        position: absolute;
        top: 40px;
        left: -2px;
      }

      .tab-line-2 {
        width: 220px;
        height: 2px;
        background: ${({ theme }) => theme.colors.primary};
        position: absolute;
        top: 40px;
        left: -2px;
      }

      span {
      }
    }
  }

  .logout {
    color: ${({ theme }) => theme.colors.primary};
    text-transform: uppercase;
    font-size: 16px;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.textdefault};

    span {
      font-weight: 700;
      letter-spacing: 1px;
    }
  }
`;

const Tabs = () => {
  const tabNumber = useSelector(selectTabNumber);

  return (
    <div>
      <TabsHeader />
      <TabContentWrapper>
        {tabNumber === 1 ? <CurrencyConvert /> : <ConversionHistory />}
      </TabContentWrapper>
    </div>
  );
};

const TabsHeader = () => {
  const tabNumber = useSelector(selectTabNumber);

  const dispatch = useDispatch();

  return (
    <TabHeader>
      <ul>
        <ListItem>
          <Image
            className="icon"
            src="currency-logo.svg"
            width={30}
            height={30}
            alt="currency logo"
          />
          <p>
            Currency
            <span>Exchange</span>
          </p>
        </ListItem>
      </ul>
      <ul className="d-flex">
        <li>
          <span
            className={`${tabNumber === 1 ? 'active ' : 'not-active'}`}
            onClick={() => dispatch(setTabNumber(1))}
          >
            currency converter
          </span>
          {tabNumber === 1 && <span className="tab-line-1">&nbsp;</span>}
        </li>

        <li>
          <span
            className={`${tabNumber === 2 ? 'active ' : 'not-active'}`}
            onClick={() => dispatch(setTabNumber(2))}
          >
            view conversion history
          </span>
          {tabNumber === 2 && <span className="tab-line-2">&nbsp;</span>}
        </li>
      </ul>

      <ul>
        <li>
          <span className="logout">Logout</span>
        </li>
      </ul>
    </TabHeader>
  );
};

export default Tabs;
