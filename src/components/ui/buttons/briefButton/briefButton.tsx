import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import s from "./briefButton.module.scss";
import { routes } from "@/common/routes";
import ArrowIcon from "@/svg/arrow.svg";
import Link from "next/link";
import Image from "next/image";

export type BriefButtonProps = {
  variant?: "primary" | "secondary";
} & ComponentPropsWithoutRef<"div">;

export const BriefButton = (props: BriefButtonProps) => {
  const { variant = "primary", className, ...restProps } = props;
  const classNames = clsx(s.buttonContainer, className, s[variant]);

  return (
    <div {...restProps} className={classNames}>
      <div className={s.stroke}>
        <Image src="/stroke.webp" alt="" fill priority unoptimized />
      </div>
      <Link
        href={routes.brief}
        className={s.arrowContainer}
        target={"_blank"}
        aria-label="Заполнить бриф"
      >
        <ArrowIcon />
      </Link>
    </div>
  );
};
