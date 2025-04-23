import React, { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import { clsx } from "clsx";
import s from "./checkbox.module.scss";

export type CheckboxProps = {
  text: string | ReactNode;
  divProps?: ComponentPropsWithoutRef<"div">;
} & ComponentPropsWithoutRef<"input">;

export const Checkbox = React.forwardRef(
  (props: CheckboxProps, ref: Ref<HTMLInputElement>) => {
    const { text, divProps, className, ...restProps } = props;
    const classNames = clsx(s.checkbox, className);
    return (
      <div {...divProps} className={classNames}>
        <input {...restProps} type={"checkbox"} id={restProps.name} ref={ref} />
        <label htmlFor={restProps.name}>{text}</label>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
