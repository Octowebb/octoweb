import { z } from "zod";
import { FieldType } from "@/common/briefHelpers";

//common
export const requiredString = z
  .string()
  .min(1, { message: "Это обязательное поле" })
  .max(500, "Максимум 500 символов");
export const optionalString = z.string().max(500, "Максимум 500 символов");
export const checkboxGroupRequired = z
  .string()
  .array()
  .nonempty({ message: "Выберите хотя бы один вариант" });
export const checkboxGroupOptional = z.string().array().optional();
export const radio = z.string().min(1, { message: "Это обязательное поле" });

const MAX_UPLOAD_SIZE = 1024 * 1024 * 5; // 5MB

export const defineSchema = (fieldName: FieldType) => {
  return fieldName.required ? requiredString : optionalString;
};

export const fileSchema = z.custom<FileList>().refine((fileList) => {
  if (fileList[0] === undefined) return true;
  return fileList[0] && fileList[0]?.size <= MAX_UPLOAD_SIZE;
}, "Размер файла не более 5mb");
export const multipleFilesSchema = z.custom<FileList>().optional();

//for form
export const formSchema = z.object({
  name: requiredString,
  email: requiredString.email({ message: "Некорректный email" }),
  tel: requiredString.refine(
    (value) => {
      const phoneDigits = value.replace(/\D/g, "");
      return phoneDigits.length === 11;
    },
    { message: "Номер телефона должен содержать 11 цифр" },
  ),
  projectDescription: requiredString,
  projectDescriptionFile: fileSchema,
  mailing: z.boolean(),
  permission: z.literal(true, {
    errorMap: () => ({
      message:
        "Подтвердите согласие с условиями и политикой конфиденциальности",
    }),
  }),
});
