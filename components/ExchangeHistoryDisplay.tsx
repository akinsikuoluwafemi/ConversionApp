import { ExchangeHistory, IHistory } from '@/types/globalTypes';
import { getAverage, getHighest, getLowest } from '@/utils/stats';
import { convertDate } from '@/utils/timeConversion';
import React from 'react';
import styled from 'styled-components';

const DisplayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const HistoryDisplayWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  // margin: 2rem 0;
  width: 100%;
  height: 270px;
  overflow-y: scroll;
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
  }
`;

const StatsDisplayWrapper = styled.div`
  display: flex;
  width: 100%;
`;

interface ExchangeHistoryDisplayProps {
  exchangeHistory: ExchangeHistory;
}

const ExchangeHistoryDisplay = ({
  exchangeHistory,
}: ExchangeHistoryDisplayProps) => {
  const changeHistory =
    exchangeHistory &&
    (Object.entries(exchangeHistory ?? {}).map(([date, values]) => ({
      date,
      rate: values?.USD,
    })) as IHistory[]);

  const highest = getHighest(changeHistory);
  const lowest = getLowest(changeHistory);
  const average = getAverage(changeHistory);

  return (
    <DisplayWrapper>
      <HistoryDisplayWrapper>
        <HistoryTable>
          <thead>
            <tr>
              <th>Date</th>
              <th>Exchange Rate</th>
            </tr>
          </thead>

          <tbody>
            {changeHistory
              ?.sort((a, b) => (a.date < b.date ? 1 : -1))
              .map(({ date, rate }) => (
                <tr key={date}>
                  <td>{date && convertDate(date)}</td>
                  <td>{rate && rate}</td>
                </tr>
              ))}
          </tbody>
        </HistoryTable>
      </HistoryDisplayWrapper>

      {/* second table */}

      <StatsDisplayWrapper>
        <HistoryTable>
          <thead>
            <tr>
              <th>Statistics</th>
              <th
                style={{ color: 'red', transform: 'translateY(-100%)' }}
                className="hide"
              >
                .
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lowest</td>
              <td>{lowest && lowest}</td>
            </tr>
            <tr>
              <td>Highest</td>
              <td>{highest && highest}</td>
            </tr>
            <tr>
              <td>Average</td>
              <td>{average && average}</td>
            </tr>
          </tbody>
        </HistoryTable>
      </StatsDisplayWrapper>
    </DisplayWrapper>
  );
};

export default ExchangeHistoryDisplay;
