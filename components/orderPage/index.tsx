import { useState } from "react";
import styled from "styled-components";
import { StyledScreenWrapper } from "../shared/layout";
import { symbolDisplays } from "../shared/components";
import { Header } from "./Header";
import { PriceDisplay } from "./PriceDisplay";

export interface OrderPageProps {}

const StyledOrderPageWrapper = styled(StyledScreenWrapper)`
  display: grid;
  place-items: center;
`;

export const OrderPage: React.FC<OrderPageProps> = () => {
  const [state, setState] = useState({
    symbol: "BTC-USD",
  });

  return (
    <StyledOrderPageWrapper>
      <Header symbol={state.symbol} />
      {symbolDisplays[state.symbol]}
      <PriceDisplay />
    </StyledOrderPageWrapper>
  );
};
