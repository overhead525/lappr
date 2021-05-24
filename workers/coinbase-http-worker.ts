import moment from "moment";
import {
  CandlestickChannelData,
  CandlestickMessageData,
} from "../components/orderPage/TickerChart";
import {
  fetchSymbolHistory,
  findMaxOfCandlestickDataArray,
  findMinOfCandlestickDataArray,
} from "../components/shared/requests";

const candlestickChannel = new BroadcastChannel("candlestick");

candlestickChannel.onmessage = async (event) => {
  console.log("worker received message from tickerChart component");
  const parsedData: CandlestickMessageData = JSON.parse(event.data);
  if (parsedData.from === "tickerChart") {
    const data = await fetchSymbolHistory(
      parsedData.symbol,
      parsedData.interval
    );
    candlestickChannel.postMessage(
      JSON.stringify({
        from: "coinbase-http-worker",
        data,
        time: moment().toISOString(),
      } as CandlestickChannelData)
    );
  }
  return null;
};
