import { useState } from "react";
import styled from "styled-components";

export interface PriceDisplayProps {}

export const StyledPriceDisplayWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100&display=swap");
  font-family: "Inter", sans-serif;

  display: flex;
  justify-content: center;
  align-content: flex-start;
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

  return (
    <StyledPriceDisplayWrapper>
      <StyledDollarSign>$</StyledDollarSign>
      <StyledDollars>{parseInt(dollars).toLocaleString()}</StyledDollars>
      <StyledCents>{"." + cents}</StyledCents>
    </StyledPriceDisplayWrapper>
  );
};
