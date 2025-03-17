"use client";
import * as React from "react";
//import from 'cookies-next';
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import {useCookies } from 'react-cookie';


export default function CompteController() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
 useEffect(() => {}, [cookies])
    const router = useRouter()
    const setCookieHandler = () => {
      removeCookie('user')
      setCookie("user", false);
      router.replace("/");
    }

  return (
    <div>
        <h1>MON COMPTE</h1> 
        <button onClick={setCookieHandler}>Se déconnecter</button>   
    </div>
  );
}
