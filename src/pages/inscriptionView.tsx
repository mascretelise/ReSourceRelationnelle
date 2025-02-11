import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "@/app/styles/globals.css";


const schemaZod = z.object({
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
   mdpConfirm: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-])/,
      "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),
})
.refine((data) => data.mdp === data.mdpConfirm, {
  message: "Les mots de passe ne correspondent pas",
  path: ["mdpConfirm"],
})
;
const erreurMdp = schemaZod.safeParse({ password: "", confirm: "" });
if(erreurMdp){
  <p style={{ color: "red" }}>Les mots de passe sont différents</p>
}
//Ne me met pas l'erreur sur le champs


type FormData = z.infer<typeof schemaZod>;

export default function InscriptionView() {
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
      const response = await fetch("http://localhost:3000/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
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
    <div className="flex justify-center items-center w-full min-h-screen">
      <form className="flex flex-col border border-black rounded-lg size-80 items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="p-0">
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <div className= "border border-black">
                <input placeholder="Nom" {...field} className="w-24"/>
                {errors.lastName && <p style={{ color: "red" }}>{errors.lastName.message}</p>}
              </div>
            )}
          />

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <div>
                <input placeholder="Prénom" {...field} className="w-24" />
                {errors.firstName && <p style={{ color: "red" }}>{errors.firstName.message}</p>}
              </div>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div>
                <input placeholder="E-mail" {...field} className="w-24" />
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
              </div>
            )}
          />

          <Controller
            name="mdp"
            control={control}
            render={({ field }) => (
              <div>
                <input type="password" placeholder="Mot de passe" {...field} className="w-24"/>
                {errors.mdp && <p style={{ color: "red" }}>{errors.mdp.message}</p>}
              </div>
            )}
          />
          <Controller
            name="mdpConfirm"
            control={control}
            render={({ field }) => (
              <div>
                <input type="password" placeholder="Mot de passe" {...field} className="w-24"/>
                {errors.mdp && <p style={{ color: "red" }}>{errors.mdp.message}</p>}
              </div>
            )}
          />
          

          <button type="submit">Créer le compte</button>
        </div>
      </form>
    </div>
  );
}
