import { useState } from "react";
import styled from "styled-components";
import { StyledScreenWrapper } from "../shared/layout";
import { symbolDisplays } from "../shared/components";
import { Header } from "./Header";
import { PriceDisplay } from "./PriceDisplay";
import { TickerChart, TickerChartTypes } from "./TickerChart";
import { SymbolDisplay } from "./SymbolDisplay";

export interface OrderPageProps {}

const StyledOrderPageWrapper = styled(StyledScreenWrapper)`
  display: grid;
  place-items: center;
`;

const OrderPage: React.FC<OrderPageProps> = () => {
  const [state, setState] = useState({
    symbol: "ETH-USD",
  });

  return (
    <StyledOrderPageWrapper>
      <Header symbol={state.symbol} />
      <SymbolDisplay
        cryptoLogoURL="/bitcoin-btc-logo.png"
        invert={null}
        symbol={state.symbol}
      />
      <div style={{ width: "100%" }}>
        <PriceDisplay />
      </div>
      <TickerChart type={TickerChartTypes.candles} symbol="BTC-USD" />
    </StyledOrderPageWrapper>
  );
};

export default OrderPage;
