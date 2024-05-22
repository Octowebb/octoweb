import { CaseCard } from "../../primitive/caseCard/caseCard.tsx";
import { ComponentPropsWithoutRef } from "react";
import Botanica from "../../../../assets/webp/case-botanica.webp";

export type BotanicaCardProps = ComponentPropsWithoutRef<"figure">;
export const BotanicaCard = (props: BotanicaCardProps) => {
  const { ...restProps } = props;
  return (
    <CaseCard
      category={"LANDING PAGE"}
      tags={["DEVELOP", "UI/UX", "SEO"]}
      img={Botanica}
      size={"small"}
      header={"ботаника-хилс.рф"}
      caseId={"botanica"}
      {...restProps}
    />
  );
};
