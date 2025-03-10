import type { Meta, StoryObj } from "@storybook/react";
import { RadioCheckbox } from "./radioCheckbox";

const meta = {
  title: "UI/RadioCheckbox",
  component: RadioCheckbox,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RadioCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Получение заявок на почту",
  },
};
