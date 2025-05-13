"use client";

import { StepCard } from "@/components/layouts/stepCard/stepCard";
import clsx from "clsx";
import s from "./stepCards.module.scss";
import Lottie from "lottie-react";
import StepsAnimation from "@/lotties/swipe.json";
import { Step } from "@/common/types";
import { useRef } from "react";
import { useIntersectionObserver } from "@/common/customHooks/useIntersectionObserver";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.scss";

export type StepCardsProps = {
  className?: string;
  stepCards: Step[];
};

export const StepCards = (props: StepCardsProps) => {
  const { stepCards, className } = props;
  const classNames = clsx(s.stepsSection, className);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isAnimationVisible = useIntersectionObserver(sectionRef, 0.1);
  const [sliderRef] = useKeenSlider({
    mode: "free",
    slides: {
      perView: "auto",
    },
    renderMode: "performance",
  });
  if (!stepCards || !stepCards.length) return null;

  const cardsList = stepCards.map((card) => {
    return (
      <div
        key={card.stepNumber}
        className={clsx(s.slide, "keen-slider__slide")}
      >
        <StepCard
          stepNumber={card.stepNumber}
          header={card.header}
          description={card.description}
          className={s.card}
        />
      </div>
    );
  });

  return (
    <section className={classNames} ref={sectionRef}>
      <div className={s.stepsPlaceholder}>
        <div className={s.stepsContainer}>
          <div ref={sliderRef} className={"keen-slider"}>
            {cardsList}
          </div>
        </div>
      </div>
      <div className={s.caption}>
        {isAnimationVisible ? (
          <Lottie
            animationData={StepsAnimation}
            loop
            autoplay
            className={s.animation}
          />
        ) : (
          <div className={s.animation}></div>
        )}
        Листайте :)
      </div>
    </section>
  );
};
