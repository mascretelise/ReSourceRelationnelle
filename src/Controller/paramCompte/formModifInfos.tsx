'use client';

import { useEffect, useState } from "react";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";

const schemaZod = z.object({
  lastName: z.string().min(1, "Le nom est obligatoire"),
  firstName: z.string().min(1, "Le prénom est obligatoire"),
  pseudo: z.string().min(1, "Le pseudo est obligatoire"),
 
})
;
type FormData = z.infer<typeof schemaZod>;
export default function ModifInfos() {
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
      lastName: "",
      firstName: "",
      pseudo: ""
    },
    mode: "onBlur", //Valide la donnée dès que l'utilisateur a quitté le champ mais pas avant 
  });
  

  const onSubmit = async (data: FormData) => {
    console.log("balahu")
    setServerError("");
    try {
      const email = await emailUserByToken();
      console.log("email modif infos", email);
      const response = await fetch(`http://localhost:3000/api/user/modifInfos?email=${email}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log("reponse form modif infos : ", responseData)
      if(responseData){
        alert("Informations modifiées !")
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
    
  };
  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <div className="">
              <label className="block text-sm/6 font-medium text-gray-900">Nom de famille</label>
              <div className="mt-2">
                <input {...field} type="text" name="lastName" id="lastName"  required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
              </div>
              {errors.lastName && <p style={{ color: "red" }}>{errors.lastName.message}</p>}
            </div>
          )}
        />
        {serverError && <p className="text-red-500">{serverError}</p>}
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <div className="">
              <label className="block text-sm/6 font-medium text-gray-900">Prénom</label>
              <div className="mt-2">
                <input {...field} type="text" name="firstName" id="firstName"  required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
              </div>
              {errors.firstName && <p style={{ color: "red" }}>{errors.firstName.message}</p>}
            </div>
          )}
        />
        {serverError && <p className="text-red-500">{serverError}</p>}
        <Controller
          name="pseudo"
          control={control}
          render={({ field }) => (
            <div className="">
              <label className="block text-sm/6 font-medium text-gray-900">Pseudo</label>
              <div className="mt-2">
                <input {...field} type="text" name="pseudo" id="pseudo"  required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
              </div>
              {errors.pseudo && <p style={{ color: "red" }}>{errors.pseudo.message}</p>}
            </div>
          )}
        />
        {serverError && <p className="text-red-500">{serverError}</p>}

        <div className="flex flex-col justify-self-center">
          <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit">Modifier mes informations</button>
        </div>
    </form>
    </div>
  );
}




