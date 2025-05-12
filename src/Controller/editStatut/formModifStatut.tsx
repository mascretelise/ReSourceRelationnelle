"use client";

import { useEffect, useState } from "react";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useTranslations } from "next-intl";

const statutToNumber: Record<string, number> = {
  Citoyen: 1,
  Admin: 2,
  "Super Administrateur": 3,
  Modérateur: 4,
};

const schemaZod = z.object({
  statut: z.string().min(1, "Le changement de statut est obligatoire"),
});

type ModifStatutProps = {
  uti_uuid: string;
  onClose: () => void;
};

type FormData = z.infer<typeof schemaZod>;

export default function ModifStatut({ uti_uuid, onClose }: ModifStatutProps) {
  const t = useTranslations("editStatut");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaZod),
    defaultValues: {
      statut: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    console.log("Données envoyées (texte) :", data);

    const valeurEnvoyee = statutToNumber[data.statut];
    console.log("Valeur envoyée (chiffre attendu) :", valeurEnvoyee);

    if (!valeurEnvoyee) {
      setServerError("Statut invalide, vérifiez l'entrée.");
      return;
    }

    setServerError("");
    try {
      const email = await emailUserByToken();
      console.log("email modif infos", email);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/user/editAccounts?id=${uti_uuid}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ statut: valeurEnvoyee }),
        }
      );

      const responseData = await response.json();
      console.log("Réponse form modif infos : ", responseData);

      if (response.ok) {
        window.location.href = "/compteSuperAdmin";
      } else {
        setServerError(responseData.error || "Erreur inconnue");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setServerError("Erreur serveur");
    }
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="statut"
          control={control}
          render={({ field }) => (
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                {t("statut")}
              </label>
              <div className="mt-2">
                <input
                  {...field}
                  type="text"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              {errors.statut && (
                <p style={{ color: "red" }}>{errors.statut.message}</p>
              )}
            </div>
          )}
        />
        {serverError && <p className="text-red-500">{serverError}</p>}

        <div className="flex flex-col justify-self-center">
          <button
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            {t("modifierStatut")}
          </button>
        </div>
      </form>
    </div>
  );
}
