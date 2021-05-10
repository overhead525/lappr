import React from "react";
import { Story, Meta } from "@storybook/react";

import {
  ActionsMenu,
  ActionsMenuProps,
} from "../components/dashboard/ActionsMenu";

export default {
  title: "Dashboard/ActionsMenu",
  component: ActionsMenu,
} as Meta;

const Template: Story<ActionsMenuProps> = (args) => <ActionsMenu {...args} />;

export const ActionsMenuExample = Template.bind({});
ActionsMenuExample.args = {} as ActionsMenuProps;
