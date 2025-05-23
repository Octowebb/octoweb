import s from "./aboutPage.module.scss";
import { StackList } from "@/components/sections/stackList/stackList";
import { TeamMemberCards } from "@/components/sections/teamMembersCards/teamMembersCards";
import { Picture } from "@/components/ui/picture/picture";
import { BigBubble } from "@/components/video/bigBubble";
import { api } from "@/common/api";
import { getMetaDataObj } from "@/common/commonFunctions";
import Script from "next/script";
import { cache } from "react";

const getCachedSeo = cache(async () => {
  return await api.getAboutSeo();
});

export async function generateMetadata() {
  const metadata = await getCachedSeo();
  if (!metadata) return {};

  return getMetaDataObj(metadata);
}

export default async function About() {
  const [team, teamPhoto, seo] = await Promise.all([
    api.getTeam(),
    api.getTeamPhoto(),
    getCachedSeo(),
  ]);

  const schema = seo?.schema;

  return (
    <>
      <div className={s.aboutPage}>
        <div className={"mainContainer"}>
          <BigBubble className={s.bubble} />
          <h1>
            О веб-студии <br /> OctoWeb
          </h1>
          <p className={s.description}>
            Раскроем подробности о том, кто стоит за реализацией проектов
          </p>
        </div>
        {teamPhoto && (
          <Picture
            src={teamPhoto}
            alt={"Команда"}
            fill
            priority
            containerProps={{ className: s.imageContainer }}
          />
        )}
        <div className={"mainContainer"}>
          <div className={s.aboutCompany}>
            <h2>О компании</h2>
            <p>
              Выступаем стратегическим партнером для развития бизнеса в цифровом
              пространстве с 2018 года. За это время выпустили более 150
              проектов. Задача нашей компании — разрабатывать цифровые решения,
              способные помогать бизнесу становиться ключевым игроком в своей
              сфере
            </p>
          </div>
          <StackList />
        </div>
        <TeamMemberCards teamMembers={team} className={s.teamCards} />
      </div>
      {schema && (
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          id="about"
          strategy="beforeInteractive"
        ></Script>
      )}
    </>
  );
}
