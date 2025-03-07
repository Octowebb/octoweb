import type { Meta, StoryObj } from "@storybook/react";
import { TeamMemberIntro } from "./teamMemberIntro";

const meta = {
  title: "Layouts/TeamMemberIntro",
  component: TeamMemberIntro,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TeamMemberIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "Front-end-программист",
    experience: "4+ года опыта",
    name: "Елисеев Николай",
    position: "Frontend-Гуру",
    description:
      'Николай "HTML-Rockstar" Елисеев, фронтенд-гуру с исключительным талантом.',
    image: "/frontendDev.webp",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The component does not include a background image so that it is not rendered every time a team member changes. The size is limited by the container of the background image.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: "820px",
          maxHeight: "580px",
          backgroundColor: "#d6ff41",
          position: "relative",
          zIndex: "-1",
        }}
      >
        <Story />
      </div>
    ),
  ],
};
