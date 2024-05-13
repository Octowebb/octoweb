import { ComponentPropsWithoutRef, useState } from "react";
import clsx from "clsx";
import s from "./team.module.scss";
import {
  TeamMember,
  TeamMemberIntro,
} from "../teamMemberIntro/teamMemberIntro.tsx";

export type TeamProps = {
  teamMembersInfo: TeamMember[];
} & ComponentPropsWithoutRef<"div">;

export const Team = (props: TeamProps) => {
  const { teamMembersInfo, className, ...restProps } = props;
  const classNames = clsx(s.team, className);
  const teamMembers = teamMembersInfo.map((member) => member.id);
  const [currentMember, setCurrentMember] = useState(teamMembers[0]);
  const teamMembersList = teamMembers.map((member) => {
    return (
      <li
        key={member}
        className={member === currentMember ? s.active : ""}
        onClick={() => setCurrentMember(member)}
      >
        {member}
      </li>
    );
  });

  const currentMemberCard = teamMembersInfo
    .filter((member) => member.id === currentMember)
    .map((member) => {
      return (
        <TeamMemberIntro
          id={member.id}
          workExperience={member.workExperience}
          name={member.name}
          specialization={member.specialization}
          description={member.description}
          img={member.img}
          key={member.id}
        />
      );
    });

  return (
    <div {...restProps} className={classNames}>
      <div className={s.firstCol}>
        <p>
          Разработка интернет-магазина — это командная работа, где каждый вносит
          свой профессиональный вклад для успешной реализации проекта.
        </p>
        {currentMemberCard}
      </div>
      <div className={s.secondCol}>
        <h2>Над проектом будут работать</h2>
        <ul>{teamMembersList}</ul>
      </div>
    </div>
  );
};
