import type { Meta, StoryObj } from "@storybook/react";
import { Cookie } from "@/components/layouts/cookie/cookie";

const meta = {
  title: "Layouts/Cookie",
  component: Cookie,
  tags: ["autodocs"],
} satisfies Meta<typeof Cookie>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
