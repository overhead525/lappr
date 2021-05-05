import React from "react";
import { Story, Meta } from "@storybook/react";

import {
  SymbolHeader,
  SymbolHeaderProps,
} from "../components/dashboard/SymbolHeader";

export default {
  title: "Dashboard/Symbol Header",
  component: SymbolHeader,
} as Meta;

const Template: Story<SymbolHeaderProps> = (args) => <SymbolHeader {...args} />;

export const BTC_USD = Template.bind({});
BTC_USD.args = {
  symbol: "BTC-USD",
  price: 55348.23,
  theme: "dark",
} as SymbolHeaderProps;
