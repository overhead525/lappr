import React from "react";
import { Story, Meta } from "@storybook/react";

import {
  TickerChart,
  TickerChartProps,
  TickerChartTypes,
} from "../../components/orderPage/TickerChart";

export default {
  title: "Order Page/Ticker Chart",
  component: TickerChart,
} as Meta;

const Template: Story<TickerChartProps> = (args) => <TickerChart {...args} />;

export const SmoothTickerChart = Template.bind({});
SmoothTickerChart.args = { type: TickerChartTypes.smooth } as TickerChartProps;
