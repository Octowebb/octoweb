import type { Meta, StoryObj } from "@storybook/react";
import { AccordionButton, AccordionButtonProps } from "./accordionButton";
import { useArgs } from "@storybook/preview-api";

const meta: Meta<typeof AccordionButton> = {
  title: "UI/Buttons/AccordionButton",
  component: AccordionButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Opened: Story = {
  args: {
    opened: true,
  },
  render: function Render(args) {
    const [{ opened }, updateArgs] = useArgs<AccordionButtonProps>();

    function toggleOpen() {
      updateArgs({ opened: !opened });
    }

    return (
      <AccordionButton {...args} toggleOpen={toggleOpen} opened={opened} />
    );
  },
};

export const Closed: Story = {
  args: {
    opened: false,
  },
  render: function Render(args) {
    const [{ opened }, updateArgs] = useArgs<AccordionButtonProps>();

    function toggleOpen() {
      updateArgs({ opened: !opened });
    }

    return (
      <AccordionButton {...args} toggleOpen={toggleOpen} opened={opened} />
    );
  },
};
