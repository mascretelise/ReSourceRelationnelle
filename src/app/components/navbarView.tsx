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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isAuthentificated = async () => {
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/api/user/verifyToken`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("result verify token ", result);
        if (!result.ok) {
          console.log("Token invalide ou absent");
          setAuthentificated(false);
          return;
        }
        const resJson = await result.json();
        if (!resJson.valid) {
          console.log("Token non valide");
          setAuthentificated(false);
          return;
        }
        const email = await emailUserByToken();
        if (!email) {
          console.log("pas d'email");
        }

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
  }, []);

  return (
    <>
      {/* Navbar Desktop */}
      <div className="hidden md:flex w-full h-20 bg-cyan-100 border border-black items-center justify-between px-4">
        <div>
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
          <input
            placeholder="Rechercher ..."
            className="border rounded-md w-52 px-2 py-1"
          />
        </div>
        <div className="gap-x-10 flex flex-row mr-8 items-center">
          <p>{t("referentielRessources")}</p>
          <Link href="/compte">{t("monCompte")}</Link>
          {authentificated ? (
            <span>Bonjour {name} !</span>
          ) : (
            <Link href="/connexionView">{t("login/register")}</Link>
          )}
        </div>
      </div>
      {/* Menu burger (mobile) */}
      <div className="md:hidden flex items-center bg-cyan-100">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          {/* Icone burger / croix */}
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
      {/* Mobile menu (items apparaissent quand isOpen = true) */}
      {isOpen && (
        <div className="md:hidden shadow-lg bg-gray-10">
          <input type="Rechercher ..." className="border rounded-md w-52 bg-white" />
          <Link
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            href="/compte"
          >
            {t("monCompte")}
          </Link>
          <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            {authentificated ? (
              <span>Bonjour {name} !</span>
            ) : (
              <Link href="/connexionView">{t("login/register")}</Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
