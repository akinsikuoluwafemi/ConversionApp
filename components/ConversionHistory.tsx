import { setTabNumber } from '@/slices/tabDataSlice';
import {
  convertToAnotherCurrency,
  removeTransactionFromHistory,
  selectConversionHistory,
  setAmount,
  setConversionHistory,
  setFromCurrency,
  setToCurrency,
} from '@/slices/transactionDataSlice';
import { Transaction } from '@/types/globalTypes';
import { numberWithCommas } from '@/utils/ConvertCurrency';
import { HeroText } from '@/utils/style';
import { convertDate, getDate, getTime } from '@/utils/timeConversion';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { uuid } from 'uuidv4';

const HistoryDisplayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  height: 270px;
  overflow-y: scroll;

  margin: 2rem 0;
`;

const HistoryTable = styled.table`
  border-collapse: collapse;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  background: #fff;
  overflow-y: scroll;
  max-height: 270px;
  border-radius: 5px;

  width: 100%;
  th {
    border: none;
    text-align: left;
    color: ${({ theme }) => theme.colors.tabletext};
    padding: 10px;
    border-bottom: 1px solid #ddd;

    .hide {
      opacity: 0;
    }
  }
  td {
    border: none;
    text-align: left;
    padding: 10px;
    color: ${({ theme }) => theme.colors.textdefault};
    border-bottom: 1px solid #ddd;
    opacity: 0.6;
    width: 20%;

    .actions-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0 2.5rem;
    }

    .actions {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
      cursor: pointer;

      &:first-of-type {
        color: ${({ theme }) => theme.colors.primary};
      }
      &:last-of-type {
        color: ${({ theme }) => theme.colors.warn};
      }
    }
  }
`;

const ConversionHistory = () => {
  const allConversionHistory = useSelector(selectConversionHistory);
  const dispatch = useDispatch();
  const [hoveredRow, setHoveredRow] = React.useState(null) as any;

  const handleRowHover = (id: string) => {
    setHoveredRow(id);
  };

  const handleRowLeave = () => {
    setHoveredRow(null);
  };

  const ViewHistory = (obj: Transaction) => {
    dispatch(setTabNumber(1));
    dispatch(
      convertToAnotherCurrency({
        from: obj?.from,
        to: obj?.to,
        amount: obj?.amount,
      }) as any,
    );

    dispatch(
      setConversionHistory({
        ...obj,
        id: uuid(),
        time: getTime(),
        date: getDate(),
      }) as any,
    );

    dispatch(setToCurrency(obj?.to) as any);
    dispatch(setFromCurrency(obj?.from) as any);
    dispatch(setAmount(obj?.amount) as any);
  };

  return (
    <div>
      <HeroText>Conversion history</HeroText>

      <HistoryDisplayWrapper>
        <HistoryTable>
          <thead>
            <tr>
              <th>Date</th>
              <th>Event</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allConversionHistory.map((record, index) => (
              <tr
                onMouseEnter={() => {
                  handleRowHover(record.id);
                }}
                onMouseLeave={() => {
                  handleRowLeave();
                }}
                key={record.id}
              >
                <td>
                  {convertDate(record.date)} @ {record.time}
                </td>
                <td>
                  Converted an amount of {numberWithCommas(record.amount)} from{' '}
                  {record.from} TO {record.to}
                </td>
                <td>
                  {hoveredRow === record.id && (
                    <div className="actions-wrapper">
                      <div
                        onClick={() => ViewHistory(record)}
                        className="actions"
                      >
                        <Image
                          src="/visibility.svg"
                          alt="view"
                          width={20}
                          height={20}
                        />
                        View
                      </div>
                      <div
                        onClick={() =>
                          dispatch(
                            removeTransactionFromHistory(record.id) as any,
                          )
                        }
                        className="actions"
                      >
                        <Image
                          src="/delete.svg"
                          alt="view"
                          width={20}
                          height={20}
                        />
                        Delete from history
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </HistoryTable>
      </HistoryDisplayWrapper>
    </div>
  );
};

export default ConversionHistory;
