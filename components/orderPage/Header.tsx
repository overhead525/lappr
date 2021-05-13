import styled from "styled-components";
import { ArrowLeftCircle, Grid } from "react-feather";

export interface HeaderProps {
  symbol: string;
}

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledSymbolText = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 5vw;
  color: white;
`;

export const Header: React.FC<HeaderProps> = ({ symbol }) => {
  return (
    <StyledHeaderWrapper>
      <ArrowLeftCircle color="white" size="6vw" />
      <StyledSymbolText>{symbol}</StyledSymbolText>
      <Grid color="white" size="6vw" />
    </StyledHeaderWrapper>
  );
};
