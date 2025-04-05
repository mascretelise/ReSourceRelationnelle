"use client";
import * as React from "react";
//import from 'cookies-next';
import { redirect, useRouter } from 'next/navigation'
import { useEffect } from "react";
import {useCookies } from 'react-cookie';



export default function CompteController() {

    const infos = async () => {

        const data = await fetch ("http://localhost:3000/api/user/infosByEmail", {
            method: "GET", 
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
              },
        })
        const result = await data.json()
        return result

    }
}
