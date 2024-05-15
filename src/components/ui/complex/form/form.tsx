import { ComponentPropsWithoutRef, ElementRef, useRef } from "react";
import clsx from "clsx";
import s from "./form.module.scss";
import { Input } from "../../primitive/input/input.tsx";
import { useForm } from "react-hook-form";
import { Checkbox } from "../../primitive/checkbox/checkbox.tsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowButtonWithText } from "../../primitive/ArrowButtonWithText/arrowButtonWithText.tsx";
import { formSchema } from "../../../../common/validation.ts";
import emailjs from "@emailjs/browser";
import { useHookFormMask } from "use-mask-input";
import { InputWithCounter } from "../../primitive/inputWithCounter/inputWithCounter.tsx";

type FormValues = z.infer<typeof formSchema>;
export type FormProps = ComponentPropsWithoutRef<"div">;

export const Form = (props: FormProps) => {
  const form = useRef<ElementRef<"form">>(null);

  const { className, ...restProps } = props;
  const classNames = clsx(s.form, className);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      email: undefined,
      tel: undefined,
      projectDescription: undefined,
      projectDescriptionFile: undefined,
      mailing: false,
    },
    mode: "onBlur",
  });

  const registerWithMask = useHookFormMask(register);
  console.log(errors);

  const onSubmit = (data: FormValues) => {
    console.log(data);

    // e.preventDefault();
    if (form.current) {
      emailjs
        .sendForm("service_lxgyeoc", "template_o1vilzd", form.current, {
          publicKey: "BXCsYOL3OfUW1Zrlv",
        })
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          },
        );
    } else {
      console.log("'Form element is not available'");
    }
  };

  return (
    <div {...restProps} className={classNames}>
      <form onSubmit={handleSubmit(onSubmit)} ref={form}>
        <div className={s.mainInfo}>
          <Input
            label={"Имя"}
            isRequiredField
            {...register("name")}
            placeholder={"Как вас зовут?"}
            className={s.item}
            errorMessage={errors.name?.message}
          />
          <Input
            label={"email"}
            isRequiredField
            {...register("email")}
            type={"email"}
            placeholder={"Электронная почта"}
            className={s.item}
            errorMessage={errors.email?.message}
          />
          <Input
            label={"Номер телефона"}
            isRequiredField
            {...register("tel")}
            {...registerWithMask("tel", ["+7 (999) 999-99-99"])}
            type="tel"
            placeholder={"+7 (900) 000-00-00"}
            className={s.item}
            errorMessage={errors.tel?.message}
          />
        </div>
        <InputWithCounter
          label={"О проекте"}
          isRequiredField
          placeholder={"Расскажите о своем проекте"}
          {...register("projectDescription")}
          name={"projectDescription"}
          fileProps={{ ...register("projectDescriptionFile") }}
          errorMessage={[
            errors.projectDescription?.message,
            errors.projectDescriptionFile?.message,
          ]}
        />
        <Checkbox
          {...register("mailing")}
          text={"Хочу получать информационные и рекламные письма от OctoWeb"}
          className={s.checkbox}
        />
        <div className={s.submit}>
          <p>
            Я принимаю условия{" "}
            <a href={"#"} rel={"nofollow"}>
              Политики ООО OctoWeb в отношении обработки данных
            </a>{" "}
            и, нажимая на кнопку “Отправить”, даю согласие на обработку
            компанией указанных мной персональных данных
          </p>
          <ArrowButtonWithText
            text={"Отправить"}
            type={"submit"}
            className={s.arrowButton}
          />
        </div>
      </form>
    </div>
  );
};
