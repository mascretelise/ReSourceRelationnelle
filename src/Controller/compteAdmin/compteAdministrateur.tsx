"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/navbarView";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import {useTranslations} from 'next-intl';
import UploadIconeProfil from "./uploadIconeProfil";

export default function CompteControllerAdmin() {
  const t = useTranslations('compteAdmin');
  const [firstname, setFirstame] = useState("");
  const [urlIcone, setUrlIcone] = useState("");
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

      const getUrl = await fetch(
        `http://localhost:3000/api/urlIconeByEmail?email=${email}`,
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
      console.log("Nom du fichier icone : ", nomFichier);
      const urlIcone = `https://resourcesrelationnelles.s3.eu-west-3.amazonaws.com/iconesProfil/${nomFichier}`;
      //const url = `https://${Bucket}.s3.amazonaws.com/${Key}`;
      
      console.log("get url : ", urlIconeProfil)
      console.log("url icone", urlIcone)
      const infos = await resInfos.json();
      const prenom = infos[0].uti_firstname;
      setUrlIcone(urlIcone)

      setFirstame(prenom);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-4xl justify-self-center content-start">{t('Bonjour')} {firstname}</h1>
        <div className="justify-self-center">
          <img
              alt="icone"
              src={urlIcone}
              width='auto' height='auto'
              className="inline-block  rounded-full w-24 h-24 ring-2 ring-white"
            />
        </div>
        <p className="justify-self-center">{t('compteAdmin')}</p>
      </div>
      <div>
        <div className="border border-black w-64 rounded-md">{<UploadIconeProfil />}</div>
        <div className="border border-black"><h3><Link href="/paramCompte">{t('MesInformations')}</Link></h3></div>
        <div className="border border-black"><button>{t('deconnexion')}</button></div>
      </div>
    </div>
  );
}
//<Link href="/uploadIconeProfil">{t('Changer sa photo de profil')}</Link>