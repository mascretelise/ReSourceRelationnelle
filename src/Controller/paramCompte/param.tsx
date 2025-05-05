"use client";
// import * as React from "react";
import { useEffect, useState } from "react";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import Navbar from "@/app/components/navbarView";
import ModifInfos from "./formModifInfos";
import {useTranslations} from 'next-intl';

export default function ControllerParametres() {
  const t = useTranslations('paramCompte');
  const [name, setName] = useState("");
  const [firstname, setFirstame] = useState("");
  const [email, setEmail] = useState("");
  const [form, setForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        const emailUser = infos[0].uti_email;
        const nom = infos[0].uti_name;
        setName(nom);
        setFirstame(prenom);
        setEmail(emailUser);
      } catch (err) {
        console.error("Erreur lors de la récupération du statut :", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 justify-items-stretch">
      <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md p-6 text-center">
        <p className="mt-4 text-xl font-bold">{t('nom')} : {name} </p>
        <p className="mt-4 text-xl font-bold">{t('prenom')} : {firstname} </p>

        <p className="text-gray-500 text-sm mb-4 mt-4">{t('email')} : {email}</p>
        <button onClick={() => setForm(!form)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        {t('btnModifInfos')}
        </button>
        {form && <ModifInfos />}
      </div>
    </div>
  );
}

//Au click du lien "modifier mon ... ", faire apparaitre un input permettant de modifier l'information
//Link ? Button ?
