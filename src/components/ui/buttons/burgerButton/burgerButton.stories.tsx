import type { Meta, StoryObj } from "@storybook/react";
import { BurgerButton } from "@/components/ui/buttons/burgerButton/burgerButton";
import { useArgs } from "@storybook/preview-api";

const meta = {
  title: "UI/Buttons/BurgerButton",
  component: BurgerButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "#d6ff41",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BurgerButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    open: false,
  },

  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs();

    function onChange() {
      updateArgs({ open: !open });
    }

    return <BurgerButton {...args} open={open} onClick={onChange} />;
  },
};

export const Open: Story = {
  args: {
    open: true,
  },

  render: function Render(args) {
    const [{ open }, updateArgs] = useArgs();

    function onChange() {
      updateArgs({ open: !open });
    }

    return <BurgerButton {...args} open={open} onClick={onChange} />;
  },
};
