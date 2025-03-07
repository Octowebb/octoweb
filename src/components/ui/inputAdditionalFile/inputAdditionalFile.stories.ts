import type { Meta, StoryObj } from "@storybook/react";
import { InputAdditionalFile } from "@/components/ui/inputAdditionalFile/inputAdditionalFile";

const meta = {
  title: "UI/InputAdditionalFile",
  component: InputAdditionalFile,
  tags: ["autodocs"],
} satisfies Meta<typeof InputAdditionalFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Дополнительные файлы",
  },
};
