import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { clsx } from "clsx";
import s from "./blogCard.module.scss";
import { Tag } from "../../ui/tag/tag";
import Link from "next/link";
import { ArrowButton } from "@/components/ui/buttons/arrowButton/arrowButton";
import { Picture } from "@/components/ui/picture/picture";

export type Size = "small" | "medium" | "fullWidth";
export type BlogCardProps = {
  articleId: string;
  tags: string[];
  img: string;
  size?: Size;
  header: string;
  description: string;
  linkProps?: ComponentPropsWithoutRef<"a">;
  priority?: boolean;
  index: number;
} & ComponentPropsWithoutRef<"div">;

export const BlogCard = (props: BlogCardProps) => {
  const {
    articleId,
    tags,
    img,
    size = "small",
    header,
    description,
    className,
    linkProps,
    priority = false,
    index,
    ...restProps
  } = props;
  const getClass = (index: number) => {
    if (index === 0) return "fullWidth";
    return (index + 1) % 2 === 0 ? "left" : "right";
  };

  const classNames = clsx(
    s.blogCard,
    className,
    s[size],
    getClass(index),
    "blogCard",
  );
  const cardRef = useRef<HTMLDivElement>(null);
  const tagList = tags.map((tag) => {
    return (
      <Tag variant={"monochromeSecondary"} key={tag} className={s.tag}>
        {tag}
      </Tag>
    );
  });

  useEffect(() => {
    cardRef?.current?.setAttribute("data-animated", "true");
  }, []);

  return (
    <div {...restProps} className={classNames} ref={cardRef}>
      <div className={s.imgContainer}>
        <Picture
          src={img}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 450px) 100vw, (max-width: 767px) 450px, (max-width: 1000px) 100vw, 1665px"
          unoptimized
        />
        <div className={s.markContainer}>
          <div className={s.tagList}>{tagList}</div>
          <ArrowButton
            as={Link}
            variant={"secondary"}
            className={s.arrow}
            {...linkProps}
            href={`/blog/${articleId}`}
            aria-label={`Смотреть статью "${header}"`}
          />
        </div>
      </div>
      <h2 className={s.header}>
        <a href={`/blog/${articleId}`} {...linkProps}>
          {header}
        </a>
      </h2>
      <p className={s.description}>{description}</p>
    </div>
  );
};
