"use client";

import { useEffect, useRef } from "react";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import { useTranslations } from "next-intl";

export default function UploadIcone() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("compteAdmin");
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const formData = new FormData();
        for (const file of e.target.files) {
          const randomUuid = crypto.randomUUID();
          const originalName = file.name;
          const extension = originalName.split(".").pop();
          const nameWithExtension = `${randomUuid}.${extension}`;
          const nameFile = new File([file], nameWithExtension, {
            type: file.type,
          });

          formData.append("file", nameFile);
          const url: string = nameFile.name;
          const email = await emailUserByToken();

          await fetch(`${process.env.NEXT_PUBLIC_URL_API}/api/urlIconeProfil`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, email }),
          });
        }

        await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/api//user/iconeProfil`,
          {
            method: "POST",
            body: formData,
          }
        );

        alert("Photo de profil uploadée !");
      } catch (error) {
        console.log("error catch : ", error);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        name="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className="text-left px- py-1 rounded-lg"
      >
        {t("uploadIcone")}
      </button>
    </div>
  );
}
