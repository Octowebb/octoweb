"use client";

import { useState } from "react";
import clsx from "clsx";
import s from "./teamMembersCards.module.scss";
import {
  TeamMember,
  TeamMemberCard,
} from "@/components/layouts/teamMemberCard/teamMemberCard";
import { NavigationButton } from "@/components/ui/buttons/navigationButton/navigationButton";
import "keen-slider/keen-slider.scss";
import { useKeenSlider } from "keen-slider/react";

export type TeamMemberCardsProps = {
  teamMembers: TeamMember[];
  className?: string;
};

export const TeamMemberCards = (props: TeamMemberCardsProps) => {
  const { teamMembers, className } = props;
  const classNames = clsx(s.teamBlock, className);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: "auto",
    },
    renderMode: "performance",
    slideChanged(slider) {
      setIsBeginning(slider.track.details.rel === 0);
      setIsEnd(slider.track.details.maxIdx === slider.track.details.rel);
    },
  });

  const teamMemberList = teamMembers.map((member) => {
    return (
      <div className={clsx(s.slide, "keen-slider__slide")} key={member.name}>
        <TeamMemberCard {...member} className={s.cardItem} />
      </div>
    );
  });

  const handlePrevButtonClick = () => instanceRef.current?.prev();
  const handleNextButtonClick = () => instanceRef.current?.next();

  return (
    <section className={classNames} id={"team"}>
      <div className={s.header}>
        <h2>КОМАНДА</h2>
        <div className={s.buttons}>
          <NavigationButton
            variant={"previous"}
            onClick={handlePrevButtonClick}
            disabled={isBeginning}
            aria-label="Назад"
          />
          <NavigationButton
            variant={"next"}
            onClick={handleNextButtonClick}
            disabled={isEnd}
            aria-label="Вперёд"
          />
        </div>
      </div>
      <div className={s.placeholder}>
        <div ref={sliderRef} className="keen-slider">
          {teamMemberList}
        </div>
      </div>
    </section>
  );
};
