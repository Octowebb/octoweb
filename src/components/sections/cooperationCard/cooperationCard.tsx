import s from "./cooperationCard.module.scss";
import { AnimatedField } from "../../ui/animatedField/animatedField";
import ArrowIcon from "@/svg/arrow.svg";
import HappySymbol from "@/svg/happy-symbol.svg";
import { Picture } from "@/components/ui/picture/picture";
import { ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";
import { api } from "@/common/api";

type CooperationCardProps = ComponentPropsWithoutRef<"div">;

export default async function CooperationCard(props: CooperationCardProps) {
  const teamPhoto = await api.getTeamServicesPhoto();
  const { className, ...restProps } = props;
  const classNames = clsx(s.cooperationCard, className);
  return (
    <section className={classNames} {...restProps}>
      <div className={s.text}>
        <div>НАША</div>
        <AnimatedField variant={"light"} className={s.starsSymbols}>
          ★ ★ ★ ★ ★
        </AnimatedField>
        <div>ВЕБ-СТУДИЯ</div>
        <div>ОРИЕНТИРОВАНА</div>
        <AnimatedField className={s.happySymbol}>
          <HappySymbol />
        </AnimatedField>
        <div>на</div>
        <AnimatedField className={s.kaomojiSymbol}>くコ:彡</AnimatedField>
        <AnimatedField variant={"dark"} className={s.emojiSymbol}>
          (:\/)
        </AnimatedField>
        <div>Долгосрочное</div>
        <div>сотрудничество</div>
        <AnimatedField variant={"dark"} className={s.arrowSymbol}>
          <ArrowIcon />
        </AnimatedField>
        <AnimatedField variant={"light"} className={s.kissSymbol}>
          :^*
        </AnimatedField>
      </div>
      <div className={s.map}>
        <Picture
          src={teamPhoto}
          alt={"Команда"}
          fill
          sizes={
            "(max-width: 767px) 375px,(max-width: 1265px) 736px, (max-width: 1425px) 1193px, (max-width: 1905px) 1224px, 1655px"
          }
          containerProps={{ className: s.imgContainer }}
          unoptimized
        />
        <p>
          Мы базируемся в Краснодаре и эффективно сотрудничаем с клиентами по
          всей России на удаленной основе.
        </p>
      </div>
    </section>
  );
}
