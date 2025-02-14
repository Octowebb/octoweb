import s from "./serviceCategory.module.scss";
import { ServicesLinksList } from "@/components/sections/servicesLinksList/servicesLinksList";
import { StepCards } from "@/components/sections/stepCards/stepCards";
import { Advantages } from "@/components/sections/advantages/advantages";
import { CooperationCard } from "@/components/sections/cooperationCard/cooperationCard";
import { Greeting } from "@/components/sections/greeting/greeting";
import { clsx } from "clsx";
import { BigBubble } from "@/components/video/bigBubble/bigBubble";
import { SmallBubble } from "@/components/video/smallBubble/smallBubble";
import { api } from "@/common/api";
import { FAQ } from "@/components/sections/faq/faq";
import { getMetaDataObj } from "@/common/commonFunctions";
import Script from "next/script";

export async function generateMetadata({ params }: { params: { serviceCategory: string } }) {
  const { serviceCategory } = await params;
  const response = await api.getServicesCategorySeo(serviceCategory);
  if (!response) return {};
  const metadata = response?.[0].yoast_head_json;

  return getMetaDataObj(metadata);
}


export default async function ServiceCategory({ params }: {
  params: Promise<{ serviceCategory: string }>
}) {
  const { serviceCategory } = await params;
  const [serviceCategoryData, seo] = await Promise.all([api.getServiceCategory(serviceCategory), api.getServicesCategorySeo(serviceCategory)]);
  if (!serviceCategoryData) return null;
  const schema = seo?.[0]?.yoast_head_json?.schema;

  const stepCards = serviceCategoryData.work_stages.map((stage) => ({
    stepNumber: String(stage.number),
    header: stage.title,
    description: stage.text
  }));

  const textContent = {
    firstLine: serviceCategoryData.firstLine,
    secondLine: serviceCategoryData.secondLine,
    thirdLine: serviceCategoryData.thirdLine,
    wordSwipeProps: { words: serviceCategoryData.words }
  };

  return (
    <>
      <div className={s.mainBubbles}>
        <BigBubble className={s.bigBubbleMain} />
        <SmallBubble className={s.smallBubbleMain} />
      </div>
      <Greeting textContent={textContent} className={"mainContainer"} />
      <ServicesLinksList
        linksData={serviceCategoryData.linksData}
        header={"Услуги разработки"}
        className={s.services}
      />
      <div className={s.advantagesBubbles}>
        <BigBubble className={s.bigBubbleAdvantages} />
      </div>
      <Advantages className={clsx(s.advantages, "mainContainer")} />
      <CooperationCard />
      <div className={s.cardBubbles}>
        <SmallBubble className={s.smallBubbleCard} />
      </div>
      <StepCards className={s.steps} stepCards={stepCards} />
      <FAQ faqData={serviceCategoryData.faq} className={clsx(s.faq, "mainContainer")} />
      {schema &&
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          id="case"
          strategy="beforeInteractive"
        ></Script>
      }
    </>
  );
};
