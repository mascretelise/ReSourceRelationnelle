"use client";
import * as React from "react";
//import from 'cookies-next';
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Link from "next/link";
import Navbar from "@/app/components/navbarView";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import{ Deconnexion} from "../paramCompte/deconnexion";


export default function CompteControllerSuperAdmin() {

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
      <div>
        <h1 className="text-4xl justify-self-center content-start">Bonjour {firstname}</h1>
        <p className="justify-self-center">Compte Super Administrateur</p>
      </div>
      <div className="flex items-center gap-x-8 justify-self-center mt-6">
        <div className="border border-black w-80 h-14 rounded-lg text-center "><h3><Link href="/paramCompte">Mes Informations</Link></h3></div>
        <div className="border border-black w-80"><h3><Link href="/editStatut">Gérer et créer des comptes</Link></h3></div>
        <div className="border border-black w-64">
            <button>Deconnexion</button>
            
        </div>
      </div>
    </div>
  );
}
