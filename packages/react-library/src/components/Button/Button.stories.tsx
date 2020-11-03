import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Button } from "./Button";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	title: "Components/Button",
	component: Button,
} as Meta;

const Template: Story<any> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
