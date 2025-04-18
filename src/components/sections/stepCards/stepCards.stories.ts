import type { Meta, StoryObj } from "@storybook/react";
import { StepCards } from "@/components/sections/stepCards/stepCards";

const meta = {
  title: "Sections/StepCards",
  component: StepCards,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StepCards>;

export default meta;
type Story = StoryObj<typeof meta>;

const stepCards = [
  {
    stepNumber: "01",
    header: "Первый контакт",
    description:
      "Знакомимся с вами, оцениваем цели и задачи проекта, составляем техническое задание",
  },
  {
    stepNumber: "02",
    header: "Анализ Вашей ниши",
    description:
      "Изучаем конкурентов и ЦА, на основе полученных данных формируем КП",
  },
  {
    stepNumber: "03",
    header: "Подписание договора",
    description:
      "На основе КП и ТЗ мы составляем договор и проводим его подписание",
  },
  {
    stepNumber: "04",
    header: "Создание прототипа",
    description:
      "Разрабатываем прототип будущего сайта с низкой детализацией на основе мудборда",
  },
  {
    stepNumber: "05",
    header: "Разработка дизайна",
    description:
      "Подготавливаем дизайн-проект в Figma, при необходимости вносим правки",
  },
  {
    stepNumber: "06",
    header: "Верстка и посадка",
    description:
      "Верстаем, проводим адаптацию под все разрешения, интегрируем готовую версту в CMS",
  },
  {
    stepNumber: "07",
    header: "Сдача проекта",
    description:
      "Презентуем готовый сайт, вносим финальные правки и подписываем закрывающие документы",
  },
];

export const Primary: Story = {
  args: {
    stepCards: stepCards,
  },
};
