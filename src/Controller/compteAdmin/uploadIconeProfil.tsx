"use client";

import { error } from "console";

// import * as React from "react";


export default function ControllerParametres() {
    return (
        <input
          type="file"
          name="file"
          onChange={async (e) => {
            if (e.target.files) {
              try {
                const formData = new FormData();
              Object.values(e.target.files).forEach((file) => {
                const randomUuid = crypto.randomUUID();
                const nameOriginalFile = file.name
                const newFileName = `${randomUuid}_${nameOriginalFile}`;
              const nameFile = new File([file], newFileName, {
                type: file.type,
              })
                formData.append("file", nameFile);
              });
            
              const response = await fetch(`http://localhost:3000/api//user/iconeProfil`, {
                method: "POST",
                body: formData,
              });
              
              const result = await response.json();
              if (result.success) {
                alert("Upload ok : " + result.name);
              } else {
                alert("Upload failed")
              }
              } catch (error) {
                console.log("error catch : ", error)
              }
              
            }
          }}
        />
      );
}

//Au click du lien "modifier mon ... ", faire apparaitre un input permettant de modifier l'information
//Link ? Button ?
