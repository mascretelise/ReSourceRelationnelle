"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { emailUserByToken } from "@/Controller/componentsConnexion/isLogged";

export default function Navbar() {
  const t = useTranslations("navbar");
  const [authentificated, setAuthentificated] = useState(false);
  const [name, setName] = useState("");

 /* useEffect(() => {
    const isAuthentificated = async () => {
      try {
        const email = await emailUserByToken();
        if (!email) return;

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

        if (!resInfos.ok) return;

        const infos = await resInfos.json();
        const prenom = infos[0]?.uti_firstname;

        if (prenom) {
          setName(prenom);
          setAuthentificated(true);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification :",
          error
        );
      }
    };

    isAuthentificated();
  }, []);*/

  return (
    <>
      <div className="w-1440px h-114px bg-cyan-100 border border-black flex items-center justify-between">
        <div className="">
          <Link href="/">
            <Image
              src={"/img/logo.png"}
              width={150}
              height={150}
              alt="logo de l'entreprise"
            />
          </Link>
        </div>
        <div className="border rounded-md bg-white border-black">
          <input type="Rechercher ..." className="border rounded-md w-52" />
        </div>
        <div className="gap-x-10 flex flex-row mr-8">
          <div>
            <p>Référentiel de ressources</p>
          </div>
          <div>
            <p>{t("parametres")}</p>
          </div>
          <div className="mr-6">
            <Link href="/compte">{t("monCompte")}</Link>
          </div>
          <div>
            
              <Link href="/connexionView">{t("login/register")}</Link>
          </div>
        </div>
      </div>
    </>
  );
}
/*{authentificated ? (
              <span>Bonjour {name} !</span>
            ) : (
              <Link href="/connexionView">{t("login/register")}</Link>
            )}*/