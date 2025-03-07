"use client";

import { ComponentPropsWithoutRef, useState } from "react";
import clsx from "clsx";
import s from "./team.module.scss";
import {
  TeamMember,
  TeamMemberIntro,
} from "@/components/layouts/teamMemberIntro/teamMemberIntro";
import Image from "next/image";

export type TeamProps = {
  intro: string;
  teamMembersInfo: TeamMember[];
} & ComponentPropsWithoutRef<"section">;

export const Team = (props: TeamProps) => {
  const { teamMembersInfo, intro, className, ...restProps } = props;
  const classNames = clsx(s.team, className);
  const teamMembers = teamMembersInfo.map((member) => member.position);
  const [currentMember, setCurrentMember] = useState(teamMembers[0]);
  const teamMembersList = teamMembers.map((member) => {
    return (
      <li
        key={member}
        className={member === currentMember ? s.active : ""}
        onClick={() => setCurrentMember(member)}
      >
        <button className={s.button}>{member}</button>
      </li>
    );
  });

  const currentMemberInfo = teamMembersInfo.find(
    (member) => member.position === currentMember,
  );

  const currentMemberCard = currentMemberInfo && (
    <TeamMemberIntro {...currentMemberInfo} key={currentMemberInfo.name} />
  );

  return (
    <section {...restProps} className={classNames}>
      <h2 className={s.mobileHeader}>
        Над проектом <br /> будут работать
      </h2>
      <div
        className={s.mobileIntro}
        dangerouslySetInnerHTML={{ __html: intro }}
      />
      <div className={s.teamContainer}>
        <div className={s.firstCol}>
          <div
            className={s.desktopIntro}
            dangerouslySetInnerHTML={{ __html: intro }}
          ></div>
          <div className={s.teamMemberContainer}>
            <Image
              src={"/teamMemberBackground.webp"}
              alt={""}
              className={s.background}
              fill
              unoptimized
              key="team-member-background"
            />
            {currentMemberCard}
          </div>
        </div>
        <div className={s.secondCol}>
          <h2 className={s.desktopHeader}>Над проектом будут работать</h2>
          <ul>{teamMembersList}</ul>
        </div>
      </div>
    </section>
  );
};
