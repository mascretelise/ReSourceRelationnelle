"use client";
import * as React from "react";
//import from 'cookies-next';
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";
import Navbar from "@/app/components/navbarView";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import {useTranslations} from 'next-intl';

export default function CompteControllerAdmin() {
  const t = useTranslations('compteAdmin');
  const [firstname, setFirstame] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const email = await emailUserByToken();
      console.log("email by param : ");

      const resInfos = await fetch(
        `http://localhost:3000/api/user/infosByEmail?email=${email}`,
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
      <h1>{t('Bonjour')} {firstname}</h1>
      <p>{t('compteAdmin')}</p>
      <h3>{t('mesInformations')}</h3>
      <Link href={"../paramCompte"}>{t('parametres')}</Link>
      <button>{t('deconnexion')}</button>
    </div>
  );
}
