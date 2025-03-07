"use client";

import clsx from "clsx";
import s from "./servicesLink.module.scss";
import { ArrowButton } from "@/components/ui/buttons/arrowButton/arrowButton";
import { Tag } from "../../ui/tag/tag";
import Image from "next/image";
import Link from "next/link";
import { TagLink } from "@/common/types";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";

export type ServicesLinkProps = {
  number: string;
  header: string;
  tags?: TagLink[];
  mainLink: string;
  image?: string;
  linkProps?: ComponentPropsWithoutRef<"a">;
} & ComponentPropsWithoutRef<"div">;

export const ServicesLink = (props: ServicesLinkProps) => {
  const [hoverable, setHoverable] = useState(false);
  const {
    number,
    header,
    tags,
    mainLink,
    linkProps,
    image,
    className,
    ...restProps
  } = props;
  const classNames = clsx(s.servicesLink, className);
  const tagList =
    tags &&
    tags.map((tag) => {
      return (
        <Tag
          key={tag.text}
          variant={"monochromeSecondary"}
          as={Link}
          href={`/services/${mainLink}/${tag.subLink}`}
          className={s.tag}
        >
          {tag.text}
        </Tag>
      );
    });

  useEffect(() => {
    if (window.innerWidth > 768) {
      setHoverable(true);
    }
  }, []);

  return (
    <div {...restProps} className={classNames}>
      <div className={s.headerContainer}>
        <a className={s.text} href={`/services/${mainLink}`} {...linkProps}>
          <span className={s.number}>{number}</span>
          <h3 className={s.header}>{header}</h3>
        </a>
        <ArrowButton
          href={`/services/${mainLink}`}
          {...linkProps}
          className={s.arrowLink}
        />
      </div>
      {tags && <div className={s.tagList}>{tagList}</div>}
      {image && hoverable && (
        <div className={s.imgContainer}>
          <div className={s.imgPositionContainer}>
            <Image src={image} alt={header} fill sizes={"394px"} unoptimized />
          </div>
        </div>
      )}
    </div>
  );
};
