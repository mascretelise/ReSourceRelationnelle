"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/navbarView";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import { useTranslations } from "next-intl";
import UploadIconeProfil from "./uploadIconeProfil";
import { Deconnexion } from "../paramCompte/deconnexion";
import Image from "next/image";
import ControllerParametres from "./uploadIconeProfil";
import ActionsCategorie from "../paramCompte/actionsCategories";
import UploadIcone from "./uploadIconeProfil";

export default function DashboardAdmin() {
  const t = useTranslations("compteAdmin");
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
        const encodedUrl = encodeURIComponent(urlIcone);

        setUrlIcone(urlIcone);
        setFirstame(prenom);
      };
      fetchData();
    }, []);
  } catch (error) {
    console.error("Erreur pendant l'upload :", error);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center">
      <div className="text-4xl sm:text-5xl pb-8">
        {t("Bonjour")} {firstname}
      </div>

      <div className="mb-6">
        <Image
          alt="icone"
          width={96}
          height={96}
          src={urlIcone}
          className="inline-block rounded-full w-24 h-24 ring-2 ring-white object-cover"
        />
      </div>

      <p className="mt-3 pb-8 text-sm sm:text-base">{t("compteAdmin")}</p>

      <div className="mt-6 px-4 py-2 bg-[#78C8CC] text-white rounded-lg hover:bg-[#399E8C] flex items-center justify-center gap-x-3">
        {<UploadIcone />}
      </div>
    </div>
  );
}
