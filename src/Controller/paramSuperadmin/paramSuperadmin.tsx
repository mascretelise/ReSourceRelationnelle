"use client";
// import * as React from "react";
import { useEffect, useState } from "react";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from "@/app/components/navbarView";
import ModifStatut from "./formModifStatut";


export default function EditStatut() {

  const [form, setForm] = useState<string | null>(null);
  const [statut, setStatut] = useState<
      { uti_uuid:string,  uti_name: string; uti_firstname: string, uti_email:string, uti_statut:string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await emailUserByToken();
        console.log("email by param : ");

        const resInfos = await fetch(
          `http://localhost:3000/api/user/allAccounts`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const infos = await resInfos.json();
        const statut = infos.map((
            item : {uti_uuid:string, uti_name: string; uti_firstname: string, uti_email:string, uti_statut:string}
        )=> ({
            uti_uuid: item.uti_uuid,
            uti_name: item.uti_name,
            uti_firstname: item.uti_firstname,
            uti_email: item.uti_email,
            uti_statut: item.uti_statut,
        }))
        setStatut(statut)
      } catch (err) {
        console.error("Erreur lors de la récupération du statut :", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-stretch flex-col">
      <Navbar />
      <h1 className="flex justify-center text-2xl">Modifier les statuts des comptes</h1>
      <div className="flex justify-center">
      <TableContainer component={Paper} sx={{ width: 800}} className="border-2 border-b-gray-500 flex justify-center">
      <Table sx={{ width: 800}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Nom de famille</TableCell>
            <TableCell align="center">Prénom</TableCell>
            <TableCell align="center">E-mail</TableCell>
            <TableCell align="center">Statut</TableCell>
            <TableCell align="center">Modifier le statut</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {statut.map((user) => (
          <tr className="border-1 border-b-gray-500" key={user.uti_uuid}>
            <th>
            <p>{user.uti_name}</p>
            </th>
            <th>
            <p>{user.uti_firstname}</p>
            </th>
            <th>
            <p>{user.uti_email}</p>
            </th>
            <th>
            <p>{user.uti_statut}</p>
            </th>
            <th>
                <button onClick={() => setForm(user.uti_uuid)}>Modifier le statut</button>
                {form === user.uti_uuid && <ModifStatut uti_uuid={user.uti_uuid}  onClose={() => setForm(null)} />}
            </th>
          </tr>
        ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    
    </div>
  );
}

//Au click du lien "modifier mon ... ", faire apparaitre un input permettant de modifier l'information
//Link ? Button ?
