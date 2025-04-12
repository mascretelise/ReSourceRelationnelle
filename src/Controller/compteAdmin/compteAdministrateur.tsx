"use client";
import * as React from "react";
//import from 'cookies-next';
import { redirect, useRouter } from 'next/navigation'
import { useEffect } from "react";
import {useCookies } from 'react-cookie';
import Link from "next/link";
import Navbar from "@/app/components/navbarView";



export default function CompteControllerAdmin() {

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
 useEffect(() => {}, [cookies])
    const router = useRouter()
    const setCookieHandler = () => {
      removeCookie('token', {path: '/'})
      //setCookie("user", false);
      router.replace('/')
    }
  return (
    <div>
      <Navbar />
        <h1>MON COMPTE Admin</h1> 
        <h3>Mes informations</h3>
        <Link href={"../paramCompte"}>Paramètres</Link>
        <button onClick={setCookieHandler}>Se déconnecter</button>   
    </div>
  );
}
