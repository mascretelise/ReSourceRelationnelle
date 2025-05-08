'use client';

import { useEffect, useState } from "react";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import {useTranslations} from 'next-intl';

const schemaZod = z.object({
  category: z.string().min(1, "Le nom est obligatoire"),
 
})
;
type ModifCategoryProps = {
    catId: string;
    onClose: () => void;
  };
type FormData = z.infer<typeof schemaZod>;
export default function AjoutCategory() {


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
      category: ""
    },
    mode: "onBlur", //Valide la donnée dès que l'utilisateur a quitté le champ mais pas avant 
  });
  

  const onSubmit = async (data: FormData) => {
    console.log()
    setServerError("");
    try {
      const response = await fetch(`http://localhost:3000/api/category/addCategory`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log("reponse form add infos : ", responseData)
      if(responseData){
        window.location.href = '/actionsCategories';
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
    
  };
  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <div className="">
              <label className="block text-sm/6 font-medium text-gray-900">Nom de la catégorie</label>
              <div className="mt-2">
                <input {...field} type="text" name="lastName" id="lastName"  required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
              </div>
              {errors.category && <p style={{ color: "red" }}>{errors.category.message}</p>}
            </div>
          )}
        />
        {serverError && <p className="text-red-500">{serverError}</p>}

        <div className="flex flex-col justify-self-center">
          <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit">Ajouter la catégorie</button>
        </div>
    </form>
    </div>
  );
}




