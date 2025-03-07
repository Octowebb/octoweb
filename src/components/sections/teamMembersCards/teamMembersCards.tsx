"use client";

import { MutableRefObject, useRef, useState } from "react";
import clsx from "clsx";
import s from "./teamMembersCards.module.scss";
import {
  TeamMember,
  TeamMemberCard,
} from "@/components/layouts/teamMemberCard/teamMemberCard";
import { NavigationButton } from "@/components/ui/buttons/navigationButton/navigationButton";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";

export type TeamMemberCardsProps = {
  teamMembers: TeamMember[];
  className?: string;
};

export const TeamMemberCards = (props: TeamMemberCardsProps) => {
  const { teamMembers, className } = props;
  const swiperRef = useRef<SwiperClass>(null);
  const classNames = clsx(s.teamBlock, className);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const teamMemberList = teamMembers.map((member, index) => {
    return (
      <SwiperSlide
        virtualIndex={index}
        key={member.name}
        className={s.swiperSlide}
      >
        <TeamMemberCard {...member} className={s.cardItem} />
      </SwiperSlide>
    );
  });

  const handleSwiper = (
    swiper: SwiperClass,
    swiperRef: MutableRefObject<SwiperClass>,
  ) => {
    swiperRef.current = swiper;
  };
  const handleUpdateButtonsState = (swiper: SwiperClass) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  const handlePrevButtonClick = () => swiperRef.current?.slidePrev();
  const handleNextButtonClick = () => swiperRef.current?.slideNext();

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
        <Swiper
          className={s.cards}
          slidesPerView={"auto"}
          onSwiper={(swiper) =>
            handleSwiper(swiper, swiperRef as MutableRefObject<SwiperClass>)
          }
          onProgress={handleUpdateButtonsState}
        >
          {teamMemberList}
        </Swiper>
      </div>
    </section>
  );
};
