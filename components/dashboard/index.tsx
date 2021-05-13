import { useState } from "react";

import { StyledScreenWrapper } from "../shared/layout";
import { ActionsMenu, ActionsMenuProps } from "./ActionsMenu";
import { Avatar, AvatarProps } from "./Avatar";
import { Stage, StageProps, Podium } from "./Podium";
import { SymbolHeader, SymbolHeaderProps } from "./SymbolHeader";
import { ValueChart, ValueChartProps } from "./chart/ValueChart";
import { ValueChartExample } from "../../stories/ValueChart.stories";

import mockData from "../../mockData/valueChartData";

export interface DashboardProps {}

interface StateTypes extends SymbolHeaderProps, ValueChartProps, StageProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [state, setState] = useState({
    symbol: "BTC-USD",
    theme: "dark",
    data: mockData,
    originalValue: 39000,
    podiums: [
      <Podium position={1} key={1} />,
      <Podium position={4} key={2} />,
      <Podium position={2} key={3} />,
      <Podium position={3} key={4} />,
      <Podium position={5} key={5} />,
    ],
  } as StateTypes);

  return (
    <StyledScreenWrapper>
      <SymbolHeader symbol={state.symbol} theme={state.theme} />
      <ValueChart
        data={state.data}
        originalValue={state.originalValue}
        symbol={state.symbol}
      />
      <Stage podiums={state.podiums} />
      <ActionsMenu />
    </StyledScreenWrapper>
  );
};

export default Dashboard;
