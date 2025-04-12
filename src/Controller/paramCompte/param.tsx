'use client';
// import * as React from "react";
import { useEffect, useState } from "react";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import Navbar from "@/app/components/navbarView";
import ModifInfos from "./formModifInfos";


export default function ControllerParametres() {
  const [name, setName] = useState("");
  const [firstname, setFirstame] = useState("");
  const [email, setEmail] = useState("");
  const [form, setForm] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await emailUserByToken();
        console.log("email by param : ", email)
        
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
        const prenom = infos[0].uti_firstname
        const emailUser = infos[0].uti_email
        const nom = infos[0].uti_name;
        setName(nom);
        setFirstame(prenom)
        setEmail(emailUser)
      } catch (err) {
        console.error("Erreur lors de la récupération du statut :", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
          <Navbar />
      </div>
      <div>
        <p>Nom : {firstname}</p>
      <p>Prénom : {name}</p>

      <p>Email : {email}</p>
      <button onClick={() => setForm(!form)} className="bg-amber-600">Modifier mes informations</button>
      {form && ( <ModifInfos />)}
      </div>
      
    </div>
  );
}

//Au click du lien "modifier mon ... ", faire apparaitre un input permettant de modifier l'information
//Link ? Button ?
