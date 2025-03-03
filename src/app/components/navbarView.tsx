import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="w-1440px h-114px bg-cyan-100 border border-black flex items-center justify-between">
        <div>
          <Image
            src={"/img/logo.png"}
            width={150}
            height={150}
            alt="logo de l'entreprise"
          />
        </div>
        <div className=" border rounded-md">
          <input type="Rechercher ..." className="border rounded-md w-52" />
        </div>
        <div>
          <p>Référentiel de ressources</p>
        </div>
        <div>
          <p>Paramètres</p>
        </div>
        <div className="mr-8">
          <p>Mon compte</p>
        </div>
        <div>
          <Link href="/inscriptionView">Créer un compte</Link>
        </div>
      </div>
    </>
  );
}
