import React from "react";
import { Story, Meta } from "@storybook/react";

import Dashboard, { DashboardProps } from "../components/dashboard";

export default {
  title: "Dashboard/DashboardExample",
  component: Dashboard,
} as Meta;

const Template: Story<DashboardProps> = (args) => <Dashboard {...args} />;

export const DashboardExample = Template.bind({});
DashboardExample.args = {} as DashboardProps;
