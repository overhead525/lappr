import { useEffect, useState } from "react";
import styled from "styled-components";
// @ts-ignore
import Worker from "worker-loader!../../workers/coinbase-socket-worker";

export interface SymbolHeaderProps {
  symbol: string;
  theme: "light" | "dark";
}

const StyledSymbolHeaderContentWrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap");

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  font-family: "Inter", sans-serif;
  font-weight: 900;
  color: ${(props) => {
      const options = {
        light: "#000000;",
        dark: "#FFFFFF;",
      };
      return options[props.theme] ? options[props.theme] : options.light;
    }}
    h1 {
    font-size: 5.9vw;
  }
`;

const StyledPriceHeader = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap");

  font-family: "Roboto Mono", monospace;
`;

export const SymbolHeader: React.FC<SymbolHeaderProps> = ({
  symbol,
  theme,
}) => {
  const [price, setPrice] = useState(50000);
  const parsedPrice: string = "$" + price.toFixed(2).toLocaleString();

  useEffect(() => {
    const worker = new Worker();

    const tickerChannel = new BroadcastChannel("ticker");

    tickerChannel.onmessage = (e) => {
      setPrice(JSON.parse(e.data).price);
    };
  }, []);

  return (
    <StyledSymbolHeaderContentWrapper theme={theme}>
      <h1>{symbol}</h1>
      <StyledPriceHeader>{parsedPrice}</StyledPriceHeader>
    </StyledSymbolHeaderContentWrapper>
  );
};
