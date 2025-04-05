"use client";
import * as React from "react";
//import from 'cookies-next';
import { redirect, useRouter } from 'next/navigation'
import { useEffect } from "react";
import {useCookies } from 'react-cookie';



export default function CompteControllerCitoyen() {

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
        <h1>MON COMPTE</h1> 
        <button onClick={setCookieHandler}>Se déconnecter</button>   
    </div>
  );
}
