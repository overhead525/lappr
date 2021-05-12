import { useEffect, useState } from "react";
import styled from "styled-components";

import Worker from "worker-loader!../../public/worker";

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
  margin-bottom: 2.5rem;
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

export const SymbolHeader: React.FC<SymbolHeaderProps> = ({
  symbol,
  theme,
}) => {
  const [price, setPrice] = useState(50000);
  const parsedPrice: string = "$" + price.toLocaleString();

  useEffect(() => {
    const worker = new Worker();

    window.addEventListener("click", (e) => {
      worker.postMessage("User just clicked in the window");
      console.log("message posted to worker");
    });

    worker.onmessage = (e) => {
      console.log("Message received from worker", e.data);
      setPrice(JSON.parse(e.data).price);
    };
  }, []);

  return (
    <StyledSymbolHeaderContentWrapper theme={theme}>
      <h1>{symbol}</h1>
      <h1>{parsedPrice}</h1>
    </StyledSymbolHeaderContentWrapper>
  );
};
