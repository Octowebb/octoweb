"use client";

import s from "./brief.module.scss";
import { BriefNavbar } from "@/components/ui/briefNavbar/briefNavbar";
import { Input } from "@/components/ui/textField/input";
import { FromInputAdditionalFile } from "@/components/ui/inputAdditionalFile/formInputAdditionalFile";
import { Button } from "@/components/ui/buttons/button/button";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormRadioGroup } from "@/components/ui/radioGroup/formRadioGroup";
import { RadioCheckboxGroup } from "@/components/ui/radioCheckboxGroup/radioCheckboxGroup";
import ArrowPointerRight from "@/svg/arrow-brief-right.svg";
import ArrowPointerLeft from "@/svg/arrow-brief-left.svg";
import {
  checkboxGroupOptional,
  checkboxGroupRequired,
  defineSchema,
  multipleFilesSchema,
  radio,
} from "@/common/validation";
import { useMemo, useState } from "react";
import { FormNotification } from "@/components/layouts/formNotification/formNotification";
import { Element } from "react-scroll";
import {
  AllFields,
  defaultBriefValues,
  DirtyField,
  SectionName,
} from "@/common/briefHelpers";
import { TextArea } from "@/components/ui/textField/textarea";
import { PreventNavigation } from "@/components/layouts/warning/preventNavigation ";
import { clsx } from "clsx";
import { BigBubble } from "@/components/video/bigBubble";
import { api } from "@/common/api";
import { LinearLoader } from "@/components/ui/linearLoader/linearLoader";
import { routes } from "@/common/routes";
import Link from "next/link";
import { toast } from "react-toastify";
import { Checkbox } from "@/components/ui/checkbox/checkbox";

