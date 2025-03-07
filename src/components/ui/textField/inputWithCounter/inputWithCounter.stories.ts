import type { Meta, StoryObj } from "@storybook/react";
import { InputWithCounter } from "./inputWithCounter";

const meta = {
  title: "UI/TextField/InputWithCounter",
  component: InputWithCounter,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof InputWithCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "О проекте",
    isRequiredField: true,
    placeholder: "Расскажите о своем проекте",
    onChange: () => {},
  },
};

export const WithErrors: Story = {
  args: {
    label: "О проекте",
    isRequiredField: true,
    placeholder: "Расскажите о своем проекте",
    onChange: () => {},
    errorMessage: ["Обязательное поле", "Размер файла не более 5мб"],
  },
};
