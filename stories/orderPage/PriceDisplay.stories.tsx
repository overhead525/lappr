import React from "react";
import { Story, Meta } from "@storybook/react";

import {
  PriceDisplay,
  PriceDisplayProps,
} from "../../components/orderPage/PriceDisplay";

export default {
  title: "Order Page/PriceDisplay",
  component: PriceDisplay,
} as Meta;

const Template: Story<PriceDisplayProps> = (args) => <PriceDisplay {...args} />;

export const PriceDisplayExample = Template.bind({});
PriceDisplayExample.args = {} as PriceDisplayProps;
