import { useEffect, useState } from "react";
import styled from "styled-components";
// @ts-ignore
import Worker from "worker-loader!../../workers/coinbase-socket-worker";

export interface PriceDisplayProps {}

export const StyledPriceDisplayWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100&display=swap");
  font-family: "Inter", sans-serif;

  display: flex;
  justify-content: center;
  align-content: flex-start;

  margin-bottom: 1vw;
`;

export const StyledDollarSign = styled.div`
  font-weight: 100;
  color: white;
  font-size: 5vw;
`;

export const StyledDollars = styled.div`
  font-weight: 500;
  color: white;
  font-size: 10.6vw;
  line-height: 10.6vw;
`;

export const StyledCents = styled.div`
  font-weight: 400;
  color: white;
  font-size: 4.4vw;
`;

export const PriceDisplay: React.FC<PriceDisplayProps> = () => {
  const [price, setPrice] = useState(48938.32);
  const [dollars, cents] = price.toFixed(2).split(".");
  const [socketWorkerPresent, setSocketWorkerPresent] = useState(false);

  useEffect(() => {
    if (!socketWorkerPresent) {
      new Worker();
      setSocketWorkerPresent(true);
    }

    const tickerChannel = new BroadcastChannel("ticker");

    tickerChannel.onmessage = (e) => {
      setPrice(JSON.parse(e.data).price);
    };
  }, []);

  return (
    <StyledPriceDisplayWrapper>
      <StyledDollarSign>$</StyledDollarSign>
      <StyledDollars>{parseInt(dollars).toLocaleString()}</StyledDollars>
      <StyledCents>{"." + cents}</StyledCents>
    </StyledPriceDisplayWrapper>
  );
};
