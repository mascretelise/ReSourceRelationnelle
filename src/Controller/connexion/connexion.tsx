"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";




const schemaZod = z.object({
  email: z.string().min(1, "L'email est obligatoire").email("L'email est invalide"),
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
  const [serverError, setServerError] = useState("")
  const {
    register,
    handleSubmit,
    control,
    setError,
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
    setServerError("");
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      

        window.location.href = '/';
    } catch (error) {
      console.error("Erreur :", error);
    }
    
  };
 
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Connexion</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm place-self-center">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
               <div className="">
               <label className="block text-sm/6 font-medium text-gray-900">Email address</label>
               <div className="mt-2">
                 <input type="email" id="email" {...field} required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
               </div>
               {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
             </div>
       
            )}
          />

          <Controller
            name="mdp"
            control={control}
            render={({ field }) => (
              <div className="">
                <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                <div className="mt-2">
                  <input {...field} type="password" name="password" id="password"  required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
                {errors.mdp && <p style={{ color: "red" }}>{errors.mdp.message}</p>}
              </div>
            )}
          />
          {serverError && <p className="text-red-500">{serverError}</p>}
          <div className="flex flex-col justify-self-center">
            <button  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit">Se connecter</button>
          <Link href="/inscriptionView" className="text-blue-500">Pas encore de compte : Créez en un ici !</Link>
          </div>
      </form>
      </div>
    </div>
  );
}
