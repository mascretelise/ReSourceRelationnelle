"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import Navbar from "@/app/components/navbarView";
import { useTranslations } from "next-intl";
import { Deconnexion } from "../paramCompte/deconnexion";
import DashboardSuperAdmin from "./dashboard";
import EditStatut from "../editStatut/modifStatut";
import ControllerParametresSuperAdmin from "./paramSuperAdmin";

export default function CompteControllerAdmin() {
  const t = useTranslations("compteSuperAdmin");
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardSuperAdmin />;
      case "informations":
        return <ControllerParametresSuperAdmin />;
      case "categories":
        return <EditStatut />;

      default:
        return <div>Sélectionnez une page</div>;
    }
  };

  return (
        <div>
          <Navbar />
    
          {/* Top bar avec menu burger (mobile) */}
          <div className="flex items-center justify-between bg-white p-4 shadow-lg lg:hidden">
            <h1 className="text-lg font-bold text-gray-800">{t("tableauBordSuperAdmin")}</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {sidebarOpen ? (
                  // Icône de fermeture (X)
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Icône burger
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
    
          <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
              className={`
                bg-white shadow-lg p-4 w-full lg:w-64 
                ${sidebarOpen ? "block" : "hidden"} 
                lg:block
              `}
            >
              <h2 className="text-xs lg:text-xl font-bold mb-6 text-gray-800 text-center lg:text-left">
                {t("tableauBordSuperAdmin")}
              </h2>
    
              <nav className="flex flex-col gap-2 lg:gap-4">
                <button
                  onClick={() => { setActivePage("dashboard"); setSidebarOpen(false); }}
                  className={`px-4 py-2 rounded-lg transition text-sm lg:text-base ${
                    activePage === "dashboard"
                      ? "bg-[#78C8CC] text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {t("tableauBord")}
                </button>
    
                <button
                  onClick={() => { setActivePage("informations"); setSidebarOpen(false); }}
                  className={`px-4 py-2 rounded-lg transition text-sm lg:text-base ${
                    activePage === "informations"
                      ? "bg-[#78C8CC] text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {t("mesInformations")}
                </button>
    
                <button
                  onClick={() => { setActivePage("categories"); setSidebarOpen(false); }}
                  className={`px-4 py-2 rounded-lg transition text-sm lg:text-base ${
                    activePage === "categories"
                      ? "bg-[#78C8CC] text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {t("gestionComptes")}
                </button>
    
                <button
                  onClick={() => { Deconnexion(); setSidebarOpen(false); }}
                  className="px-4 py-2 rounded-lg transition text-sm lg:text-base bg-gray-200 hover:bg-gray-300 flex items-center gap-2"
                >
                  {t("deconnexion")}
                  <img
                    className="w-4 h-4 lg:w-5 lg:h-5"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ix..."
                    alt="logout"
                  />
                </button>
              </nav>
            </aside>
    
            {/* Main content */}
            <main className="flex-1 p-4 lg:p-8">
              <div className="mt-4 lg:mt-8">{renderContent()}</div>
            </main>
          </div>
        </div>
      );
    }
    
