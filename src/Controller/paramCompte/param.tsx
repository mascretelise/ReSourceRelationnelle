

import * as React from "react";
import { jwtDecode } from "jwt-decode";
import { cookies } from 'next/headers';
import {getEmailByToken} from './verifToken'


export default async function ControllerParametres() {
        const param = getEmailByToken
        
        const infos = await fetch(`http://localhost:3000/api/user/infosByEmail?param=${param}`, {
            method: "GET",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
        }
        })
        const informations = await infos.json()
        console.log(informations)
        const prenom = informations[0].uti_firstname
        const email = informations[0].uti_email
        const nom = informations[0].uti_name
        function handleClick() {
            console.log("increment like count")
          }
    

    return(
        <div>
            <h1>
                Bonjour {<p>{prenom}</p>}
            </h1>
            <p>Nom : {nom}</p>
            <p>Prénom : {prenom}</p>
            <button onClick={handleClick}>Modifier mon prénom</button>
            <p>Votre email : {email}</p>
            <p>Mdp : </p>
        </div>
    )
}

//Au click du lien "modifier mon ... ", faire apparaitre un input permettant de modifier l'information
//Link ? Button ? 