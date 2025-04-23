import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import s from "./footer.module.scss";
import { ContactLinks, ContactLinksProps } from "../contactLinks/contactLinks";
import { BriefButton } from "@/components/ui/buttons/briefButton/briefButton";
import { NavigationButton } from "@/components/ui/buttons/navigationButton/navigationButton";
import Link from "next/link";
import { routes } from "@/common/routes";

export type FooterProps = {
  needBriefLink?: boolean;
  contactLinksProps: ContactLinksProps;
} & ComponentPropsWithoutRef<"div">;

export const Footer = (props: FooterProps) => {
  const {
    needBriefLink = true,
    className,
    contactLinksProps,
    ...restProps
  } = props;
  const classNames = clsx(s.footer, className);

  return (
    <div {...restProps} className={classNames}>
      <div className={s.container}>
        <ContactLinks {...contactLinksProps} />
        {needBriefLink && (
          <BriefButton variant={"secondary"} className={s.briefButton} />
        )}
        <div className={s.contacts}>
          <a
            href="mailto:info@octoweb.ru"
            className={clsx("noRoutingLink", s.email)}
            target="_blank"
          >
            info@octoweb.ru
          </a>
          <a href="tel:+79054077832" className="noRoutingLink" target="_blank">
            +7 905 407-78-32
          </a>
          <address>
            <span>КРАСНОДАР </span>
            <br />
            <span>350062, ул. Атарбекова 7, Россия </span>
          </address>
        </div>
      </div>
      <div className={s.panelUp}>
        <div className={s.arrow}>
          <NavigationButton variant={"up"} as={"a"} href={"#top"} />
        </div>
        <div className={s.bottomCaption}>
          <div className={s.docLinks}>
            <Link href={routes.privacyPolicy} target={"_blank"}>
              Политика конфиденциальности
            </Link>
            <Link href={routes.userAgreement} target={"_blank"}>
              Пользовательское соглашение
            </Link>
            <Link href={routes.cookieUsing} target={"_blank"}>
              Политика использования cookie
            </Link>
            <Link href={routes.personalDataPolicy} target={"_blank"}>
              Политика обработки персональных данных
            </Link>
          </div>
          <span className={s.copyright}>
            © OctoWeb {new Date().getFullYear()} — Все права защищены
          </span>
        </div>
      </div>
    </div>
  );
};
