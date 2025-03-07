"use client";
import Image from "next/image";
import s from "./error.module.scss";

export default function Error() {
  return (
    <div className={s.errorContainer}>
      <h1>Упс!</h1>
      <p>
        Произошла ошибка. <br />
        Попробуйте перезагрузить страницу
      </p>
      <div className={s.positionContainer}>
        <div className={s.bubbleContainer}>
          <Image
            src={"/bubble.webp"}
            alt=""
            fill
            sizes={
              "(max-width: 1100px) 330px, (max-width: 1400px) 530px, 630px"
            }
            unoptimized
          />
        </div>
      </div>
      <div className={s.positionContainer}>
        <div className={s.bubbleContainer}>
          <Image
            src={"/bubble-2.webp"}
            alt=""
            fill
            sizes={
              "(max-width: 1100px) 330px, (max-width: 1400px) 530px, 630px"
            }
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
