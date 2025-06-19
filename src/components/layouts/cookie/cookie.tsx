"use client";

import Link from "next/link";
import { routes } from "@/common/routes";
import s from "./cookie.module.scss";
import { useEffect, useState } from "react";
import { getCookie } from "@/common/commonFunctions";

export const Cookie = () => {
  const [open, setOpen] = useState(true);
  const [hasPermission, setHasPermission] = useState(true);

  useEffect(() => {
    const cookieAcc = getCookie("cookie");
    if (cookieAcc === "yes") {
      setHasPermission(true);
    } else {
      setHasPermission(false);
    }
  }, []);

  const close = () => {
    setOpen(false);
  };

  const accept = () => {
    document.cookie = "cookie=yes";
    close();
  };
  const reject = () => {
    document.cookie = "cookie=no";
    close();
  };

  return (
    <>
      {!hasPermission && open && (
        <div className={s.cookie}>
          <p>
            Используя данный сайт, вы даете согласие на использование файлов
            cookie, помогающих нам сделать его удобнее для вас
          </p>
          <div className={s.buttons}>
            <button className={s.button} onClick={accept}>
              Принять
            </button>
            <button className={s.button} onClick={reject}>
              Отклонить
            </button>
            <Link
              href={routes.cookieUsing}
              className={s.button}
              target="_blank"
              rel="noopener noreferrer"
            >
              Политика использования cookie
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
