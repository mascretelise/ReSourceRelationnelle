"use client";

import * as React from "react";
import CompteControllerAdmin from "@/Controller/compteAdmin/compteAdministrateur";
import CompteControllerCitoyen from "@/Controller/compteCitoyen/CompteCitoyen";
import {getEmailByToken} from '@/Controller/paramCompte/verifToken'


export default async function isLoggedIn() {

    const email = getEmailByToken;
    const infos = await fetch(`http://localhost:3000/api/user/infosByEmail?param=${email}`, {
      method: "GET",
      credentials: "include",
      headers: {
      "Content-Type": "application/json",
  }
  })
  const informations = await infos.json()
    console.log("param local storage : ", email)
    if(informations[0].uti_statut == "2"){
      console.log('admin')
      //return <CompteControllerAdmin />
    } else if (informations[0].uti_statut == "1"){
      console.log("user")
      //return <CompteControllerCitoyen />
    }
}