export default function Brief() {
  const [isFormNotificationShown, setIsFormNotificationShown] = useState(false);
  const [materialsDevelopment, setMaterialsDevelopment] = useState("yes");
  const [knowTargetAudience, setTargetAudience] = useState("yes");

  const allFields: AllFields = useMemo(
    () => ({
      contactInfo: {
        name: {
          required: true,
          label: "Как к Вам обращаться?",
          placeholder: "Ваше имя",
        },
        position: {
          required: false,
          label: "Должность",
          placeholder: "Ваша должность",
        },
        tel: {
          required: true,
          label: "Номер телефона",
          placeholder: "+7 (900) 000-00-00",
        },
        email: {
          required: true,
          label: "email",
          placeholder: "Электронная почта",
        },
        communicationWay: {
          required: false,
          label: "Предпочитаемый способ связи",
        },
      },
      about: {
        companyName: {
          required: true,
          label: "Название компании",
          placeholder: "Укажите название компании",
        },
        semantics: {
          required: false,
          label: "Семантика названия",
          placeholder:
            "Семантическое значение названия компании, которое поможет лучше понять суть бренда и подчеркнуть сильные стороны",
        },
        field: {
          required: true,
          label: "Ниша",
          placeholder: "В какой сфере вы работаете",
        },
        productsAndServices: {
          required: true,
          label: "Ряд продуктов и услуг",
          placeholder: "Какие товары или услуги вы предлагаете",
        },
        productsAndServicesDescription: {
          required: true,
          label: "Описание продукта или услуги",
          placeholder:
            "Подробное описание основных услуг, указанных в предыдущем пункте",
        },
        priorityProductsAndServices: {
          required: true,
          label: "Приоритетные товары и услуги",
          placeholder: "Что для вас в приоритете",
        },
        offerUniqueness: {
          required: true,
          label: "Уникальность предложения",
          placeholder: "Краткое описание фишки и уникальности бренда",
        },
        disadvantages: {
          required: true,
          label: "Недостатки услуги или продукта",
          placeholder: "Что можно улучшить",
        },
        geography: {
          required: true,
          label: "География продукта/услуги",
          placeholder:
            "В каких регионах/ городах / странах представлены услуги или продукт",
        },
        shortCompanyInfo: {
          required: false,
          label: "Краткая информация о компании",
          placeholder: "Что важно знать о вашей компании",
        },
        site: {
          required: false,
          label: "Сайт компании (если есть)",
          placeholder: "Введите сайт компании, если он существует",
        },
        socialNetworks: {
          required: false,
          label: "Социальные сети",
          placeholder: "Прикрепите ссылки на социальные сети, если они есть",
        },
        competitors: {
          required: true,
          label: "Прямые конкуренты",
          placeholder: "Перечислите основных конкурентов",
        },
      },
      details: {
        siteType: { required: true, label: "Тип сайта" },
        goals: {
          required: true,
          label: "Цели, которые должен решить сайт",
          placeholder:
            "Например: увеличить конверсию, рассказать о бизнесе, привлечь и т.д.",
        },
        usersTargetAction: {
          required: true,
          label: "Целевое действие пользователя",
        },
        competitorsSites: {
          required: true,
          label: "Сайты конкурентов",
          placeholder:
            "Укажите сайты прямых или смежных конкурентов, минимум 3",
        },
        advantagesCompetitorsSites: {
          required: true,
          label: "Чем нравятся сайты конкурентов",
          placeholder: "Укажите сильные стороны сайтов конкурентов",
        },
        disadvantagesCompetitorsSites: {
          required: true,
          label: "Чем не нравятся сайты конкурентов",
          placeholder: "Укажите, что не нравится на сайтах конкурентов",
        },
        sitesYouLike: {
          required: false,
          label: "Сайты, которые нравятся",
          placeholder: "Сайты не конкурентов, которые вам нравятся, и почему",
        },
        sitesYouDislike: {
          required: false,
          label: "Сайты, которые не нравятся",
          placeholder:
            "Сайты не конкурентов, которые вам не нравятся, и почему",
        },
        preferredColors: {
          required: false,
          label: "Предпочитаемые цвета",
          placeholder: "Укажите предпочтения в цвете, если они есть",
        },
        unwantedColors: {
          required: false,
          label: "Нежелательные цвета",
          placeholder: "Укажите цвета, которые не подходит вашему продукту",
        },
        siteFunctionality: {
          required: true,
          label: "Планируемый функционал сайта",
        },
        specificSystem: {
          required: false,
          label:
            "Есть ли определенная CMS система, на которой нужно сделать сайт?",
          placeholder: "Например Tilda, WordPress и др.",
        },
        seo: { required: true, label: "SEO-Оптимизация" },
        copywriting: { required: true, label: "Копирайтинг" },
      },
      targetGroup: {
        knowTargetAudience: { required: true, label: "Знаете ли вы свою ЦА" },
        sex: {
          required: knowTargetAudience === "yes",
          label: "Пол",
          placeholder: "Например — 80% М",
        },
        age: {
          required: knowTargetAudience === "yes",
          label: "Возраст",
          placeholder: "Например — 35-45 лет",
        },
        income: {
          required: knowTargetAudience === "yes",
          label: "Достаток",
          placeholder:
            "Гипотетический доход пользователя, средняя месячная зарплата",
        },
        interests: {
          required: knowTargetAudience === "yes",
          label: "Интересы",
          placeholder:
            "Чем интересуется целевая аудитория, например — спорт, туризм и т.д.",
        },
        useInteractionStages: {
          required: knowTargetAudience === "yes",
          label: "Этапы взаимодействия пользователя с продуктом",
          placeholder: "Опишите путь пользователя от контакта до заказа",
        },
        communicationChannels: {
          required: false,
          label: "Каналы коммуникации с ЦА",
          placeholder:
            "Телефонный звонок, переписка в мессенджерах, почта, соц. сети и т.д.",
        },
        intensityOfUse: {
          required: knowTargetAudience === "yes",
          label: "Интенсивность употребления",
          placeholder: "Как часто будет совершаться повторная покупка/заказ",
        },
      },
      materials: {
        materialsDevelopment: {
          required: true,
          label: "Требуется ли разработка дополнительных материалов",
        },
        materialsToDevelop: {
          required: materialsDevelopment === "yes",
          label: "Перечислите материалы, которые нужно разработать",
          placeholder: "Логотип, фирменный стиль, буклеты, иллюстрации",
        },
      },
      additionalInfo: {
        numberOfLanguageVersions: {
          required: true,
          label: "Кол-во языковых версий",
        },
        budget: {
          required: true,
          label: "Планируемый или рассчитанный бюджет",
          placeholder: "Например: 100-200 т.р.",
        },
        technicalSpecificationAvailable: {
          required: true,
          label: "Есть ли Техническое Задание",
        },
        technicalSpecification: { required: false, label: "Прикрепите ТЗ" },
        siteAdministration: {
          required: true,
          label: "Требуется ли администрирование сайта после запуска",
        },
        additionalInfo: {
          required: false,
          label: "Дополнительная информация",
          placeholder: "Дополнительная информация по проекту",
        },
        additionalFiles: { required: false, label: "Дополнительные файлы" },
      },
    }),
    [materialsDevelopment, knowTargetAudience],
  );

  const contactInfo = z.object({
    name: defineSchema(allFields.contactInfo.name),
    position: defineSchema(allFields.contactInfo.position),
    tel: defineSchema(allFields.contactInfo.tel).refine(
      (value) => {
        const phoneDigits = value.replace(/\D/g, "");
        return phoneDigits.length === 11;
      },
      { message: "Номер телефона должен содержать 11 цифр" },
    ),
    email: defineSchema(allFields.contactInfo.email).email(),
    communicationWay: checkboxGroupOptional,
  });
  const about = z.object({
    companyName: defineSchema(allFields.about.companyName),
    semantics: defineSchema(allFields.about.semantics),
    field: defineSchema(allFields.about.field),
    productsAndServices: defineSchema(allFields.about.productsAndServices),
    productsAndServicesDescription: defineSchema(
      allFields.about.productsAndServicesDescription,
    ),
    priorityProductsAndServices: defineSchema(
      allFields.about.priorityProductsAndServices,
    ),
    offerUniqueness: defineSchema(allFields.about.offerUniqueness),
    disadvantages: defineSchema(allFields.about.disadvantages),
    geography: defineSchema(allFields.about.geography),
    shortCompanyInfo: defineSchema(allFields.about.shortCompanyInfo),
    site: defineSchema(allFields.about.site),
    socialNetworks: defineSchema(allFields.about.socialNetworks),
    competitors: defineSchema(allFields.about.competitors),
  });
  const details = z.object({
    siteType: radio,
    goals: defineSchema(allFields.details.goals),
    usersTargetAction: checkboxGroupRequired,
    competitorsSites: defineSchema(allFields.details.competitorsSites),
    advantagesCompetitorsSites: defineSchema(
      allFields.details.advantagesCompetitorsSites,
    ),
    disadvantagesCompetitorsSites: defineSchema(
      allFields.details.disadvantagesCompetitorsSites,
    ),
    sitesYouLike: defineSchema(allFields.details.sitesYouLike),
    sitesYouDislike: defineSchema(allFields.details.sitesYouDislike),
    preferredColors: defineSchema(allFields.details.preferredColors),
    unwantedColors: defineSchema(allFields.details.unwantedColors),
    siteFunctionality: checkboxGroupRequired,
    specificSystem: defineSchema(allFields.details.specificSystem),
    seo: radio,
    copywriting: radio,
  });
  const targetGroup = z.object({
    knowTargetAudience: radio,
    sex: defineSchema(allFields.targetGroup.sex),
    age: defineSchema(allFields.targetGroup.age),
    income: defineSchema(allFields.targetGroup.income),
    interests: defineSchema(allFields.targetGroup.interests),
    useInteractionStages: defineSchema(
      allFields.targetGroup.useInteractionStages,
    ),
    communicationChannels: defineSchema(
      allFields.targetGroup.communicationChannels,
    ),
    intensityOfUse: defineSchema(allFields.targetGroup.intensityOfUse),
  });
  const materials = z.object({
    materialsDevelopment: radio,
    materialsToDevelop: defineSchema(allFields.materials.materialsToDevelop),
  });
  const additionalInfo = z.object({
    numberOfLanguageVersions: radio,
    budget: defineSchema(allFields.additionalInfo.budget),
    technicalSpecificationAvailable: defineSchema(
      allFields.additionalInfo.technicalSpecificationAvailable,
    ),
    technicalSpecification: multipleFilesSchema.optional(),
    siteAdministration: defineSchema(
      allFields.additionalInfo.siteAdministration,
    ),
    additionalInfo: defineSchema(allFields.additionalInfo.additionalInfo),
    additionalFiles: multipleFilesSchema.optional(),
  });
  const briefSchema = z.object({
    contactInfo,
    about,
    details,
    targetGroup,
    materials,
    additionalInfo,
    permission: z.literal(true, {
      errorMap: () => ({
        message:
          "Подтвердите согласие с условиями и политикой конфиденциальности",
      }),
    }),
  });
  type BriefValues = z.infer<typeof briefSchema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty, isSubmitting },
    watch,
    setError,
    setFocus,
    clearErrors,
    reset,
  }: UseFormReturn<BriefValues> = useForm<BriefValues>({
    resolver: zodResolver(briefSchema),
    defaultValues: defaultBriefValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const currentFields = watch([
    "targetGroup.knowTargetAudience",
    "materials.materialsDevelopment",
  ]);
  const currentKnowTargetAudience = currentFields[0];
  const currentMaterialsDevelopment = currentFields[1];

  if (currentKnowTargetAudience !== knowTargetAudience) {
    setTargetAudience(currentFields[0]);
  }
  if (currentMaterialsDevelopment !== materialsDevelopment) {
    setMaterialsDevelopment(currentFields[1]);
  }

  const onSubmit = async (data: BriefValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { permission, ...restData } = data;
    const response = await api.postBrief(restData);
    if (!response) {
      toast.error("Что-то пошло не так");
      return;
    }

    if (!("code" in response)) {
      setIsFormNotificationShown(true);
    } else {
      if (response?.data?.status === 400 && response.data.errors) {
        Object.entries(response.data.errors).forEach(([key, value], index) => {
          const fieldName = key.split("_").join(".") as keyof BriefValues;
          setError(fieldName, { type: "server", message: value as string });
          if (index === 0) setFocus(fieldName);
        });
      }
      if (response?.code === "recaptcha_failed") {
        toast.error("Вы не прошли проверку recaptcha");
      }
      if (response?.data?.status === 500) {
        toast.error(response?.message || "Что-то пошло не так");
      }
    }
  };

  if (knowTargetAudience !== "yes") {
    if (errors.targetGroup) {
      clearErrors("targetGroup");
    }
  }

  if (materialsDevelopment !== "yes") {
    if (errors.materials) {
      clearErrors("materials");
    }
  }

  const checkSectionDone = (sectionName: SectionName) => {
    if (materialsDevelopment === "no" && sectionName === "materials") {
      return true;
    }

    if (knowTargetAudience === "no" && sectionName === "targetGroup") {
      return true;
    }

    const requiredFields = Object.keys(allFields[sectionName]).filter(
      (fieldName) => allFields[sectionName][fieldName].required,
    );

    const isRequiredFieldsNonEmpty = requiredFields.every((fieldName) => {
      if (
        fieldName === "siteType" ||
        fieldName === "seo" ||
        fieldName === "copywriting" ||
        fieldName === "knowTargetAudience" ||
        fieldName === "materialsDevelopment" ||
        fieldName === "numberOfLanguageVersions" ||
        fieldName === "technicalSpecificationAvailable" ||
        fieldName === "siteAdministration"
      ) {
        return true;
      } else {
        const sectionDirtyFields = dirtyFields[sectionName] as
          | DirtyField
          | undefined;
        return sectionDirtyFields
          ? sectionDirtyFields[fieldName] !== undefined
          : false;
      }
    });
    const isSectionHasErrors = sectionName in errors;
    return isRequiredFieldsNonEmpty && !isSectionHasErrors;
  };

  const briefSections = [
    {
      text: "Контактная информация",
      completed: checkSectionDone("contactInfo"),
      sectionId: "contactInfo",
    },
    {
      text: "О компании и продукте",
      completed: checkSectionDone("about"),
      sectionId: "about",
    },
    {
      text: "Детализация задачи",
      completed: checkSectionDone("details"),
      sectionId: "details",
    },
    {
      text: "Целевая аудитория",
      completed: checkSectionDone("targetGroup"),
      sectionId: "targetGroup",
    },
    {
      text: "Материалы",
      completed: checkSectionDone("materials"),
      sectionId: "materials",
    },
    {
      text: "Доп. информация",
      completed: checkSectionDone("additionalInfo"),
      sectionId: "additionalInfo",
    },
  ];

  const handleCloseNotification = () => {
    setIsFormNotificationShown(false);
    reset();
  };

  return (
    <div className={s.briefPage}>
      {isFormNotificationShown && (
        <FormNotification onButtonClick={handleCloseNotification} />
      )}
      <PreventNavigation isDirty={isDirty} />
      {isSubmitting && <LinearLoader />}
      <div className={"mainContainer"}>
        <section className={s.startSection}>
          <h1>
            БРИФ студии <br />
            <span className={s.accent}>OCTOWEB</span>
          </h1>
          <ArrowPointerRight className={s.arrowRight} />
          <div className={s.explanation}>
            <p>
              Перед началом работы, пожалуйста, ответьте на наши вопросы. Ответы
              станут отправной точкой. Это позволит собрать необходимую
              информацию и подготовить подробное коммерческое предложение.
            </p>
            <p>
              Наша цель - сделать общение продуктивным, чтобы уже на начальном
              этапе понять, чем наша команда будет полезна. В случае, если
              увидим, что не справимся с работой, то с удовольствием
              порекомендуем подходящих партнеров, способных решить задачи
              проекта.
            </p>
          </div>
          <BigBubble className={s.bubble} />
          <ArrowPointerLeft className={s.arrowLeft} />
          <span className={s.time}>
            Примерное время <span>заполнения — 15-30 мин.</span>
          </span>
        </section>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.formWithNavigation}>
            <BriefNavbar navItems={briefSections} className={s.navbar} />
            <div className={s.fields}>
              <Element name={"contactInfo"}>
                <section className={s.section} id={"contactInfo"}>
                  <h2>Контактная информация</h2>
                  <Input
                    label={allFields.contactInfo.name.label}
                    isRequiredField={allFields.contactInfo.name.required}
                    placeholder={allFields.contactInfo.name.placeholder}
                    {...register("contactInfo.name")}
                    errorMessage={errors.contactInfo?.name?.message}
                  />
                  <Input
                    label={allFields.contactInfo.position.label}
                    isRequiredField={allFields.contactInfo.position.required}
                    placeholder={allFields.contactInfo.position.placeholder}
                    {...register("contactInfo.position")}
                    errorMessage={errors.contactInfo?.position?.message}
                  />
                  <Input
                    label={allFields.contactInfo.tel.label}
                    isRequiredField={allFields.contactInfo.tel.required}
                    type={"tel"}
                    placeholder={allFields.contactInfo.tel.placeholder}
                    {...register("contactInfo.tel")}
                    errorMessage={errors.contactInfo?.tel?.message}
                  />
                  <Input
                    label={allFields.contactInfo.email.label}
                    isRequiredField={allFields.contactInfo.email.required}
                    type={"email"}
                    placeholder={allFields.contactInfo.email.placeholder}
                    {...register("contactInfo.email")}
                    errorMessage={errors.contactInfo?.email?.message}
                  />
                  <RadioCheckboxGroup
                    mainLabel={allFields.contactInfo.communicationWay.label}
                    isRequiredField={
                      allFields.contactInfo.communicationWay.required
                    }
                    checkboxItems={[
                      {
                        label: "Telegram",
                        value: "telegram",
                        ...register("contactInfo.communicationWay"),
                      },
                      {
                        label: "Skype",
                        value: "skype",
                        ...register("contactInfo.communicationWay"),
                      },
                      {
                        label: "WhatsApp",
                        value: "whatsApp",
                        ...register("contactInfo.communicationWay"),
                      },
                      {
                        label: "Email",
                        value: "email",
                        ...register("contactInfo.communicationWay"),
                      },
                      {
                        label: "Звонок",
                        value: "call",
                        ...register("contactInfo.communicationWay"),
                      },
                    ]}
                    errorMessage={errors.contactInfo?.communicationWay?.message}
                  />
                </section>
              </Element>
              <Element name={"about"}>
                <section className={s.section} id={"about"}>
                  <h2>О компании и продукте</h2>
                  <Input
                    label={allFields.about.companyName.label}
                    isRequiredField={allFields.about.companyName.required}
                    placeholder={allFields.about.companyName.placeholder}
                    {...register("about.companyName")}
                    errorMessage={errors.about?.companyName?.message}
                  />
                  <TextArea
                    label={allFields.about.semantics.label}
                    isRequiredField={allFields.about.semantics.required}
                    placeholder={allFields.about.semantics.placeholder}
                    {...register("about.semantics")}
                    errorMessage={errors.about?.semantics?.message}
                  />
                  <Input
                    label={allFields.about.field.label}
                    isRequiredField={allFields.about.field.required}
                    placeholder={allFields.about.field.placeholder}
                    {...register("about.field")}
                    errorMessage={errors.about?.field?.message}
                  />
                  <TextArea
                    label={allFields.about.productsAndServices.label}
                    isRequiredField={
                      allFields.about.productsAndServices.required
                    }
                    placeholder={
                      allFields.about.productsAndServices.placeholder
                    }
                    {...register("about.productsAndServices")}
                    errorMessage={errors.about?.productsAndServices?.message}
                  />
                  <TextArea
                    label={allFields.about.productsAndServicesDescription.label}
                    isRequiredField={
                      allFields.about.productsAndServicesDescription.required
                    }
                    placeholder={
                      allFields.about.productsAndServicesDescription.placeholder
                    }
                    {...register("about.productsAndServicesDescription")}
                    errorMessage={
                      errors.about?.productsAndServicesDescription?.message
                    }
                  />
                  <Input
                    label={allFields.about.priorityProductsAndServices.label}
                    isRequiredField={
                      allFields.about.priorityProductsAndServices.required
                    }
                    placeholder={
                      allFields.about.priorityProductsAndServices.placeholder
                    }
                    {...register("about.priorityProductsAndServices")}
                    errorMessage={
                      errors.about?.priorityProductsAndServices?.message
                    }
                  />
                  <TextArea
                    label={allFields.about.offerUniqueness.label}
                    isRequiredField={allFields.about.offerUniqueness.required}
                    placeholder={allFields.about.offerUniqueness.placeholder}
                    {...register("about.offerUniqueness")}
                    errorMessage={errors.about?.offerUniqueness?.message}
                  />
                  <TextArea
                    label={allFields.about.disadvantages.label}
                    isRequiredField={allFields.about.disadvantages.required}
                    placeholder={allFields.about.disadvantages.placeholder}
                    {...register("about.disadvantages")}
                    errorMessage={errors.about?.disadvantages?.message}
                  />
                  <TextArea
                    label={allFields.about.geography.label}
                    isRequiredField={allFields.about.geography.required}
                    placeholder={allFields.about.geography.placeholder}
                    {...register("about.geography")}
                    errorMessage={errors.about?.geography?.message}
                  />
                  <TextArea
                    label={allFields.about.shortCompanyInfo.label}
                    isRequiredField={allFields.about.shortCompanyInfo.required}
                    placeholder={allFields.about.shortCompanyInfo.placeholder}
                    {...register("about.shortCompanyInfo")}
                    errorMessage={errors.about?.shortCompanyInfo?.message}
                  />
                  <TextArea
                    label={allFields.about.site.label}
                    isRequiredField={allFields.about.site.required}
                    placeholder={allFields.about.site.placeholder}
                    {...register("about.site")}
                    errorMessage={errors.about?.site?.message}
                  />
                  <TextArea
                    label={allFields.about.socialNetworks.label}
                    isRequiredField={allFields.about.socialNetworks.required}
                    placeholder={allFields.about.socialNetworks.placeholder}
                    {...register("about.socialNetworks")}
                    errorMessage={errors.about?.socialNetworks?.message}
                  />
                  <TextArea
                    label={allFields.about.competitors.label}
                    isRequiredField={allFields.about.competitors.required}
                    placeholder={allFields.about.competitors.placeholder}
                    {...register("about.competitors")}
                    errorMessage={errors.about?.competitors?.message}
                  />
                </section>
              </Element>
              <Element name={"details"}>
                <section className={s.section} id={"details"}>
                  <h2>Детализация задачи</h2>
                  <FormRadioGroup
                    mainLabel={allFields.details.siteType.label}
                    isRequiredField={allFields.details.siteType.required}
                    name={"details.siteType"}
                    control={control}
                    radioItems={[
                      { label: "Лендинг", value: "landing" },
                      { label: "Сайт-визитка", value: "siteCard" },
                      { label: "Интернет-магазин", value: "onlineStore" },
                      { label: "Информационный сайт", value: "informational" },
                      { label: "Корпоративный сайт", value: "corporate" },
                      { label: "Лонгрид", value: "longrid" },
                      {
                        label: "Нужна консультация",
                        value: "NeedConsultation",
                      },
                    ]}
                  />
                  <TextArea
                    label={allFields.details.goals.label}
                    isRequiredField={allFields.details.goals.required}
                    placeholder={allFields.details.goals.placeholder}
                    {...register("details.goals")}
                    errorMessage={errors.details?.goals?.message}
                  />
                  <RadioCheckboxGroup
                    mainLabel={allFields.details.usersTargetAction.label}
                    isRequiredField={
                      allFields.details.usersTargetAction.required
                    }
                    checkboxItems={[
                      {
                        label: "Купить",
                        value: "buy",
                        ...register("details.usersTargetAction"),
                      },
                      {
                        label: "Зарегистрироваться",
                        value: "register",
                        ...register("details.usersTargetAction"),
                      },
                      {
                        label: "Забронировать",
                        value: "book",
                        ...register("details.usersTargetAction"),
                      },
                      {
                        label: "Заказать",
                        value: "order",
                        ...register("details.usersTargetAction"),
                      },
                      {
                        label: "Подписаться",
                        value: "subscribe",
                        ...register("details.usersTargetAction"),
                      },
                      {
                        label: "Оставить заявку",
                        value: "submitApplication",
                        ...register("details.usersTargetAction"),
                      },
                      {
                        label: "Позвонить",
                        value: "call",
                        ...register("details.usersTargetAction"),
                      },
                      {
                        label: "Другое",
                        value: "other",
                        ...register("details.usersTargetAction"),
                      },
                    ]}
                    errorMessage={errors.details?.usersTargetAction?.message}
                  />
                  <TextArea
                    label={allFields.details.competitorsSites.label}
                    isRequiredField={
                      allFields.details.competitorsSites.required
                    }
                    placeholder={allFields.details.competitorsSites.placeholder}
                    {...register("details.competitorsSites")}
                    errorMessage={errors.details?.competitorsSites?.message}
                  />
                  <TextArea
                    label={allFields.details.advantagesCompetitorsSites.label}
                    isRequiredField={
                      allFields.details.advantagesCompetitorsSites.required
                    }
                    placeholder={
                      allFields.details.advantagesCompetitorsSites.placeholder
                    }
                    {...register("details.advantagesCompetitorsSites")}
                    errorMessage={
                      errors.details?.advantagesCompetitorsSites?.message
                    }
                  />
                  <div className={s.fieldWithAccent}>
                    <label
                      htmlFor="details.disadvantagesCompetitorsSites"
                      className={s.label}
                    >
                      Чем <span className={s.accent}>не</span> нравятся сайты
                      конкурентов&nbsp;
                      {allFields.details.disadvantagesCompetitorsSites
                        .required && <sup className={s.required}> *</sup>}
                    </label>
                    <TextArea
                      placeholder={
                        allFields.details.disadvantagesCompetitorsSites
                          .placeholder
                      }
                      {...register("details.disadvantagesCompetitorsSites")}
                      name={"details.disadvantagesCompetitorsSites"}
                      errorMessage={
                        errors.details?.disadvantagesCompetitorsSites?.message
                      }
                    />
                  </div>
                  <TextArea
                    label={allFields.details.sitesYouLike.label}
                    isRequiredField={allFields.details.sitesYouLike.required}
                    placeholder={allFields.details.sitesYouLike.placeholder}
                    {...register("details.sitesYouLike")}
                    errorMessage={errors.details?.sitesYouLike?.message}
                  />
                  <div className={s.fieldWithAccent}>
                    <label
                      htmlFor="details.sitesYouDislike"
                      className={s.label}
                    >
                      Сайты, которые <span className={s.accent}>не</span>{" "}
                      нравятся&nbsp;
                      {allFields.details.sitesYouDislike.required && (
                        <sup className={s.required}> *</sup>
                      )}
                    </label>
                    <TextArea
                      placeholder={
                        allFields.details.sitesYouDislike.placeholder
                      }
                      {...register("details.sitesYouDislike")}
                      errorMessage={errors.details?.sitesYouDislike?.message}
                    />
                  </div>
                  <TextArea
                    label={allFields.details.preferredColors.label}
                    isRequiredField={allFields.details.preferredColors.required}
                    placeholder={allFields.details.preferredColors.placeholder}
                    {...register("details.preferredColors")}
                    errorMessage={errors.details?.preferredColors?.message}
                  />
                  <TextArea
                    label={allFields.details.unwantedColors.label}
                    isRequiredField={allFields.details.unwantedColors.required}
                    placeholder={allFields.details.unwantedColors.placeholder}
                    {...register("details.unwantedColors")}
                    errorMessage={errors.details?.unwantedColors?.message}
                  />
                  <RadioCheckboxGroup
                    mainLabel={allFields.details.siteFunctionality.label}
                    isRequiredField={
                      allFields.details.siteFunctionality.required
                    }
                    checkboxItems={[
                      {
                        label: "CRM",
                        value: "crm",
                        ...register("details.siteFunctionality"),
                      },
                      {
                        label: "Корзина и оплата",
                        value: "shoppingCartAndPayment",
                        ...register("details.siteFunctionality"),
                      },
                      {
                        label: "Формы сбора контактов",
                        value: "contactCollectionForms",
                        ...register("details.siteFunctionality"),
                      },
                      {
                        label: "Калькулятор",
                        value: "calculator",
                        ...register("details.siteFunctionality"),
                      },
                      {
                        label: "Настройка рассылки",
                        value: "mailingSetup",
                        ...register("details.siteFunctionality"),
                      },
                      {
                        label: "Интеграция Getcourse",
                        value: "getcourseIntegration",
                        ...register("details.siteFunctionality"),
                      },
                      {
                        label: "Личный кабинет",
                        value: "personalAccount",
                        ...register("details.siteFunctionality"),
                      },
                      {
                        label: "Получение заявок на почту",
                        value: "receivingApplicationsByMail",
                        ...register("details.siteFunctionality"),
                      },
                      {
                        label: "Получение заявок в телеграм",
                        value: "receivingApplicationsByTelegram",
                        ...register("details.siteFunctionality"),
                      },
                      {
                        label: "Каталог",
                        value: "catalog",
                        ...register("details.siteFunctionality"),
                      },
                      {
                        label: "Сохранение информации в Google документы",
                        value: "savingInfoToGoogleDocs",
                        ...register("details.siteFunctionality"),
                      },
                      {
                        label: "Нужна консультация",
                        value: "needConsultation",
                        ...register("details.siteFunctionality"),
                      },
                      {
                        label: "Другие",
                        value: "other",
                        ...register("details.siteFunctionality"),
                      },
                    ]}
                    errorMessage={errors.details?.siteFunctionality?.message}
                  />
                  <TextArea
                    label={allFields.details.specificSystem.label}
                    isRequiredField={allFields.details.specificSystem.required}
                    placeholder={allFields.details.specificSystem.placeholder}
                    {...register("details.specificSystem")}
                    errorMessage={errors.details?.specificSystem?.message}
                  />
                  <FormRadioGroup
                    mainLabel={allFields.details.seo.label}
                    isRequiredField={allFields.details.seo.required}
                    name={"details.seo"}
                    control={control}
                    radioItems={[
                      { label: "Да, нужна", value: "yes" },
                      { label: "Нет, не нужна", value: "no" },
                      { label: "Свой специалист", value: "ownSpecialist" },
                      {
                        label: "Нужна консультация",
                        value: "needConsultation",
                      },
                    ]}
                  />
                  <FormRadioGroup
                    mainLabel={allFields.details.copywriting.label}
                    isRequiredField={allFields.details.copywriting.required}
                    name={"details.copywriting"}
                    control={control}
                    radioItems={[
                      { label: "Да, нужен", value: "yes" },
                      { label: "Нет, не нужен", value: "no" },
                      { label: "Свой специалист", value: "ownSpecialist" },
                      {
                        label: "Нужна консультация",
                        value: "needConsultation",
                      },
                    ]}
                  />
                </section>
              </Element>
              <Element name={"targetGroup"}>
                <section className={s.section} id={"targetGroup"}>
                  <h2>Целевая аудитория</h2>
                  <FormRadioGroup
                    mainLabel={allFields.targetGroup.knowTargetAudience.label}
                    isRequiredField={
                      allFields.targetGroup.knowTargetAudience.required
                    }
                    name={"targetGroup.knowTargetAudience"}
                    control={control}
                    radioItems={[
                      { label: "Да", value: "yes" },
                      { label: "Нет", value: "no" },
                      { label: "Нужна проработка", value: "needToElaboration" },
                    ]}
                  />
                  {knowTargetAudience === "yes" && (
                    <>
                      <div className={s.twoColumns}>
                        <Input
                          label={allFields.targetGroup.sex.label}
                          isRequiredField={allFields.targetGroup.sex.required}
                          placeholder={allFields.targetGroup.sex.placeholder}
                          {...register("targetGroup.sex")}
                          errorMessage={errors.targetGroup?.sex?.message}
                        />
                        <Input
                          label={allFields.targetGroup.age.label}
                          isRequiredField={allFields.targetGroup.age.required}
                          placeholder={allFields.targetGroup.age.placeholder}
                          {...register("targetGroup.age")}
                          errorMessage={errors.targetGroup?.age?.message}
                        />
                      </div>
                      <TextArea
                        label={allFields.targetGroup.income.label}
                        isRequiredField={allFields.targetGroup.income.required}
                        placeholder={allFields.targetGroup.income.placeholder}
                        {...register("targetGroup.income")}
                        errorMessage={errors.targetGroup?.income?.message}
                      />
                      <TextArea
                        label={allFields.targetGroup.interests.label}
                        isRequiredField={
                          allFields.targetGroup.interests.required
                        }
                        placeholder={
                          allFields.targetGroup.interests.placeholder
                        }
                        {...register("targetGroup.interests")}
                        errorMessage={errors.targetGroup?.interests?.message}
                      />
                      <TextArea
                        label={allFields.targetGroup.useInteractionStages.label}
                        isRequiredField={
                          allFields.targetGroup.useInteractionStages.required
                        }
                        placeholder={
                          allFields.targetGroup.useInteractionStages.placeholder
                        }
                        {...register("targetGroup.useInteractionStages")}
                        errorMessage={
                          errors.targetGroup?.useInteractionStages?.message
                        }
                      />
                      <TextArea
                        label={
                          allFields.targetGroup.communicationChannels.label
                        }
                        isRequiredField={
                          allFields.targetGroup.communicationChannels.required
                        }
                        placeholder={
                          allFields.targetGroup.communicationChannels
                            .placeholder
                        }
                        {...register("targetGroup.communicationChannels")}
                        errorMessage={
                          errors.targetGroup?.communicationChannels?.message
                        }
                      />
                      <TextArea
                        label={allFields.targetGroup.intensityOfUse.label}
                        isRequiredField={
                          allFields.targetGroup.intensityOfUse.required
                        }
                        placeholder={
                          allFields.targetGroup.intensityOfUse.placeholder
                        }
                        {...register("targetGroup.intensityOfUse")}
                        errorMessage={
                          errors.targetGroup?.intensityOfUse?.message
                        }
                      />
                    </>
                  )}
                </section>
              </Element>
              <Element name={"materials"}>
                <section className={s.section} id={"materials"}>
                  <h2>Материалы</h2>
                  <FormRadioGroup
                    mainLabel={allFields.materials.materialsDevelopment.label}
                    isRequiredField={
                      allFields.materials.materialsDevelopment.required
                    }
                    name={"materials.materialsDevelopment"}
                    control={control}
                    radioItems={[
                      { label: "Да", value: "yes" },
                      { label: "Нет", value: "no" },
                    ]}
                  />
                  {materialsDevelopment === "yes" && (
                    <TextArea
                      label={allFields.materials.materialsToDevelop.label}
                      isRequiredField={
                        allFields.materials.materialsToDevelop.required
                      }
                      placeholder={
                        allFields.materials.materialsToDevelop.placeholder
                      }
                      {...register("materials.materialsToDevelop")}
                      errorMessage={
                        errors.materials?.materialsToDevelop?.message
                      }
                    />
                  )}
                </section>
              </Element>
              <Element name={"additionalInfo"}>
                <section className={s.section} id={"additionalInfo"}>
                  <h2>Доп. информация</h2>
                  <FormRadioGroup
                    mainLabel={
                      allFields.additionalInfo.numberOfLanguageVersions.label
                    }
                    isRequiredField={
                      allFields.additionalInfo.numberOfLanguageVersions.required
                    }
                    name={"additionalInfo.numberOfLanguageVersions"}
                    control={control}
                    radioItems={[
                      { label: "1", value: "1" },
                      { label: "2", value: "2" },
                      { label: "Больше 2-ух", value: "moreThan2" },
                    ]}
                  />
                  <Input
                    label={allFields.additionalInfo.budget.label}
                    isRequiredField={allFields.additionalInfo.budget.required}
                    placeholder={allFields.additionalInfo.budget.placeholder}
                    {...register("additionalInfo.budget")}
                    errorMessage={errors.additionalInfo?.budget?.message}
                  />
                  <FormRadioGroup
                    mainLabel={
                      allFields.additionalInfo.technicalSpecificationAvailable
                        .label
                    }
                    isRequiredField={
                      allFields.additionalInfo.technicalSpecificationAvailable
                        .required
                    }
                    name={"additionalInfo.technicalSpecificationAvailable"}
                    control={control}
                    radioItems={[
                      { label: "Да", value: "yes" },
                      { label: "Нет", value: "no" },
                    ]}
                  />
                  <FromInputAdditionalFile
                    label={
                      allFields.additionalInfo.technicalSpecification.label
                    }
                    control={control}
                    name={"additionalInfo.technicalSpecification"}
                  />
                  <FormRadioGroup
                    mainLabel={
                      allFields.additionalInfo.siteAdministration.label
                    }
                    isRequiredField={
                      allFields.additionalInfo.siteAdministration.required
                    }
                    name={"additionalInfo.siteAdministration"}
                    control={control}
                    radioItems={[
                      { label: "Да", value: "yes" },
                      { label: "Нет", value: "no" },
                    ]}
                  />
                  <TextArea
                    label={allFields.additionalInfo.additionalInfo.label}
                    isRequiredField={
                      allFields.additionalInfo.additionalInfo.required
                    }
                    placeholder={
                      allFields.additionalInfo.additionalInfo.placeholder
                    }
                    {...register("additionalInfo.additionalInfo")}
                    errorMessage={
                      errors.additionalInfo?.additionalInfo?.message
                    }
                  />
                  <FromInputAdditionalFile
                    label={allFields.additionalInfo.additionalFiles.label}
                    control={control}
                    name={"additionalInfo.additionalFiles"}
                  />
                </section>
              </Element>
            </div>
          </div>
          <section className={s.submit}>
            <Checkbox
              {...register("permission")}
              text={
                <p className={s.terms}>
                  Я принимаю условия{" "}
                  <Link
                    href={routes.userAgreement}
                    target="_blank"
                    className={clsx(s.doc, "noRoutingLink")}
                  >
                    Пользовательского соглашения
                  </Link>{" "}
                  и даю свое согласие на обработку моих персональных данных на
                  условиях{" "}
                  <Link
                    href={routes.privacyPolicy}
                    target="_blank"
                    className={clsx(s.doc, "noRoutingLink")}
                  >
                    Политики конфиденциальности.
                  </Link>{" "}
                  <span>
                    С&nbsp;
                    <Link
                      href={routes.personalDataPolicy}
                      target="_blank"
                      className={clsx(s.doc, "noRoutingLink")}
                    >
                      Политикой в отношении обработки и защиты персональных
                      данных
                    </Link>{" "}
                    ознакомлен.
                  </span>
                </p>
              }
            />
            <Button
              text={"Отправить"}
              type={"submit"}
              className={s.arrowButton}
              disabled={isSubmitting}
            />
          </section>
          {errors?.permission?.message && (
            <p className={s.error}>{errors?.permission?.message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
