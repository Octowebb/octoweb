import { ReactNode } from "react";
import { Header } from "@/components/layouts/header/header";
import { FooterWithForm } from "@/components/layouts/footerWithForm/footerWithForm";
import { api } from "@/common/api";

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const contactInfo = await api.getContacts();
  const socials = contactInfo?.social_links;

  return (
    <>
      <Header socials={socials || []} />
      <main className="main">
        <div className="main-content">{children}</div>
        <div className={"overlay"}></div>
      </main>
      <FooterWithForm socials={socials || []} />
    </>
  );
}
