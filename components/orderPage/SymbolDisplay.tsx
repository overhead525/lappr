import styled from "styled-components";
// import Image from "next/image";

export interface SymbolDisplayProps {
  cryptoLogoURL?: string;
  symbol: string;
}

const StyledSymbolDisplay = styled.div`
  display: grid;
  place-items: center;

  width: 43.8vw;
  height: 43.8vw;

  border-radius: 2vw;
  box-shadow: 0.9vw 0.9vw 2vw #000000, -0.9vw -0.9vw 2vw #202324;
`;

const StyledImage = styled.img`
  width: 26.8vw;
`;

export const SymbolDisplay: React.FC<SymbolDisplayProps> = ({
  cryptoLogoURL,
  symbol,
}) => {
  return (
    <StyledSymbolDisplay>
      <StyledImage src={cryptoLogoURL} alt="Bitcoin Logo" />
      {/*<Image
        src={}
        alt={symbol}
        width="7.2vw"
        height="7.2vw"
      />*/}
    </StyledSymbolDisplay>
  );
};
