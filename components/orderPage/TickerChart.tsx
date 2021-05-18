import { useEffect, useState } from "react";
import styled from "styled-components";

// @ts-ignore
import Worker from "worker-loader!../../workers/coinbase-socket-worker";

export enum TickerChartTypes {
  smooth = "smooth",
  candles = "candles",
}

export interface TickerChartProps {
  type: TickerChartTypes;
}

export const TickerChart: React.FC<TickerChartProps> = () => {
  const [price, setPrice] = useState(50000);

  useEffect(() => {
    const worker = new Worker();

    const tickerChannel = new BroadcastChannel("ticker");

    tickerChannel.onmessage = (event) => {
      const parsedData: { from: string; price: number } = JSON.parse(
        event.data
      );
      if (parsedData.from === "coinbase-socket-worker") {
        setPrice(parsedData.price);
      }
    };
  }, []);

  return (
    <div>
      <p>{price}</p>
    </div>
  );
};
