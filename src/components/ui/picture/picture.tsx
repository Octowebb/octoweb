"use client";

import { ComponentPropsWithoutRef, ElementType, useState } from "react";
import s from "./picture.module.scss";
import { clsx } from "clsx";
import { Loader, LoaderProps } from "@/components/ui/loader/loader";
import Image from "next/image";

export type PictureProps<CT extends ElementType = "div"> = {
  loaderProps?: LoaderProps;
  containerComponent?: CT;
  containerProps?: ComponentPropsWithoutRef<CT>;
} & ComponentPropsWithoutRef<typeof Image>;

export const Picture = <CT extends ElementType>(props: PictureProps<CT>) => {
  const {
    loaderProps,
    containerComponent: ContainerComponent = "div",
    containerProps,
    ...restProps
  } = props;

  const classNames = clsx(s.imgContainer, containerProps?.className);
  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <ContainerComponent {...containerProps} className={classNames}>
      {loading && (
        <Loader
          {...loaderProps}
          className={clsx(s.loader, loaderProps?.className)}
        />
      )}
      <Image
        onLoad={handleImageLoaded}
        {...restProps}
        quality={100}
        unoptimized
      />
    </ContainerComponent>
  );
};
