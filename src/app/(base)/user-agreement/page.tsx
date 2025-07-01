import { api } from "@/common/api";
import s from "../privacy-policy/docs.module.scss";
import { clsx } from "clsx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  description: "Пользовательское соглашение",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function UserAgreement() {
  const response = await api.getUserAgreement();

  if (!response) return null;

  return (
    <div className={clsx("mainContainer", s.docPage)}>
      <h1> {response.title} </h1>
      <div className={s.fileContainer}>
        <a href={response.pdf_file} target="_blank" className={s.file}>
          Смотреть документ
        </a>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: response.content }}
        className={s.content}
      ></div>
    </div>
  );
}
