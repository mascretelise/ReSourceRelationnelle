
import { NextResponse, type NextRequest } from 'next/server'

export async function Deconnexion(){
    const deco = await fetch (`http://localhost:3000/api/user/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!deco){
        alert('pas déco')
      }
      alert('deco')
      window.location.href = '/';
    
}