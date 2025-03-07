import type { Meta, StoryObj } from "@storybook/react";

import { Tag } from "./tag";

const meta = {
  title: "UI/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["colored", "monochromePrimary", "monochromeSecondary"],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colored: Story = {
  args: {
    variant: "colored",
    title: "Colored",
    children: "Tag",
  },
};

export const MonochromePrimary: Story = {
  args: {
    variant: "monochromePrimary",
    title: "Monochrome-primary",
    children: "Tag",
  },
};

export const MonochromeSecondary: Story = {
  args: {
    variant: "monochromeSecondary",
    title: "Monochrome-secondary",
    children: "Tag",
  },
};

export const MonochromeSecondaryAsLink: Story = {
  args: {
    variant: "monochromeSecondary",
    title: "Monochrome-secondary",
    children: "Link",
    as: "a",
    href: "#",
  },
};
