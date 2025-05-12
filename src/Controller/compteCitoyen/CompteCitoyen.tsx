"use client";
import * as React from "react";

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";
import Navbar from "@/app/components/navbarView";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import { useTranslations } from "next-intl";
import { Deconnexion } from "../paramCompte/deconnexion";

export default function CompteControllerAdmin() {
  const t = useTranslations("compteAdmin");
  const [firstname, setFirstame] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const email = await emailUserByToken();
      console.log("email by param : ");

      const resInfos = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/user/infosByEmail?email=${email}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const infos = await resInfos.json();
      const prenom = infos[0].uti_firstname;

      setFirstame(prenom);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <h1>
        {t("Bonjour")} {firstname}
      </h1>
      <h3>{t("mesInformations")}</h3>
      <Link href={"../paramCompte"}>{t("parametres")}</Link>
      <button onClick={Deconnexion}>{t("deconnexion")}</button>
    </div>
  );
}
