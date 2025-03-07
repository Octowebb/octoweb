"use client";

import {
  ComponentPropsWithoutRef,
  RefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { clsx } from "clsx";
import s from "./wordSwipe.module.scss";
import { useIntersectionObserver } from "@/common/customHooks/useIntersectionObserver";

export type WordSwipeProps = {
  words: string[];
  containerRef?: RefObject<HTMLElement>;
} & ComponentPropsWithoutRef<"div">;

export const WordSwipe = (props: WordSwipeProps) => {
  const { className, containerRef, words, ...restProps } = props;
  const classNames = clsx(s.wordSwipe, className);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const effectiveRef = containerRef ?? fallbackRef;
  const isVisible = useIntersectionObserver(effectiveRef, 0.01);
  const longestWord = useMemo(() => {
    const word = words.length
      ? [...words].sort((a, b) => b.length - a.length)[0]
      : "";

    return word
      .split("")
      .map((char, charIndex) => <span key={charIndex}>{char}</span>);
  }, [words.length]);

  const wordsForAnimation = useMemo(() => {
    if (!words || words.length === 0) return [];
    return words.length === 1 ? [words[0], words[0]] : words;
  }, [words.length]);

  useEffect(() => {
    const wordsElements = document.querySelectorAll(".word");
    if (!wordsElements || wordsElements.length === 0) return;
    let wordIndex = 0;
    const updateWord = () => {
      wordsElements.forEach((el) => {
        el.classList.add(s.hidden);
      });
      wordsElements[wordIndex].classList.remove(s.hidden);
      wordsElements[wordIndex].classList.add(s.animate);
      wordIndex = (wordIndex + 1) % wordsElements.length;
    };
    let interval: ReturnType<typeof setInterval>;
    if (isVisible) {
      updateWord();
      if (placeholderRef.current) {
        placeholderRef.current.style.height = "0";
      }

      interval = setInterval(() => {
        updateWord();
      }, 2000);
    }

    return () => interval && clearInterval(interval);
  }, [wordsForAnimation, isVisible]);

  if (!words || words.length === 0) return null;

  const wordsForDisplay = wordsForAnimation.map((word) => {
    return <Word word={word} key={word} />;
  });

  return (
    <div {...restProps} className={classNames} ref={fallbackRef}>
      {wordsForDisplay}
      <div className={clsx(s.word, s.placeholder)} ref={placeholderRef}>
        {longestWord}
      </div>
    </div>
  );
};

type WordProps = {
  word: string | null;
};

const Word = (props: WordProps) => {
  const { word } = props;
  if (!word) return null;

  return (
    <div className={clsx(s.word, "word", s.hidden)} key={word}>
      {word.split("").map((char, charIndex) => (
        <span
          key={charIndex}
          style={{ animationDelay: `${charIndex * 0.08}s` }}
          className={s.charAnimate}
        >
          {char}
        </span>
      ))}
    </div>
  );
};
