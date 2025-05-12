"use client";
// import * as React from "react";
import { useEffect, useState } from "react";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import Navbar from "@/app/components/navbarView";
import ModifInfos from "./formModifInfos";
import { useTranslations } from "next-intl";

export default function ControllerParametres() {
  const t = useTranslations("paramCompte");
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
    <div className="min-h-screen bg-gray-100 pt-12 pb-12 flex flex-col items-center justify-center">


  <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-6 text-gray-700 mt-0">
    {t("Mes informations personnelles")}
  </h1>

  <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md p-6">

    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-4">
      Administrateur
    </span>


    <p className="mt-4 text-lg sm:text-xl font-bold">
      {t("nom")} : {name}
    </p>
    <p className="mt-4 text-lg sm:text-xl font-bold">
      {t("prenom")} : {firstname}
    </p>

    <p className="text-gray-500 text-sm sm:text-base mb-4 mt-4">
      {t("email")} : {email}
    </p>

    <button
      onClick={() => setForm(!form)}
      className="mt-4 px-4 py-2 bg-[#78C8CC] text-white rounded-lg hover:bg-[#399E8C] flex items-center justify-center gap-x-3 w-full"
    >
      {t("btnModifInfos")}
      <img
        className="w-5 h-5"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABSUlEQVR4nO2ZvUoDQRR
        GT6ONVmKhnRbiCwhW+gD6BoqNo4V5k1QWprBNYS2CvVj5APoG/nRioUlAMSMTvoUQxsI03gv3wMLuzBb38N2dXWYhCP7KJnAFvAF94A7YxxmHwBeQK8c5TjgGhir6DF
        gBFoAT4EPjeziSaFfmW5orbeZCIgMvwPrEPYua6+FEIv8is6rxVxxJ5IpMR2OXOJPIYzJtnX8CGziUyGPHUEuzGRLwPYVEC0OEhBUiCStEElaIJKwQSVghkrBCJGGFF
        J/iRkiRhBFSJGGEFEkYIUUSRkiRhBGOptyLLXu4ZpgHBt4lCrveN5QbTlXgBfDsMYmGBxW5BawBT96SKCypwPLrd3Y0UpcxLVE4UKHXoyuYAbbVZi7aqaGrYm8k8z6Rx
        EAvSfM8Vp6Fey0AO8AcTrjVStVVmy3/d0EBjvkBUA0ZY3SLwb4AAAAASUVORK5CYII="
        alt="edit--v1"
      />
    </button>
    {form && <ModifInfos />}
  </div>
</div>

  );
}

