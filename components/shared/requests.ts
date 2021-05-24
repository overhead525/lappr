import moment from "moment";
import { CandlestickData, Coordinate } from "../orderPage/TickerChart";
import axios, { AxiosResponse } from "axios";

/**
 * The API endpoint for Coinbase HTTP Requests
 */
const COINBASE_PRO_API_ENDPOINT = "https://api.pro.coinbase.com";

/**
 * Each TickerChart will always display 24 data points. To
 * get the start date of the historic data, we simply retrace
 * back 24 * <interval>.
 */
const intervals: {
  [interval: string]: {
    getStart: () => moment.Moment;
    getEnd: () => moment.Moment;
    getGranularity: () => number; // seconds
  };
} = {
  "1m": {
    getStart: () => {
      const start = moment().subtract(24, "minutes");
      return start;
    },
    getEnd: () => {
      const end = moment();
      return end;
    },
    getGranularity: () => {
      return 60; // seconds
    },
  },
  "5m": {
    getStart: () => {
      const start = moment().subtract(24 * 5, "minutes");

      return start;
    },
    getEnd: () => {
      return moment();
    },
    getGranularity: () => {
      return 60 * 5; // seconds
    },
  },
  "15m": {
    getStart: () => {
      const start = moment().subtract(24 * 15, "minutes");

      return start;
    },
    getEnd: () => {
      return moment();
    },
    getGranularity: () => {
      return 60 * 15; // seconds
    },
  },
  "1hr": {
    getStart: () => {
      const start = moment().subtract(24, "hours");
      return start;
    },
    getEnd: () => {
      return moment();
    },
    getGranularity: () => {
      return 60 * 60; // seconds
    },
  },
  "6hr": {
    getStart: () => {
      const start = moment().subtract(24 * 4, "hours");

      return start;
    },
    getEnd: () => {
      return moment();
    },
    getGranularity: () => {
      return 60 * 60 * 6; // seconds
    },
  },
  "1d": {
    getStart: () => {
      const start = moment().subtract(24, "days");
      return start;
    },
    getEnd: () => {
      return moment();
    },
    getGranularity: () => {
      return 60 * 60 * 24; // seconds
    },
  },
};

export const findMaxOfCandlestickDataArray = (
  candlestickDataArr: CandlestickData[]
): Coordinate => {
  const maxPriceInPeriod = Math.max(...candlestickDataArr.map((cD) => cD[2]));
  const indexOfMax = candlestickDataArr.findIndex(
    (cD) => cD[2] === maxPriceInPeriod
  );
  const xCoord = candlestickDataArr[indexOfMax][0];

  const coords = { x: xCoord, y: maxPriceInPeriod };
  console.log(coords);
  return coords;
};

export const findMinOfCandlestickDataArray = (
  candlestickDataArr: CandlestickData[]
): Coordinate => {
  const minPriceInPeriod = Math.min(...candlestickDataArr.map((cD) => cD[2]));
  const indexOfMin = candlestickDataArr.findIndex(
    (cD) => cD[2] === minPriceInPeriod
  );
  const xCoord = candlestickDataArr[indexOfMin][0];

  const coords = { x: xCoord, y: minPriceInPeriod };
  console.log(coords);
  return coords;
};

/**
 * Sends an HTTP Request to Coinbase Pro API to retrieve
 * historic data on a particular symbol.
 */
export const fetchSymbolHistory = async (
  symbol: string,
  interval: string
): Promise<{ data: CandlestickData[]; min: Coordinate; max: Coordinate }> => {
  try {
    const now = moment();
    const intervalObject = intervals[interval];
    const url = COINBASE_PRO_API_ENDPOINT + `/products/${symbol}/candles`;
    const params = {
      start: intervalObject.getStart(),
      end: intervalObject.getEnd(),
      granularity: intervalObject.getGranularity(),
    };

    /**
     * [timestamp , low,     high,     open,     close,   volume     ]
     * [1621523340, 41860.6, 41945.64, 41892.51, 41925.8, 30.49113698]
     */
    const response: AxiosResponse<number[][]> = await axios.get(url, {
      params: {
        ...params,
        start: params.start.toISOString(),
        end: params.end.toISOString(),
      },
    });

    /**
     *
     * @param coinbaseResponse
     * This function changes the array order to
     * [timestamp, open, high, low, close]
     */
    const formatCandlestickData = (cR: number[]): number[] => {
      if (cR.length !== 6)
        throw new Error(
          `The length of the response data is incorrect. Should be 6, but got ${cR.length}`
        );

      const formattedData = [
        cR[0], // timestamp
        cR[3], // open
        cR[2], // high
        cR[1], // low
        cR[4], // close
      ];

      return formattedData;
    };

    const result = response.data.map((grain) => formatCandlestickData(grain));

    return {
      data: result,
      min: findMinOfCandlestickDataArray(result),
      max: findMaxOfCandlestickDataArray(result),
    } as {
      data: CandlestickData[];
      min: Coordinate;
      max: Coordinate;
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
