import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import s from "./websiteLink.module.scss";
import LinkIcon from "@/svg/linkIcon.svg";

export type WebsiteLinkProps = {
  webSiteName: string;
  divProps?: ComponentPropsWithoutRef<"div">;
} & ComponentPropsWithoutRef<"a">;

export const WebsiteLink = (props: WebsiteLinkProps) => {
  const { webSiteName, className, divProps, ...restProps } = props;
  const classNames = clsx(s.websiteLink, className);
  return (
    <div {...divProps} className={classNames}>
      <span className={s.caption}>Сайт</span>
      <a
        className={s.linkWithName}
        href=""
        {...restProps}
        rel={"nofollow"}
        target={"_blank"}
      >
        {webSiteName}
        <div className={s.iconContainer}>
          <LinkIcon />
        </div>
      </a>
    </div>
  );
};
