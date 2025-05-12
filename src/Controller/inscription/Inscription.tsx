"use client";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

const schemaZod = z
  .object({
    lastName: z.string().min(1, "Le nom est obligatoire"),
    firstName: z.string().min(1, "Le prénom est obligatoire"),
    email: z.string().email("L'adresse e-mail est invalide"),
    mdp: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-])/,
        "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial"
      ),
    mdpConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.mdp === data.mdpConfirm;
    },
    {
      message: "Passwords don't match",
      path: ["mdpConfirm"],
    }
  );

type FormData = z.infer<typeof schemaZod>;

export default function InscriptionController() {
  const t = useTranslations("inscriptionPage");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaZod),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      mdp: "",
      mdpConfirm: "",
    },
    mode: "onBlur", //Valide la donnée dès que l'utilisateur a quitté le champ mais pas avant
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        window.location.href = "/";
      }
      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription");
      }

      const responseData = await response.json();
      console.log("Réponse de l'API :", responseData);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          {t("creationCompte")}
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm place-self-center">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <div className="">
                <label className="block text-sm/6 font-medium text-gray-900">
                  {t("nom")}
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Nom"
                    {...field}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                {errors.lastName && (
                  <p style={{ color: "red" }}>{errors.lastName.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <div className="">
                <label className="block text-sm/6 font-medium text-gray-900">
                  {t("prenom")}
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Prénom"
                    {...field}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                {errors.firstName && (
                  <p style={{ color: "red" }}>{errors.firstName.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div className="">
                <label className="block text-sm/6 font-medium text-gray-900">
                  {t("email")}
                </label>
                <div className="mt-2">
                  <input
                    placeholder="E-mail"
                    {...field}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                {errors.email && (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="mdp"
            control={control}
            render={({ field }) => (
              <div className="">
                <label className="block text-sm/6 font-medium text-gray-900">
                  {t("mdp")}
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    {...field}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                {errors.mdp && (
                  <p style={{ color: "red" }}>{errors.mdp.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name="mdpConfirm"
            control={control}
            render={({ field }) => (
              <div className="">
                <label className="block text-sm/6 font-medium text-gray-900">
                  {t("mdpConfirm")}
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    {...field}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                {errors.mdpConfirm && (
                  <p style={{ color: "red" }}>{errors.mdpConfirm.message}</p>
                )}
              </div>
            )}
          />
          <div className="flex flex-col justify-self-center">
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              {t("creationCompte")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
