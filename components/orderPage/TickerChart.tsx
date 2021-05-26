import moment from "moment";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

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
  data: {
    data: CandlestickData[];
    min: Coordinate;
    max: Coordinate;
  };
  time: string; // ISO Format
}

/**
 * [ time, low, high, open, close, volume ],
 */
export type CandlestickData = number[];
export type ConvertedCandlestickData = any[];

export interface TickerChartProps {
  type: TickerChartTypes;
  symbol: string;
}

export type Coordinate = {
  x: number;
  y: number;
};

export const TickerChart: React.FC<TickerChartProps> = ({
  symbol = "BTC-USD",
}) => {
  const [chartType, setChartType] = useState(
    "candlestick" as "line" | "candlestick"
  );
  const [httpWorker, setHttpWorker] = useState(null);
  const [loading, setLoading] = useState(false);
  const [marker, setMarker] = useState(moment());
  const [currentIntervalTimer, setCurrentIntervalTimer] = useState(null);
  const [theInterval, setTheInterval] = useState(60); // in seconds
  const [grainularity, setGrainularity] = useState("1m");
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
        points: [],
      },
      tooltip: {
        marker: {
          show: true,
        },
        custom: ({
          series,
          seriesIndex,
          dataPointIndex,
          w,
        }: {
          series: number[][];
          seriesIndex: number;
          dataPointIndex: number;
          w: {
            globals: {
              labels: number[];
            };
            config: {
              series: { data: CandlestickData }[];
            };
          };
        }) => {
          const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
          const intervals = {
            "1m": [23 - dataPointIndex, "minute"],
            "5m": [(23 - dataPointIndex) * 5, "minute"],
            "15m": [(23 - dataPointIndex) * 15, "minute"],
            "1hr": [23 - dataPointIndex, "hour"],
            "6hr": [(23 - dataPointIndex) * 6, "hour"],
            "1d": [23 - dataPointIndex, "day"],
          };
          return `
          <div class="tooltip-wrapper">
            <div class="x">${moment()
              .subtract(intervals[grainularity][0], intervals[grainularity][1])
              .format("MMMM Do YYYY, h:mm a")}</div>
            <div class="high data-row alt2">
              <div>High</div>
              <div>$${dataPoint[2].toLocaleString()}</div>
            </div>
            <div class="open data-row alt1">
              <div>Open</div>
              <div>$${dataPoint[3].toLocaleString()}</div>
            </div>
            <div class="close data-row alt2">
              <div>Close</div>
              <div>$${dataPoint[4].toLocaleString()}</div>
            </div>
            <div class="low data-row alt1">
              <div>Low</div>
              <div>$${dataPoint[1].toLocaleString()}</div>
            </div>
          </div>
            <style>
              div {
                font-family: 'Inter', sans-serif;
                font-weight: 500;
              }

              .x {
                color: white;
                background-color: #121212;
                padding: 0.4vw 0.2vw;
                margin-bottom: 0.4vw;
              }

              .alt1 {
                background-color: #121212;
                color: white;
              }

              .alt2 {
                color: #121212;
              }

              .data-row {
                position: relative;
                padding: 0.1vw 0.2vw;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }

              .pipe-icon {
                position: absolute;
                width: 0.2vw;
                height: 100%;
                background-color: blue;
              }

              .pipe-icon, .high {

              }
            </style>
          `;
        },
      },
    },
  });

  const chartDataParsers = {
    smooth: (someData: CandlestickData[]) => someData.map((el) => el[4]), // returns close price
    candles: (someData: CandlestickData[]) => someData,
  };

  const loadTickerData = async () => {
    const cData = await fetchSymbolHistory(symbol, grainularity);
    setData(
      cData.data.reverse().map((val, index) => {
        return val;
      })
    );
    setChartState({
      options: {
        ...chartState.options,
        annotations: {
          ...chartState.options.annotations,
          points: [
            {
              x: cData.min.x,
              y: cData.min.y,
              marker: {
                size: 0,
              },
              label: {
                borderColor: "none",
                text: `$${cData.min.y.toLocaleString()}`,
                style: {
                  color: "#FFFFFF",
                  cssClass: "candlestick-chart-annotation-label",
                  background: "none",
                  border: "none",
                },
                offsetY: 43,
              },
            },
            {
              x: cData.max.x,
              y: cData.max.y,
              marker: {
                size: 0,
              },
              label: {
                borderColor: "none",
                text: `$${cData.max.y.toLocaleString()}`,
                style: {
                  color: "#FFFFFF",
                  cssClass: "candlestick-chart-annotation-label",
                  background: "none",
                  border: "none",
                },
              },
            },
          ],
        },
      },
    });
  };

  useEffect(() => {
    const grainularityTable = {
      "1m": 60,
      "5m": 300,
      "15m": 900,
      "1hr": 3600,
      "6hr": 21600,
      "1d": 86400,
    };

    loadTickerData();
    setTheInterval(grainularityTable[grainularity]);
    clearInterval(currentIntervalTimer);
    setCurrentIntervalTimer(null);
    setLoading(true);
  }, [grainularity]);

  useEffect(() => {
    if (!httpWorker) {
      setHttpWorker(new Worker());
    }

    const candlestickChannel = new BroadcastChannel("candlestick");

    const channelLogic = () => {
      const now = moment();
      candlestickChannel.postMessage(
        JSON.stringify({
          from: "tickerChart",
          interval: grainularity,
          symbol: "BTC-USD",
          time: now,
        } as CandlestickMessageData)
      );
    };

    candlestickChannel.onmessage = (event) => {
      const parsedData: CandlestickChannelData = JSON.parse(event.data);
      setLoading(false);
      if (parsedData.from === "coinbase-http-worker") {
        setData(
          parsedData.data.data.reverse().map((val, index) => {
            return val;
          })
        );
        setChartState({
          options: {
            ...chartState.options,
            annotations: {
              ...chartState.options.annotations,
              points: [
                {
                  x: parsedData.data.min.x,
                  y: parsedData.data.min.y,
                  marker: {
                    size: 0,
                  },
                  label: {
                    borderColor: "none",
                    text: `$${parsedData.data.min.y.toLocaleString()}`,
                    style: {
                      color: "#FFFFFF",
                      cssClass: "candlestick-chart-annotation-label",
                      background: "none",
                      border: "none",
                    },
                    offsetY: 43,
                  },
                },
                {
                  x: parsedData.data.max.x,
                  y: parsedData.data.max.y,
                  marker: {
                    size: 0,
                  },
                  label: {
                    borderColor: "none",
                    text: `$${parsedData.data.max.y.toLocaleString()}`,
                    style: {
                      color: "#FFFFFF",
                      cssClass: "candlestick-chart-annotation-label",
                      background: "none",
                      border: "none",
                    },
                  },
                },
              ],
            },
          },
        });
        return setMarker(moment(parsedData.time).add(theInterval));
      }
      return null;
    };

    !currentIntervalTimer &&
      setCurrentIntervalTimer(setInterval(channelLogic, theInterval * 1000));
  }, [currentIntervalTimer]);

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
      <GrainularitySelector intervalStateUpdateFunction={setGrainularity} />
    </div>
  );
};
