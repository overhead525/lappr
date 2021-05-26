import styled from "styled-components";
import { ArrowLeftCircle, Grid } from "react-feather";
import { switchScreen } from "../../features/screen/screenSlice";
import { useDispatch } from "react-redux";

export interface HeaderProps {
  symbol: string;
}

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16.8vw;
  margin-top: 6.8vw;
`;
const StyledSymbolText = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 5vw;
  color: white;
`;

export const Header: React.FC<HeaderProps> = ({ symbol }) => {
  const dispatch = useDispatch();

  const tickerChannel = new BroadcastChannel("ticker");
  const candlestickChannel = new BroadcastChannel("candlestick");

  const handleArrowLeftClick = () => {
    tickerChannel.postMessage(JSON.stringify({ from: "death" }));
    candlestickChannel.postMessage(JSON.stringify({ from: "death" }));
    dispatch(switchScreen("dashboard"));
  };

  return (
    <StyledHeaderWrapper>
      <ArrowLeftCircle
        color="white"
        size="6vw"
        style={{ cursor: "grab" }}
        onClick={handleArrowLeftClick}
      />
      <StyledSymbolText>{symbol}</StyledSymbolText>
      <Grid color="white" size="6vw" />
    </StyledHeaderWrapper>
  );
};
