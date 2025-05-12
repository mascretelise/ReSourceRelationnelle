import { NextResponse, type NextRequest } from "next/server";

export async function Deconnexion() {
  const deco = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}/api/user/logout`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!deco) {
    alert("pas déco");
  }
  window.location.href = "/";
}
