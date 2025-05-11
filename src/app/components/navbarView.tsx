import React from "react";
import Image from "next/image";
import Link from "next/link";
import {useTranslations} from 'next-intl';

export default function Navbar() {
const t = useTranslations('navbar');


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
          <p>{t('parametres')}</p>
        </div>
        <div className="mr-8">
          <Link href="/compte">{t('monCompte')}</Link>
        </div>
        <div>
          <Link href="/connexionView">{t('login/register')}</Link>
        </div>
      </div>
    </>
  );
}