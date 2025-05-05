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

export default function CompteControllerAdmin() {
  const t = useTranslations("compteAdmin");
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardAdmin />;
      case "informations":
        return <ControllerParametres />;
      case "categories":
        return <ActionsCategorie />;

        default:
        return <div>Sélectionnez une page</div>;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Tableau de bord Administrateur</h2>
        <nav className="flex flex-col gap-4">
        <button onClick={() => setActivePage("dashboard")}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activePage === "dashboard" ? "bg-[#78C8CC] " : "bg-gray-200 hover:bg-gray-300"
            }`}>
            Tableau de bord
          </button>
          <button onClick={() => setActivePage("informations")}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activePage === "informations" ? "bg-[#78C8CC] "  : "bg-gray-200 hover:bg-gray-300"
            }`}>
            Mes Informations
          </button>
          
          <button onClick={() => setActivePage("categories")}
            className={`w-full text-left px-4 py-2 rounded-lg transition ${
              activePage === "categories" ? "bg-[#78C8CC] " : "bg-gray-200 hover:bg-gray-300"
            }`}>
            Gestion des catégories des ressources
          </button>
          <button onClick={Deconnexion} className={`w-full text-left px-4 py-2 rounded-lg transition flex flex-row gap-x-4 items-center ${
              activePage === "categories" ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
            }`}>
            Se déconnecter
            <img className="w-5 h-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC8klEQVR4nO2a229
            MURTGf41OR+La1rTjgfBGSBH/g0tVUF6KN0GfqqbvLiESFR4IfwhR8YKSqKq6jaAtIm5BxCOVkYzs5DvJykToOT2XOZN+yXlopnvt9e21116XvWEGtYsFQCdwCrgKj
            ANfgEngF/AdeKHfzgDbgEaqBBlgD3BdypZ9fr81di+QTYKAm7QP+GCUKgE3gOPATmAF0KL/zWj1VwLbgSPATVnLG/8RKACz4yLRrm3jKfAU2Ac0BZC1ENgPPDDyXgGbi
            RBuZS+ZCYvAJqAuJPlO1iMj/2IU1lkMjGiCn0AvUB/2JMAs4BDwQ3O5OVvDEr4UmDBmX0f0aAPGNKebe3kYlnhrVqeZ+NAM3DNkWqfjE0MSNKQ4ETfmGDIjQX3mnAQ4i
            +RIDs1mm7kDwDdOKzKvIXm0mQPAnW6pRq/xl9iCZhSoBx6LjCOVarSLyKegVnE5011gkGRRB4yKzO4gJIoaPEzyOChdrgUlUdTfSaNRJUNpqrEtp8y2rIIoT/VgUHptT
            aMlLI5Jt35SagkPO6TfZVJqCQ+rpONLUmoJD4uk51f+AltuRvXdIRxkJW8yKSK34yCSq9harqiqVuT+tbVqxtnTZJnO/x2/NRUQ02CZQenVMdUB1WiZJpM0zvcz0JK5T
            /Loli4DQQa3KM64tlDShdVDEekixegQifdJXUOE1Xx4IiI9pBgFkRjza41qatCt1S2AI7LB7+CzpmWa5LGbM7cB54MIyKoFVFYj2d0uxY256tx4HZzADu6KqzcSNBrzt
            ULOkBgPY1csMd3w18B64vGJCUNiWViC84rq3tVbn25qozhiC8axh6Pwzwbggqn2nun2NYzLUCdji4kTnmNHGvQ2qqCxhA6oIRAkAew2aUdZW8n3ETsd6xwG3lW8YrgFn
            AB26XFAXl3zBh0Uq1UUHVUqbl9LuLSjJ6nUI6PkbaDiFcNUv5LepnRVU+40Tx3Ak8AVbb/Pcly38t+A5ypP+9W39VVPzIAU4Q+qrDvJW9hbZwAAAABJRU5ErkJggg=="
             alt="logout-rounded-left"></img>
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
      
        <div className="mt-8">
          {renderContent()}
        </div>
      </main>
    </div>
    </div>
  );
}
//<Link href="/uploadIconeProfil">{t('Changer sa photo de profil')}</Link>
