import { Sparklines, SparklinesLine } from 'react-sparklines';
import { ExchangeHistory } from '@/types/globalTypes';

interface ChartHistoryProps {
  exchangeHistory: ExchangeHistory;
}

const ChartHistory = ({ exchangeHistory }: ChartHistoryProps) => {
  const chatData = () => {
    const data =
      exchangeHistory &&
      Object.entries(exchangeHistory ?? {})
        .map(([date, values]) => ({
          rate: values?.USD,
        }))
        .map(({ rate }) => rate);

    return data;
  };

  return (
    <div>
      <Sparklines data={chatData()} width={120} height={20}>
        <SparklinesLine color="#009688" />
      </Sparklines>
    </div>
  );
};

export default ChartHistory;
