import React from "react";
import { Story, Meta } from "@storybook/react";

import { OrderPage, OrderPageProps } from "../../components/orderPage";

export default {
  title: "Order Page/OrderPageExample",
  component: OrderPage,
} as Meta;

const Template: Story<OrderPageProps> = (args) => <OrderPage {...args} />;

export const OrderPageExample = Template.bind({});
OrderPageExample.args = {} as OrderPageProps;
