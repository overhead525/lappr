import styled from "styled-components";
// import Image from "next/image";

export interface SymbolDisplayProps {
  cryptoLogoURL?: string;
  symbol: string;
  invert: boolean;
}

const StyledSymbolDisplay = styled.div`
  display: grid;
  place-items: center;

  width: 43.8vw;
  height: 43.8vw;

  background-color: #121212;
  border-radius: 2vw;
  box-shadow: 0.9vw 0.9vw 2vw #000000, -0.9vw -0.9vw 2vw #202324;
`;

const StyledImage = styled.img`
  width: 26.8vw;
  filter: invert(${(props) => (props.secondary ? 1 : 0)});
`;

export const SymbolDisplay: React.FC<SymbolDisplayProps> = ({
  cryptoLogoURL,
  symbol,
  invert,
}) => {
  return (
    <StyledSymbolDisplay>
      <StyledImage src={cryptoLogoURL} alt="Bitcoin Logo" secondary={invert} />
      {/*<Image
        src={}
        alt={symbol}
        width="7.2vw"
        height="7.2vw"
      />*/}
    </StyledSymbolDisplay>
  );
};
