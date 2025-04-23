"use client";

import { ComponentPropsWithoutRef, useRef, useState } from "react";
import clsx from "clsx";
import s from "./form.module.scss";
import { Input } from "@/components/ui/textField/input";
import { useForm } from "react-hook-form";
import { Checkbox } from "../../ui/checkbox/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/buttons/button/button";
import { InputWithCounter } from "@/components/ui/textField/inputWithCounter/inputWithCounter";
import { formSchema } from "@/common/validation";
import { FormNotification } from "@/components/layouts/formNotification/formNotification";
import { api } from "@/common/api";
import { Loader } from "@/components/ui/loader/loader";
import Link from "next/link";
import { routes } from "@/common/routes";
import { toast } from "react-toastify";

export type FormValues = z.infer<typeof formSchema>;
export type FormProps = ComponentPropsWithoutRef<"div">;

export const Form = (props: FormProps) => {
  const { className, ...restProps } = props;
  const classNames = clsx(s.form, className);
  const [isFormNotificationShown, setIsFormNotificationShown] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    setError,
    setFocus,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      tel: "",
      projectDescription: "",
      projectDescriptionFile: {} as FileList,
      mailing: false,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: FormValues) => {
    const response = await api.postForm(data);
    if (!response) {
      toast.error("Что-то пошло не так");
      return;
    }
    if (!("code" in response)) {
      setIsFormNotificationShown(true);
    } else {
      if (response?.data?.status === 400 && response.data.errors)
        Object.entries(response.data.errors).forEach(([key, value], index) => {
          const typedKey = key as keyof FormValues;
          setError(typedKey, { type: "server", message: value as string });
          if (index === 0) setFocus(typedKey);
        });
      if (response?.code === "recaptcha_failed") {
        toast.error("Вы не прошли проверку recaptcha");
      }
      if (response?.data?.status === 500) {
        toast.error(response?.message || "Что-то пошло не так");
      }
    }
  };

  const handleCloseNotification = () => {
    setIsFormNotificationShown(false);
    reset();
  };

  return (
    <div {...restProps} className={classNames}>
      {isFormNotificationShown && (
        <FormNotification onButtonClick={handleCloseNotification} />
      )}
      {isSubmitting && (
        <div className={s.loaderContainer}>
          <Loader />
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} ref={form} noValidate>
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
          className={s.inputWithCounter}
          onDeleteFile={() =>
            setValue("projectDescriptionFile", {} as FileList, {
              shouldValidate: true,
            })
          }
        />
        <Checkbox
          {...register("mailing")}
          text={"Хочу получать информационные и рекламные письма от OctoWeb"}
          className={s.checkbox}
        />
        <div className={s.submit}>
          <p>
            Я принимаю условия{" "}
            <Link href={routes.userAgreement} target="_blank">
              Пользовательского соглашения
            </Link>{" "}
            и даю свое согласие на обработку моих персональных данных на
            условиях{" "}
            <Link href={routes.privacyPolicy} target="_blank">
              Политики конфиденциальности.
            </Link>{" "}
            <span>
              С&nbsp;
              <Link href={routes.personalDataPolicy} target="_blank">
                Политикой в отношении обработки и защиты персональных данных
              </Link>{" "}
              ознакомлен.
            </span>
          </p>
          <Button
            text={"Отправить"}
            type={"submit"}
            className={s.arrowButton}
          />
        </div>
      </form>
    </div>
  );
};
