"use client";
import * as React from "react";
//import from 'cookies-next';
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";
import Navbar from "@/app/components/navbarView";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import { Deconnexion } from "../paramCompte/deconnexion";
import Image from "next/image";
import UploadIcone from "../compteAdmin/uploadIconeProfil";

export default function DashboardSuperAdmin() {
   const [firstname, setFirstame] = useState("");
   const [urlIcone, setUrlIcone] = useState("");
   const [activePage, setActivePage] = useState("dashboard");
 try {
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
       const urlIcone = `https://resourcesrelationnelles.s3.eu-west-3.amazonaws.com/iconesProfil/${nomFichier}`;
 
       const infos = await resInfos.json();
       const prenom = infos[0].uti_firstname;
       setUrlIcone(urlIcone);
       setFirstame(prenom);
     };
     fetchData();
   }, []);
 } catch (error) {
       console.error("Erreur pendant l'upload :", error);
 }
  return (
    <div>
      <div>
        <h1 className="text-4xl justify-self-center content-start mb-6">
          Bonjour {firstname}
        </h1>
        <div className="justify-self-center">
                  <Image
                    alt="icone"
                    width={96}
                    height={96}
                    src={urlIcone}
                    className="inline-block rounded-full w-24 h-24 ring-2 ring-white object-cover"
                  />
                </div>
                <p className="justify-self-center">Compte Super Administrateur</p>
        
                <div>
                  <div className="mt-6 px-4 py-2 bg-[#78C8CC] text-white rounded-lg hover:bg-[#399E8C] flex flex-row gap-x-3 justify-self-center">
                    {<UploadIcone />}
                  </div>
                </div>
      </div>
    </div>
  );
}
