import React from "react";
import { Story, Meta } from "@storybook/react";

import {
  SymbolDisplay,
  SymbolDisplayProps,
} from "../../components/orderPage/SymbolDisplay";

export default {
  title: "Order Page/SymbolDisplay",
  component: SymbolDisplay,
} as Meta;

const Template: Story<SymbolDisplayProps> = (args) => (
  <SymbolDisplay {...args} />
);

export const BitcoinSymbolDisplay = Template.bind({});
BitcoinSymbolDisplay.args = {
  symbol: "BTC-USD",
} as SymbolDisplayProps;

export const EthereumSymbolDisplay = Template.bind({});
EthereumSymbolDisplay.args = {
  symbol: "ETH-USD",
} as SymbolDisplayProps;

export const StellarLumenSymbolDisplay = Template.bind({});
StellarLumenSymbolDisplay.args = {
  symbol: "XLM-USD",
  invert: true,
} as SymbolDisplayProps;
