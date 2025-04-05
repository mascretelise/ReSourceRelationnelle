"use client";
import * as React from "react";
import type { NextRequest } from 'next/server'




export default async function isLoggedIn(request:NextRequest) {

    const cookie = request.cookies.get("token")?.value;
    const isLogged = cookie && cookie !== "false" && cookie!= null && cookie!= undefined
    if(isLogged){
    const param = cookie
    console.log(cookie)
    const statutUser =  await fetch(`http://localhost:3000/api/getStatut?param=${param}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })   
  
    let statut = await statutUser.json()
    statut = Object.values(statut)
    console.log("statut user : ", statut)
    return statut
    }

}
