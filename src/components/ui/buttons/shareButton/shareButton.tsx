"use client";

import { clsx } from "clsx";
import s from "./shareButton.module.scss";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { Tag } from "../../tag/tag";
import ShareIcon from "@/svg/shareIcon.svg";

export type ShareButtonProps = ComponentPropsWithoutRef<"div">;

export const ShareButton = (props: ShareButtonProps) => {
  const { className, ...restProps } = props;
  const classNames = clsx(s.shareButton, className);
  const [isCopied, setIsCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!document) return;
    setUrl(document.location.href);
  }, []);

  const shareData = {
    title: "Octoweb - Создание и продвижений сайтов",
    text: "Посмотри эту статью. Мы подготовили для тебя много полезной информации!",
    url: url,
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      if (window.innerWidth <= 768) {
        await navigator.share(shareData);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className={classNames} {...restProps}>
      <Tag
        as={"button"}
        variant={"monochromeSecondary"}
        onClick={copyUrl}
        className={s.tag}
      >
        Поделиться <ShareIcon />
      </Tag>
      {isCopied && <span className={s.underline}>Ссылка скопирована!</span>}
    </div>
  );
};
