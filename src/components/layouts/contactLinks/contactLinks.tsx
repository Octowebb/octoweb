import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import s from "./contactLinks.module.scss";
import { ContactLink } from "../../ui/contactLink/contactLink";
import TelegramIcon from "@/svg/socials/telegram.svg";
import InstagramIcon from "@/svg/socials/instagram.svg";
import WhatsAppIcon from "@/svg/socials/whatsUp.svg";
import VKIcon from "@/svg/socials/vk.svg";
import { Social } from "@/common/types";

export type ContactLinksProps = {
  socials: Social[];
  containerProps?: ComponentPropsWithoutRef<"div">;
  needWarning?: boolean;
} & ComponentPropsWithoutRef<"div">;

export const ContactLinks = (props: ContactLinksProps) => {
  const {
    socials,
    className,
    containerProps,
    needWarning = true,
    ...restProps
  } = props;
  const containerClassNames = clsx(
    s.contactLinksContainer,
    containerProps?.className,
  );
  const classNames = clsx(s.contactLinks, className);

  const contactLinks = socials?.map((social: Social) => {
    switch (social.name) {
      case "telegram":
        return (
          <ContactLink
            href={social.url}
            aria-label="Telegram"
            key={social.name}
          >
            <TelegramIcon /> <span>Telegram</span>
          </ContactLink>
        );
      case "instagram":
        return (
          <ContactLink
            href={social.url}
            aria-label="Instagram"
            key={social.name}
          >
            <InstagramIcon /> <span>Instagram*</span>
          </ContactLink>
        );
      case "whatsapp":
        return (
          <ContactLink
            href={social.url}
            aria-label="WhatsApp"
            key={social.name}
          >
            <WhatsAppIcon /> <span>WhatsApp</span>
          </ContactLink>
        );
      case "vk":
        return (
          <ContactLink
            href={social.url}
            aria-label="VK group"
            key={social.name}
          >
            <VKIcon /> <span>VK group</span>
          </ContactLink>
        );
    }
  });

  return (
    <div {...restProps} className={containerClassNames}>
      <div className={classNames}>{contactLinks}</div>
      {needWarning && (
        <p className={s.warning}>
          * Instagram и WhatsApp принадлежат компании Meta, признанной
          экстремистской организацией и запрещенной в РФ
        </p>
      )}
    </div>
  );
};
