"use client";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";



const schemaZod = z.object({
  email: z.string().min(1, "L'email' est obligatoire"),
  mdp: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-])/,
      "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),
})
;



type FormData = z.infer<typeof schemaZod>;

export default function ConnexionController() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schemaZod), 
    defaultValues: {
      email: "",
      mdp: "",
    },
    mode: "onBlur", //Valide la donnée dès que l'utilisateur a quitté le champ mais pas avant 
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:3000/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if(response.ok){
        window.location.href = "/";
      }
  
      if (!response.ok) {
        throw new Error("Erreur lors de la connexion");
      }
  
      const responseData = await response.json();
      console.log("Réponse de l'API :", responseData);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };
  
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-cyan-100">
      <form className="flex flex-col border border-gray-500 rounded-xl size-80 justify-center bg-amber-50" onSubmit={handleSubmit(onSubmit)}>
        <div className="px-10 place-content-start flex-col">

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label>E-mail</label>
                <input placeholder="E-mail" {...field} className="w-48 border border-gray-300" />
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
              </div>
            )}
          />

          <Controller
            name="mdp"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label>Mot de passe</label>
                <input type="password" placeholder="Mot de passe" {...field} className="w-48 border border-gray-300"/>
                {errors.mdp && <p style={{ color: "red" }}>{errors.mdp.message}</p>}
              </div>
            )}
          />
          <button className="bg-cyan-100 border border-black rounded-md" type="submit">Créer le compte</button>
          <Link href="/inscriptionView">Pas encore de compte : Créez en un ici !</Link>
        </div>
      </form>
    </div>
  );
}
