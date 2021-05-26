import styled from "styled-components";
// import Image from "next/image";

export interface SymbolDisplayProps {
  cryptoLogoURL?: string;
  symbol?: string;
  invert: boolean;
}

const StyledSymbolDisplay = styled.div`
  display: grid;
  place-items: center;

  width: 36vw;
  height: 36vw;
  margin-bottom: 9vw;

  background-color: #121212;
  border-radius: 2vw;
  box-shadow: 0.9vw 0.9vw 2vw #000000, -0.9vw -0.9vw 2vw #202324;
`;

const StyledImage = styled.img`
  width: 24vw;
  filter: invert(${(props) => (props.secondary ? 1 : 0)});
`;

export const SymbolDisplay: React.FC<SymbolDisplayProps> = ({
  cryptoLogoURL,
  symbol,
  invert,
}) => {
  const logos = {
    "BTC-USD": "/bitcoin-btc-logo.png",
    "ETH-USD": "/ethereum-eth-logo.png",
    "XLM-USD": "/stellar-xlm-logo.png",
  };

  return (
    <StyledSymbolDisplay>
      <StyledImage
        src={logos[symbol]}
        alt={symbol}
        secondary={symbol === "XLM-USD" ? true : false}
      />
      {/*<Image
        src={}
        alt={symbol}
        width="7.2vw"
        height="7.2vw"
      />*/}
    </StyledSymbolDisplay>
  );
};
