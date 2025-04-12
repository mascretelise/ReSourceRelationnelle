'use client';

import { useEffect, useState } from 'react';
import CompteCitoyen from '../compteCitoyen/page'
import CompteAdmin from '../compteAdmin/page'
import {emailUserByToken} from '@/Controller/componentsConnexion/isLogged'

export default function IsLoggedIn() {
  const [statut, setStatut] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await emailUserByToken()
        console.log("email", email)
        const resInfos = await fetch(`http://localhost:3000/api/user/infosByEmail?email=${email}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const infos = await resInfos.json();
        console.log("infos : ", infos)
        console.log("statut : ", infos[0].uti_statut)
        setStatut(infos[0]?.uti_statut);
        
        
      } catch (err) {
        console.error("Erreur lors de la récupération du statut :", err);
      } 
    };
    fetchData();
  }, []);
  if(statut == 2){
    console.log("admin")
    return <CompteAdmin />
  }else if (statut == 1) {
   return <CompteCitoyen />
  }
}
