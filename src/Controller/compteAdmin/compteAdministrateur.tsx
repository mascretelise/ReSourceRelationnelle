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
import ControllerParametres from "../paramCompte/param";
import ActionsCategorie from "../paramCompte/actionsCategories";
import DashboardAdmin from "./dashboard";
import SuspendAccount from "./suspendreCompte";

export default function CompteControllerAdmin() {
  const t = useTranslations("compteAdmin");
  const [activePage, setActivePage] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardAdmin />;
      case "informations":
        return <ControllerParametres />;
      case "categories":
        return <ActionsCategorie />;
      case "suspendreComptes":
        return <SuspendAccount />

        default:
        return <div>{t("selectionnerPage")}</div>;
    }
  };

  return (
    <div>
  <Navbar />
  <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

    <aside className="hidden md:block w-64 bg-white shadow-lg p-4">
      <h2 className="lg:text-xl text-sm font-bold mb-6 text-gray-800">Tableau de bord Administrateur</h2>
      <nav className="flex flex-col gap-4">
        <button onClick={() => setActivePage("dashboard")}
          className={`w-full text-left px-4 py-2 rounded-lg transition ${
            activePage === "dashboard" ? "bg-[#78C8CC]" : "bg-gray-200 hover:bg-gray-300"
          }`}>
          {t("tableauBord")}
        </button>
        <button onClick={() => setActivePage("informations")}
          className={`w-full text-left px-4 py-2 rounded-lg transition ${
            activePage === "informations" ? "bg-[#78C8CC]" : "bg-gray-200 hover:bg-gray-300"
          }`}>
          {t("mesInformations")}
        </button>
        <button onClick={() => setActivePage("categories")}
          className={`w-full text-left px-4 py-2 rounded-lg transition ${
            activePage === "categories" ? "bg-[#78C8CC]" : "bg-gray-200 hover:bg-gray-300"
          }`}>
          {t("gestionCategories")}
        </button>
        <button onClick={() => setActivePage("suspendreComptes")}
          className={`w-full text-left px-4 py-2 rounded-lg transition ${
            activePage === "suspendreComptes" ? "bg-[#78C8CC]" : "bg-gray-200 hover:bg-gray-300"
          }`}>
          Gérer la suspension des comptes
        </button>
        <button onClick={Deconnexion}
          className={`w-full text-left px-4 py-2 rounded-lg transition flex flex-row gap-x-4 items-center ${
            activePage === "categories" ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
          }`}>
          <img className="w-5 h-5" src="data:image/png;base64,...ton image..." alt="logout-rounded-left" />
          {t("deconnexion")}
        </button>
      </nav>
    </aside>

    {/* Menu Burger (mobile) */}
    <div className="md:hidden flex justify-between items-center bg-white shadow p-4">
      <h2 className="text-lg font-bold text-gray-800">Tableau de bord</h2>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-700">
        {isMenuOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>
    </div>

    {isMenuOpen && (
      <aside className="md:hidden w-full bg-white shadow-lg p-4">
        <nav className="flex flex-col gap-4">
          {/* mêmes boutons que sidebar */}
          <button onClick={() => { setActivePage("dashboard"); setIsMenuOpen(false); }}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activePage === "dashboard" ? "bg-[#78C8CC]" : "bg-gray-200 hover:bg-gray-300"
            }`}>
            {t("tableauBord")}
          </button>
          <button onClick={() => { setActivePage("informations"); setIsMenuOpen(false); }}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activePage === "informations" ? "bg-[#78C8CC]" : "bg-gray-200 hover:bg-gray-300"
            }`}>
            {t("mesInformations")}
          </button>
          <button onClick={() => { setActivePage("categories"); setIsMenuOpen(false); }}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activePage === "categories" ? "bg-[#78C8CC]" : "bg-gray-200 hover:bg-gray-300"
            }`}>
            {t("gestionCategories")}
          </button>
          <button onClick={() => { setActivePage("suspendreComptes"); setIsMenuOpen(false); }}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activePage === "suspendreComptes" ? "bg-[#78C8CC]" : "bg-gray-200 hover:bg-gray-300"
            }`}>
            Gérer la suspension des comptes
          </button>
          <button onClick={() => { Deconnexion(); setIsMenuOpen(false); }}
            className={`w-full text-left px-4 py-2 rounded-lg transition flex flex-row gap-x-4 items-center ${
              activePage === "categories" ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
            }`}>
            <img className="w-5 h-5" src="data:image/png;base64,...ton image..." alt="logout-rounded-left" />
            {t("deconnexion")}
          </button>
        </nav>
      </aside>
    )}

    {/* Main content */}
    <main className="flex-1 p-4 md:p-8">
      <div className="mt-4 md:mt-8">
        {renderContent()}
      </div>
    </main>

  </div>
</div>

  );
}
