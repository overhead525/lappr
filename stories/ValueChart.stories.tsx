import React from "react";
import { Story, Meta } from "@storybook/react";

import {
  ValueChart,
  ValueChartProps,
} from "../components/dashboard/chart/ValueChart";
import data from "../mockData/valueChartData";

export default {
  title: "Dashboard/Chart/Value Chart",
  component: ValueChart,
} as Meta;

const Template: Story<ValueChartProps> = (args) => <ValueChart {...args} />;

export const ValueChartExample = Template.bind({});
ValueChartExample.args = {
  data: data,
  symbol: "BTC-USD",
  originalValue: 39000,
} as ValueChartProps;
