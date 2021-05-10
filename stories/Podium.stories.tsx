import React from "react";
import { Story, Meta } from "@storybook/react";

import { Stage, StageProps, Podium } from "../components/dashboard/Podium";

export default {
  title: "Dashboard/Podiums",
  component: Stage,
} as Meta;

const Template: Story<StageProps> = (args) => <Stage {...args} />;

export const StageExample = Template.bind({});
StageExample.args = {
  podiums: [
    <Podium position={1} />,
    <Podium position={4} />,
    <Podium position={2} />,
    <Podium position={3} />,
    <Podium position={5} />,
  ],
} as StageProps;
