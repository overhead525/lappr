import React from "react";
import { Story, Meta } from "@storybook/react";

import { Avatar, AvatarProps } from "../components/dashboard/Avatar";

export default {
  title: "Dashboard/Avatar",
  component: Avatar,
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const AvatarExample = Template.bind({});
AvatarExample.args = {
  username: "marlowe87",
  profilePictureURL:
    "https://cdn.fakercloud.com/avatars/yigitpinarbasi_128.jpg",
} as AvatarProps;
