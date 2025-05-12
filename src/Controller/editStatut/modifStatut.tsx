"use client";
import { useEffect, useState } from "react";
import { emailUserByToken } from "../componentsConnexion/isLogged";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "@/app/components/navbarView";
import ModifStatut from "./formModifStatut";
import { useTranslations } from "next-intl";

export default function EditStatut() {
  const t = useTranslations("editStatut");
  const [form, setForm] = useState<string | null>(null);
  const [statut, setStatut] = useState<
    {
      uti_uuid: string;
      uti_name: string;
      uti_firstname: string;
      uti_email: string;
      statut: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await emailUserByToken(); // Tu n’utilises pas l’email ici ? Donc inutile de le stocker
        const resInfos = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/api/user/allAccounts`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const infos = await resInfos.json();
        setStatut(infos);
      } catch (err) {
        console.error("Erreur lors de la récupération du statut :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <p className="text-center mt-4">Chargement en cours...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
  <h1 className="text-2xl my-4 text-center">{t("modifierStatutsComptes")}</h1>
  
  {/* Tableau responsive */}
  <div className="flex justify-center overflow-x-auto">
    <TableContainer component={Paper} sx={{ width: "100%", maxWidth: "1000px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">{t("nomFamille")}</TableCell>
            <TableCell align="center">{t("prenom")}</TableCell>
            <TableCell align="center">{t("email")}</TableCell>
            <TableCell align="center">{t("statut")}</TableCell>
            <TableCell align="center">{t("modifierStatut")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statut.map((user) => (
            <TableRow key={user.uti_uuid}>
              <TableCell align="center">{user.uti_name}</TableCell>
              <TableCell align="center">{user.uti_firstname}</TableCell>
              <TableCell align="center">{user.uti_email}</TableCell>
              <TableCell align="center">{user.statut}</TableCell>
              <TableCell align="center">
                <button
                  className="text-blue-600 underline"
                  onClick={() => setForm(user.uti_uuid)}
                >
                  {t("modifierStatut")}
                </button>
                {form === user.uti_uuid && (
                  <ModifStatut
                    uti_uuid={user.uti_uuid}
                    onClose={() => setForm(null)}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
</div>

  );
}
