import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "@/components/ui/textField/textarea";

const meta = {
  title: "UI/TextField/TextArea",
  component: TextArea,
  tags: ["autodocs"],
} satisfies Meta<typeof TextArea>;

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
