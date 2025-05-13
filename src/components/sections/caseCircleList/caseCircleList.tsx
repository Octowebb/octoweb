"use client";

import clsx from "clsx";
import s from "./caseCircleList.module.scss";
import { CaseCircle } from "@/components/layouts/caseCircle/caseCircle";
import { memo } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.scss";

export type CaseCircleProps = {
  caseCircles: CaseCircle[];
  className?: string;
};

export const CaseCircleList = memo((props: CaseCircleProps) => {
  const { caseCircles, className } = props;
  const classNames = clsx(s.circlesPlaceholder, className);
  const [sliderRef] = useKeenSlider({
    mode: "free",
    slides: {
      perView: "auto",
    },
    renderMode: "performance",
  });

  const circles = caseCircles.map((circle) => {
    return (
      <div key={circle.caseId} className={clsx(s.slide, "keen-slider__slide")}>
        <CaseCircle {...circle} />
      </div>
    );
  });

  return (
    <div className={classNames}>
      <div className={s.circlesContainer}>
        <div ref={sliderRef} className={clsx("keen-slider", s.circles)}>
          {circles}
        </div>
      </div>
    </div>
  );
});

CaseCircleList.displayName = "CaseCircleList";
