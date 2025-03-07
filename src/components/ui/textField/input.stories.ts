import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta = {
  title: "UI/TextField/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Required: Story = {
  args: {
    label: "Имя",
    placeholder: "Введите ваше имя",
    isRequiredField: true,
  },
};

export const Optional: Story = {
  args: {
    label: "Имя",
    placeholder: "Введите ваше имя",
    isRequiredField: false,
  },
};
