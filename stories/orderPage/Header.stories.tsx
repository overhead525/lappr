import React from "react";
import { Story, Meta } from "@storybook/react";

import { Header, HeaderProps } from "../../components/orderPage/Header";

export default {
  title: "Order Page/Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const HeaderExample = Template.bind({});
HeaderExample.args = { symbol: "BTC-USD" } as HeaderProps;
