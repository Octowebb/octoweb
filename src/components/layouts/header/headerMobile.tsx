"use client";

import s from "./headerMobile.module.scss";
import { Logo } from "@/components/ui/logo/logo";
import OpenMenuIcon from "@/svg/open-menu-icon.svg";
import clsx from "clsx";
import CloseIcon from "@/svg/close-icon.svg";
import { Navbar } from "@/components/ui/navbar/navbar";
import { ContactButton } from "@/components/ui/buttons/contactButton/contactButton";
import { useRef, useState } from "react";
import { useClose } from "@/common/customHooks/useClose";
import { ContactLinks } from "@/components/layouts/contactLinks/contactLinks";
import { Social } from "@/common/types";

type HeaderMobileProps = { needContactButton?: boolean; socials: Social[] };

export const HeaderMobile = (props: HeaderMobileProps) => {
  const { socials, needContactButton = true } = props;
  const [open, setOpen] = useState(false);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const close = () => {
    setOpen(false);
  };
  useClose({ close, elementRef: sideMenuRef, direction: "right", open });

  return (
    <>
      <div className={s.mainHeader}>
        <Logo />
        <button aria-label="Открыть навигационное меню">
          <OpenMenuIcon
            onClick={() => setOpen(true)}
            className={s.menuButton}
          />
        </button>
      </div>
      <div className={clsx(s.sideMenu, !open && s.hidden)}>
        <div className={s.overlay}>
          <div className={s.content} ref={sideMenuRef}>
            <div>
              <div className={s.sideMenuHeader}>
                <Logo onClick={close} sideMenuLogo />
                <button onClick={close} aria-label="Закрыть навигационное меню">
                  <CloseIcon className={s.closeIcon} />
                </button>
              </div>
              <Navbar className={s.navbar} onEveryLinkClick={close} />
            </div>
            <ContactLinks
              className={s.links}
              needWarning={false}
              socials={socials}
            />
            {needContactButton && (
              <ContactButton className={s.contactButton} onClick={close} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
