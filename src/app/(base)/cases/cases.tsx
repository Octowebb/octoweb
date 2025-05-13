"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CaseCircle } from "@/components/layouts/caseCircle/caseCircle";
import { CaseData } from "@/common/types";
import { usePathname, useSearchParams } from "next/navigation";
import { api } from "@/common/api";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { createQueryString } from "@/common/commonFunctions";
import { FilterButton } from "@/components/ui/buttons/filterButton/filterButton";
import s from "@/app/(base)/cases/cases.module.scss";
import { CaseCard, Size } from "@/components/layouts/caseCard/caseCard";
import { v4 as uuid } from "uuid";
import { clsx } from "clsx";
import { CaseCardFullWidth } from "@/components/layouts/caseCardFullWidth/caseCardFullWidth";
import { CaseCircleList } from "@/components/sections/caseCircleList/caseCircleList";
import { SmallBubble } from "@/components/video/smallBubble";
import { Loader } from "@/components/ui/loader/loader";
import { Button } from "@/components/ui/buttons/button/button";
import { BigBubble } from "@/components/video/bigBubble";

export const Cases = () => {
  const defaultFilter = "All projects";
  const sizes = ["extraLarge", "large", "small", "medium", "fullWidth"];
  const defaultPage = 1;
  const [casesCircles, setCasesCircles] = useState<CaseCircle[]>();
  const [casesCards, setCasesCards] =
    useState<(CaseData & { isNew: boolean })[]>();
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>(defaultFilter);
  const container = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(defaultPage);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const casesCirclesMemo = useMemo(() => casesCircles, [casesCircles]);

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      setCurrentFilter(filter);
    }
    const getCases = async () => {
      const response = await api.getCases(page, filter);
      const startCases = response?.cases?.map((el) => ({ ...el, isNew: true }));
      setCasesCircles(response?.caseCircles);
      setTotal(response?.total || 0);
      setTimeout(() => {
        setCasesCards(startCases);
      }, 400);
    };

    const getFilters = async () => {
      const response = await api.getCasesFilters();
      setFilters(response || []);
    };

    Promise.all([getCases(), getFilters()]);
  }, []);

  useEffect(() => {
    if (!casesCards || !casesCards?.length) return;
    ScrollTrigger.refresh();
    gsap.set(".fullWidth.new", {
      y: 100,
      opacity: 0,
    });
    gsap.set(".right.new", {
      x: 100,
      opacity: 0,
    });
    gsap.set(".left.new", {
      x: -100,
      opacity: 0,
    });

    const triggers = ScrollTrigger.batch(".case.new", {
      interval: 0.4,
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          x: 0,
          opacity: 1,
          stagger: 0.4,
          overwrite: true,
        });
      },
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [casesCards]);

  const createQueryStringMemo = useCallback(createQueryString, []);

  if (!casesCards) return null;

  const getMoreCases = async () => {
    setLoading(true);
    const newCases = await api.getCases(page + 1, currentFilter);
    setLoading(false);
    setPage(page + 1);
    if (!newCases) return null;
    setCasesCards([
      ...casesCards.map((card) => ({ ...card, isNew: false })),
      ...newCases.cases.map((card) => ({
        ...card,
        isNew: true,
      })),
    ]);
    ScrollTrigger.refresh();
  };

  const setFilter = async (filter: string) => {
    if (filter === currentFilter) return null;
    setLoading(true);
    setCurrentFilter(filter);
    const newCases = await api.getCases(
      defaultPage,
      filter === defaultFilter ? null : filter,
    );
    setLoading(false);

    if (filter === defaultFilter) {
      window.history.replaceState(null, "", pathname);
    } else {
      window.history.replaceState(
        null,
        "",
        pathname + "?" + createQueryStringMemo("filter", filter, searchParams),
      );
    }

    if (!newCases) return null;
    setCasesCards(newCases.cases.map((card) => ({ ...card, isNew: true })));
    setCasesCircles(newCases.caseCircles);
  };

  const filterButtons = filters.map((button) => {
    return (
      <FilterButton
        key={button}
        value={button}
        active={button === currentFilter}
        onClick={() => setFilter(button)}
      >
        {button}
      </FilterButton>
    );
  });

  const cases = casesCards?.map((card, index) => {
    const size = sizes[index % sizes.length];
    const cardClassName = s[size];
    const animationIndex = index < 5 ? index : index - Math.trunc(index / 5);
    const { img, imgFullWidth, isNew, ...commonCardProps } = card;

    return (index + 1) % 5 !== 0 ? (
      <CaseCard
        key={uuid()}
        index={animationIndex}
        size={size as Size}
        className={clsx(cardClassName, isNew ? "new" : "")}
        {...commonCardProps}
        img={img}
      />
    ) : (
      <div
        className={clsx(
          s.fullWidthContainer,
          "case",
          "fullWidth",
          isNew ? "new" : "",
        )}
        key={uuid()}
      >
        <CaseCardFullWidth {...commonCardProps} img={imgFullWidth} />
      </div>
      //container need for correct cards order on small screens
    );
  });

  return (
    <>
      <div className={s.casesPage}>
        <Suspense></Suspense>
        <div className={"mainContainer"}>
          <div className={s.header}>
            <h1>КЕЙСЫ</h1>
            <div className={s.filterButtons}>{filterButtons}</div>
          </div>
        </div>
        <CaseCircleList
          caseCircles={casesCirclesMemo || []}
          className={s.caseCircleList}
        />
        <div className={s.smallBubbleCirclesContainer}>
          <SmallBubble className={s.smallBubbleCircles} />
        </div>
        <div className={s.casesList} ref={container}>
          {cases}
          <SmallBubble className={s.smallBubbleCases} />
        </div>
        {loading && (
          <div className={s.loaderContainer}>
            <Loader />
          </div>
        )}
        {casesCards.length < total && (
          <div className={s.showMoreButton}>
            <Button text={"Показать ещё"} onClick={getMoreCases} />
          </div>
        )}
        <div className={s.bigBubbleEndContainer}>
          <BigBubble className={s.bigBubbleEnd} />
        </div>
      </div>
    </>
  );
};
