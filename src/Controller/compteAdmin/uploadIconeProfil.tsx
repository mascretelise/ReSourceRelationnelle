"use client";

import { emailUserByToken } from "../componentsConnexion/isLogged";


export default function ControllerParametres() {
  return (
    <input
      type="file"
      name="file"
      onChange={async (e) => {
        if (e.target.files) {
          try {
            const formData = new FormData();
            Object.values(e.target.files).forEach(async (file) => {
              const randomUuid = crypto.randomUUID();
              const originalName = file.name;
              const extension = originalName.split('.').pop();
              const nameWithExtension = `${randomUuid}.${extension}`;
              const nameFile = new File([file], nameWithExtension, {
                type: file.type,
              });
              
              formData.append("file", nameFile);
              console.log("à utiliser pour envoyer en bdd", nameFile.name)
              const url:string = nameFile.name
              const email = await emailUserByToken();
              console.log("email upload : ", email)
              const postUrl = await fetch(
                `http://localhost:3000/api/urlIconeProfil`,
                {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ url, email }) 
                }
              );
              if(postUrl){
                alert("c'est envoyé")
              }
            });

            const response = await fetch(
              `http://localhost:3000/api//user/iconeProfil`,
              {
                method: "POST",
                body: formData,
              }
            );

            /*const result = await response.json();
            if (result.success) {
              alert("Upload ok : " + result.name);
            } else {
              alert("Upload failed");
            }*/
          } catch (error) {
            console.log("error catch : ", error);
          }
        }
      }}
    />
  );
}

//Au click du lien "modifier mon ... ", faire apparaitre un input permettant de modifier l'information
//Link ? Button ?
