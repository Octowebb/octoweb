"use client";

import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import clsx from "clsx";
import s from "./footerWithForm.module.scss";
import { Footer } from "../footer/footer";
import { Form } from "../form/form";
import { Social } from "@/common/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export type FooterWithFormProps = {
  socials: Social[];
} & ComponentPropsWithoutRef<"div">;

export const FooterWithForm = (props: FooterWithFormProps) => {
  gsap.registerPlugin(ScrollTrigger);
  const { socials, className, ...restProps } = props;
  const classNames = clsx(s.footerWithForm, className);
  const footerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const footerHeight = footer.offsetHeight;
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "footer",
        trigger: ".main",
        start: "bottom bottom",
        pin: true,
        scrub: true,
        pinSpacing: false,
      },
    });

    tl.to(footer, { yPercent: `-${footerHeight}px` }, 0).to(
      ".overlay",
      { opacity: 1 },
      0,
    );

    return () => {
      ScrollTrigger.getById("footer")?.kill();
      ScrollTrigger?.refresh();
    };
  }, [pathname]);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "instant",
    });
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <div ref={footerRef} className={"footer"}>
      <div {...restProps} className={classNames} id={"form"}>
        <div className={s.secondaryFormImg}></div>
        <div className={s.formContainer}>
          <span className={s.title}>Давайте начнем работать прямо сейчас</span>
          <Form />
        </div>
        <Footer contactLinksProps={{ socials: socials || [] }} />
      </div>
    </div>
  );
};
