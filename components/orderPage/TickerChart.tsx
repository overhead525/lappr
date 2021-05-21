import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

// @ts-ignore
import Worker from "worker-loader!../../workers/coinbase-http-worker";
import { fetchSymbolHistory } from "../shared/requests";
import { GrainularitySelector } from "./GrainularitySelector";

export enum TickerChartTypes {
  smooth = "smooth",
  candles = "candles",
}

export interface CandlestickMessageData {
  from: string;
  interval: string;
  symbol: string;
  time: moment.Moment;
}

export interface CandlestickChannelData {
  from: string;
  data: CandlestickData[];
  time: string; // ISO Format
}

/**
 * [ time, low, high, open, close, volume ],
 */
export type CandlestickData = number[];

export interface TickerChartProps {
  type: TickerChartTypes;
  symbol: string;
}

const findMaxOfCandlestickDataArray = (
  candlestickDataArr: CandlestickData[]
): {
  x: number;
  y: number;
} => {
  const maxPriceInPeriod = Math.max(...candlestickDataArr.map((cD) => cD[2]));
  const indexOfMax = candlestickDataArr.findIndex(
    (cD) => cD[2] === maxPriceInPeriod
  );
  const xCoord = candlestickDataArr[indexOfMax][0];

  return { x: xCoord, y: maxPriceInPeriod };
};

const findMinOfCandlestickDataArray = (
  candlestickDataArr: CandlestickData[]
): {
  x: number;
  y: number;
} => {
  const minPriceInPeriod = Math.min(...candlestickDataArr.map((cD) => cD[2]));
  const indexOfMin = candlestickDataArr.findIndex(
    (cD) => cD[2] === minPriceInPeriod
  );
  const xCoord = candlestickDataArr[indexOfMin][0];

  return { x: xCoord, y: minPriceInPeriod };
};

export const TickerChart: React.FC<TickerChartProps> = ({
  symbol = "BTC-USD",
}) => {
  const [chartType, setChartType] = useState(
    "candlestick" as "line" | "candlestick"
  );
  const [marker, setMarker] = useState(moment());
  const [theInterval, setTheInterval] = useState(60); // in seconds
  const [data, setData] = useState(null as CandlestickData[]);
  const [chartState, setChartState] = useState({
    options: {
      chart: {
        id: "tickerChart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      annotations: {
        points: [
          {
            x: 1621609500,
            y: 37471.51,
            marker: {
              size: 0,
            },
            label: {
              borderColor: "none",
              text: "Bruh",
              style: {
                color: "#FFFFFF",
                background: "none",
                border: "none",
              },
            },
          },
        ],
      },
    },
  });

  const chartDataParsers = {
    smooth: (someData: CandlestickData[]) => someData.map((el) => el[4]), // returns close price
    candles: (someData: CandlestickData[]) => someData,
  };

  const loadTickerData = async () => {
    const cData = await fetchSymbolHistory(symbol, "1m");
    setData(cData);
  };

  useEffect(() => {
    !data && loadTickerData();
  }, []);

  useEffect(() => {
    const worker = new Worker();

    const candlestickChannel = new BroadcastChannel("candlestick");

    const channelLogic = () => {
      const now = moment();
      console.log("message sent to coinbase-http-worker");
      candlestickChannel.postMessage(
        JSON.stringify({
          from: "tickerChart",
          interval: "1m",
          symbol: "BTC-USD",
          time: now,
        } as CandlestickMessageData)
      );
    };

    candlestickChannel.onmessage = (event) => {
      const parsedData: CandlestickChannelData = JSON.parse(event.data);
      if (parsedData.from === "coinbase-http-worker") {
        setData(parsedData.data);
        return setMarker(moment(parsedData.time).add(theInterval));
      }
      return null;
    };

    setInterval(channelLogic, theInterval * 1000);
  }, []);

  return (
    <div>
      {data && (
        <Chart
          options={chartState.options}
          series={[
            {
              name: "prices",
              data,
            },
          ]}
          type={chartType}
          width="100%"
          height="100%"
        />
      )}
      <GrainularitySelector />
    </div>
  );
};
