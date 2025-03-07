import Image from "next/image";
import s from "./error.module.scss";
import { ContactButton } from "@/components/ui/buttons/contactButton/contactButton";

export default function NotFound() {
  return (
    <div className={s.errorContainer}>
      <h1>404</h1>
      <p>
        Страница не существует. <br />
        Перейти на главную страницу?
      </p>
      <ContactButton href={"/"} text={"Главная страница"} className={s.link} />
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
