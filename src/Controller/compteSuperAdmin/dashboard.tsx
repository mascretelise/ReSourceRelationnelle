"use client";
import * as React from "react";

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";
import Navbar from "@/app/components/navbarView";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import { useTranslations } from "next-intl";
import Image from "next/image";
import UploadIcone from "../compteAdmin/uploadIconeProfil";

export default function DashboardSuperAdmin() {
  const t = useTranslations("compteSuperAdmin");
  const [firstname, setFirstame] = useState("");
  const [urlIcone, setUrlIcone] = useState("");
  const [activePage, setActivePage] = useState("dashboard");
  try {
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

        const getUrl = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/api/urlIconeByEmail?email=${email}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const urlIconeProfil = await getUrl.json();
        const nomFichier = urlIconeProfil[0].uti_iconeProfil;
        const urlIcone = `https://resourcesrelationnelles.s3.eu-west-3.amazonaws.com/iconesProfil/${nomFichier}`;

        const infos = await resInfos.json();
        const prenom = infos[0].uti_firstname;
        setUrlIcone(urlIcone);
        setFirstame(prenom);
      };
      fetchData();
    }, []);
  } catch (error) {
    console.error("Erreur pendant l'upload :", error);
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
  <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold mb-4 text-center">
    {t("Bonjour")} {firstname}
  </h1>

  <Image
    alt="icone"
    width={96}
    height={96}
    src={urlIcone}
    className="rounded-full w-24 h-24 ring-2 ring-white object-cover mb-3"
  />

  <p className="text-sm md:text-base text-gray-700 mb-6">{t("compteSuperAdmin")}</p>

  <button className="px-4 py-2 bg-[#78C8CC] text-white rounded-lg hover:bg-[#399E8C] flex items-center gap-2">
    <UploadIcone />
    <span className="hidden md:inline">{t("uploadIcone")}</span>
  </button>
</div>

  );
}
